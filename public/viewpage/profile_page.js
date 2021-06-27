import * as Element from './element.js'

export function addEventListeners(){
    //when profile is clicked
    Element.menuProfile.addEventListener('click', async () =>{
        await profile_page();
    })
}

export async function profile_page(){
    Element.root.innerHTML="<h1>Profile Page</h1>"
}