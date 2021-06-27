import * as Element from './element.js'
import * as Route from '../controller/route.js'

export function addEventListeners(){
 //when products is cliced from navbar
    Element.menuProducts.addEventListener('click', async () =>{
        history.pushState(null, null, Route.routePathnames.PRODUCT);
       
        await product_page();
    })
}

export async function product_page(){
    Element.root.innerHTML="<h1>Product Page</h1>"
}