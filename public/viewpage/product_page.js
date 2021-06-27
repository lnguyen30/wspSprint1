import * as Element from './element.js'

export function addEventListeners(){

    Element.menuProducts.addEventListener('click', async () =>{
        //when products is cliced from navbar
        await product_page();
    })
}

export async function product_page(){
    Element.root.innerHTML="<h1>Product Page</h1>"
}