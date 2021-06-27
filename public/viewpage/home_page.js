import * as Element from './element.js'

export function addEventListeners(){
    //when home button is clicked
    Element.menuHome.addEventListener('click', async () =>{
        await home_page();
    })
}

export async function home_page(){
    Element.root.innerHTML="<h1>Home Page</h1>"
}