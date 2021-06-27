import * as Element from '../viewpage/element.js'
import * as FirebaseController from './firebase_controller.js'
import * as Constant from '../model/constant.js'
import * as Util from '../viewpage/util.js'

export let currentUser;

export function addEventListeners(){

    // after signing in from modal
    Element.formSignin.addEventListener("submit", async (e) => {
       //listens to sign in form when sign in form button is clicked
       e.preventDefault();
       const email = e.target.email.value;
       const password = e.target.password.value;
    //    //to enable/disable button for sign in
    //    const button = e.target.getElementsByTagName('button')[0];
    //    const label = Util.disableButton(button);

       try{
           await FirebaseController.signIn(email, password);
           Element.modalSignin.hide();
       }catch(e){
          if (Constant.DEV) console.log(e);
           Util.info('Sign In Error', JSON.stringify(e), Element.modalSignin);
       }
    //    Util.enableButton(button, label);
    });

    Element.menuSignOut.addEventListener('click', async () =>{
        try {
            await FirebaseController.signOut();
        }catch(e){
            if (Constant.DEV) console.log(e);
            Util.info('Sign Out Error', JSON.stringify(e));
        }
    });



//changes state of page based on user signing in/out
 firebase.auth().onAuthStateChanged( async user=>{
    if (user){//if user signs in, display the post auth buttons
        currentUser = user;

        //when user signs in, shopping cart will be initialized
       // Home.initShoppingCart();

        let elements = document.getElementsByClassName('modal-pre-auth');
        for(let i = 0; i< elements.length; i++){
            elements[i].style.display ='none';
        }
        elements = document.getElementsByClassName('modal-post-auth');
        for(let i=0; i<elements.length; i++){
            elements[i].style.display ='block';
        }

     //   Route.routing(window.location.pathname, window.location.hash);
        
    }else{
        currentUser = null;
        let elements = document.getElementsByClassName('modal-pre-auth');
        for(let i = 0; i< elements.length; i++){
            elements[i].style.display ='block';
        }
        elements = document.getElementsByClassName('modal-post-auth');
        for(let i=0; i<elements.length; i++){
            elements[i].style.display ='none';
        }
        // history.pushState(null, null, Route.routePathnames.HOME);
        // Route.routing(window.location.pathname, window.location.hash);
    }
  });

}
