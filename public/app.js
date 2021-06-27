import * as Auth from './controller/auth.js'
import * as Home from './viewpage/home_page.js'
import * as Purchase from './viewpage/purchase_page.js'
import * as Cart from './viewpage/cart.js'
import * as Profile from './viewpage/profile_page.js'
import * as Products from './viewpage/product_page.js'
import * as Users from './viewpage/users_page.js'

Auth.addEventListeners();
Home.addEventListeners();
Purchase.addEventListeners();
Cart.addEventListeners();
Profile.addEventListeners();
Products.addEventListeners();
Users.addEventListeners();


