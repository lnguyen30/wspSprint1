import { AccountInfo } from '../model/account_info.js';
import * as Constant from '../model/constant.js'

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

