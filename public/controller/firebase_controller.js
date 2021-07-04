import { AccountInfo } from '../model/account_info.js';
import * as Constant from '../model/constant.js'
import { Product } from '../model/product.js';
import * as Auth from './auth.js'

// calls firebase to sign in user 
export async function signIn(email, password){
    await firebase.auth().signInWithEmailAndPassword(email, password);
}


//call firebase to sign out user
export async function signOut(){
    await firebase.auth().signOut();
}

//creates new users on firebase
export async function createUser(email, password){
    await firebase.auth().createUserWithEmailAndPassword(email, password);
}


//get account info for users
export async function getAccountInfo(uid){
    const doc = await firebase.firestore().collection(Constant.collectionNames.ACCOUNT_INFO)
                        .doc(uid).get();
    // if account exists
    if(doc.exists){
        return new AccountInfo(doc.data())
    }else{//if account hasnt been made yet
        const defaultInfo = AccountInfo.instance();
        //stores new account to firebase with uid, creates new document id with uid
        await firebase.firestore().collection(Constant.collectionNames.ACCOUNT_INFO)
                    .doc(uid).set(defaultInfo.serialize());
        return defaultInfo;

    }
}

//update account info
export async function updateAccountInfo(uid, updateInfo){
    //updateInfo: {key: value}
    await firebase.firestore().collection(Constant.collectionNames.ACCOUNT_INFO)
                .doc(uid).update(updateInfo);

}

//uploads profile pic to firebase
export async function uploadProfilePhoto (photoFile, imageName){
    //stores photo to firebase into storage
    const ref = firebase.storage().ref()
        .child(Constant.storageFolderNames.PROFILE_PHOTOS + imageName)
    //stores photo
    const taskSnapShot = await ref.put(photoFile);
    //retrieves the photo url assigned by firebase
    const photoURL = await taskSnapShot.ref.getDownloadURL();
    return photoURL;
}

//updates password for users
export async function updatePassword(newPassword){
    //fetches the current user signed in
    const user = Auth.currentUser
    //call to firebase to update current user's password
    await user.updatePassword(newPassword).then(()=>{
        console.log('update password successful')
    }, (error)=>{
        console.log(error);
    });
 
}

//imports cloud function from to client side
const cf_addProduct = firebase.functions().httpsCallable('cf_addProduct')
export async function addProduct(product){
    await cf_addProduct(product);

}

//upload image to firestore
export async function uploadImage(imageFile, imageName){
    //if image name does not exist, then assign one to imageName
    if(!imageName)
        imageName = Date.now() + imageFile.name;
    
    const ref = firebase.storage().ref()
                        .child(Constant.storageFolderNames.PRODUCT_IMAGES + imageName);//where the image will be stored

    const taskSnapShot = await ref.put(imageFile); //uploads file with the path name
    const imageURL = await taskSnapShot.ref.getDownloadURL(); // gets url of uploaded image 
    return {imageName, imageURL};
}

//retrieves all products in firestore
export async function getProductListHome(){
    const products = [];
    //fetches all the products information in firebase that are labeled under products label
    const snapshot = await firebase.firestore().collection(Constant.collectionNames.PRODUCTS)
        .orderBy('name')
        .get();

    snapshot.forEach( doc =>{
        //constructs each product with doc.data
        const p = new Product(doc.data())
        //assign the firestore id to product 
        p.docId = doc.id;
        //adds products to list
        products.push(p);
    })
    //returns lists of products
    return products;
}

//calls cloud function to retrieve products
const cf_getProductList = firebase.functions().httpsCallable('cf_getProductList')
export async function getProductList(){
    const products = []; // array of products
    const result = await cf_getProductList(); //result.data
    //iterates through result array and creates new product object then pushes new object into array
    result.data.forEach(data => {
        const p = new Product(data)
        p.docId = data.docId;
        products.push(p)
    });
    //returns array of products
    return products;
}


//calls cloud function to retrieve product by id
const cf_getProductById = firebase.functions().httpsCallable('cf_getProductById')
export async function getProductById(docId){
    const result = await cf_getProductById(docId);
    //if data exists, create product object
    if(result.data){
        const product = new Product(result.data);
        product.docId = result.data.docId;
        return product;
    }else{
        return null;
    }
}

//calls updateProduct to update the product
const cf_updateProduct = firebase.functions().httpsCallable('cf_updateProduct');
export async function updateProduct(product){
    const docId = product.docId;
    //passes in updated values
    const data = product.serializeForUpdate();
    //cloud function
    await cf_updateProduct({docId, data});
}

//calls deleteProduct to delete product
//delete the product first, then image; else, the ref to image will be lost if deleted first
const cf_deleteProduct = firebase.functions().httpsCallable('cf_deleteProduct');
export async function deleteProduct(docId, imageName){
    await cf_deleteProduct(docId);
    //passes the image name to firestore to delete
    const ref = firebase.storage().ref()
                .child(Constant.storageFolderNames.PRODUCT_IMAGES + imageName)
    await ref.delete();
}