import * as Element from './element.js'

export function addEventListeners(){
    Element.menuUsers.addEventListener('click', async () =>{
        await users_page();
    })
}

export async function users_page(){
    Element.root.innerHTML="<h1>Users Page</h1>"
}