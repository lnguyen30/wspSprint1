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
