import * as Element from './element.js'
import * as Route from '../controller/route.js'
import * as FirebaseController from '../controller/firebase_controller.js'
import * as Constant from '../model/constant.js'
import * as Util from './util.js'
import * as Auth from '../controller/auth.js'


//event listeners for home page
export function addEventListeners(){
    Element.menuHome.addEventListener('click', async ()=>{
        history.pushState(null, null, Route.routePathname.HOME);
        const label = Util.disableButton(Element.menuHome);
        await home_page();
        Util.enableButton(Element.menuHome, label)
    })
}


export async function home_page(){
    let html = '<h1>Enjoy Shopping</h1>'
    let products;
    try{
        products = await FirebaseController.getProductListHome();
        //if cart isn't empty
        if(cart){
            cart.items.forEach(item =>{
                //parses through each item and finds the specific product
                const product = products.find(p=> item.docId == p.docId)
                //updates label
                product.qty = item.qty;
            })
        }
    }catch(e){
        if(Constant.DEV) console.log(e);
        Util.info('Cannot get product info', JSON.stringify(e));
    }
    //each product is rendered
    for(let i = 0; i<products.length; i++){
        html+= buildProductView(products[i], i)
    }

    Element.root.innerHTML = html;
}

function buildProductView(product, index){
    return `
    <div class="card" style="width: 18rem; display: inline-block">
     <img src="${product.imageURL}" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">
                ${Util.currency(product.price)}<br>
                ${product.summary}
            </p>
            <div class="container pt-3 bg-light ${Auth.currentUser ? 'd-block' : 'd-none'}">
                <form method="post" class="d-inline form-dec-qty">
                    <input type="hidden" name="index" value="${index}">
                    <button class="btn btn-outline-danger" type="submit">&minus;</button>
                </form>
                <div id="qty-${product.docId}" class="container rounded text-center text-white bg-primary d-inline-block w-50">
                    ${product.qty == null || product.qty == 0 ? 'Add' : product.qty}
                </div>
                <form method="post" class="d-inline form-inc-qty">
                    <input type="hidden" name="index" value="${index}">
                    <button class="btn btn-outline-primary" type="submit">&plus;</button>
                </form>
            </div>
        </div>
    </div>
    `;

 }