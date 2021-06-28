import * as Home from '../viewpage/home_page.js'
import * as Purchase from '../viewpage/purchase_page.js'
import * as Cart from '../viewpage/cart.js'
import * as Profile from '../viewpage/profile_page.js'
import * as Product from '../viewpage/product_page.js'
import * as User from '../viewpage/user_page.js'


export const routePathname ={
    HOME: '/',
    PURCHASE: '/purchase',
    PROFILE: '/profile',
    CART: '/cart',
    PRODUCT: '/product',
    USER: '/user',

}

// routes for url when buttons are clicked and the functions that associate with the route
export const routes = [
    {pathname: routePathname.HOME, page: Home.home_page}, 
    {pathname: routePathname.PURCHASE, page: Purchase.purchase_page}, 
    {pathname: routePathname.CART, page: Cart.cart_page}, 
    {pathname: routePathname.PROFILE, page: Profile.profile_page}, 
    {pathname: routePathname.PRODUCT, page: Product.product_page}, 
    {pathname: routePathname.USER, page: User.user_page}, 
];

export function routing(pathname, hash){
    //checks to see if path exists
    const route = routes.find(r=> r.pathname == pathname);
    //if route exists find the page function associated to path
    if(route) route.page();
    else routes[0].page(); //default page
}

