import * as Element from './element.js'
import * as Route from '../controller/route.js'

export function addEventListeners(){
    Element.menuUsers.addEventListener('click', async () =>{
        history.pushState(null, null, Route.routePathname.USER);
        await user_page();
    })
}

export async function user_page(){
    Element.root.innerHTML="<h1>Users Page</h1>"
}