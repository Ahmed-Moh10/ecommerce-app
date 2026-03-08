import { NotfoundComponent } from './features/notfound/notfound.component';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './core/layouts/blank-layout/blank-layout.component';
import { LoginComponent } from './core/auth/login/login.component';
import { HomeComponent } from './features/home/home.component';
import { CartComponent } from './features/cart/cart.component';
import { ProductsComponent } from './features/products/products.component';
import { BrandsComponent } from './features/brands/brands.component';
import { CategoriesComponent } from './features/categories/categories.component';
import { DetailsComponent } from './features/details/details.component';
import { SignupComponent } from './core/auth/signup/signup.component';
import { authGuard } from './core/guards/auth-guard';
import { isloggedGuard } from './core/guards/islogged-guard';
import { AllordersComponent } from './features/allorders/allorders.component';
import { LandingpageComponent } from './features/landingpage/landingpage.component';
import { ContactusComponent } from './features/contactus/contactus.component';
import { ForgotPasswordComponent } from './core/auth/forgot-password/forgot-password.component';

export const routes: Routes = [
    { path: '', redirectTo: 'landing', pathMatch: 'full' },
    {
        path: "", component: AuthLayoutComponent, children: [
            { path: 'landing', component: LandingpageComponent, title: 'Welcome Trendify' },
        ]
    },
    {path:"" , component: AuthLayoutComponent , canActivate:[isloggedGuard] ,  children : [
        {path:'login', component:LoginComponent , title : 'Login Page'},
        {path:'signup', component: SignupComponent , title : 'SignUp Page'},
        {path:'forgot', component: ForgotPasswordComponent , title : 'ForgotPassword Page'}
    ]},
    {path:"" , component: BlankLayoutComponent , canActivate:[authGuard]  , children : [
        {path : 'home' , component: HomeComponent , title : 'Home Page'},
        {path : 'cart' , component: CartComponent , title : 'Cart Page'},
        {path : 'products' , component: ProductsComponent , title : 'Products Page'},
        {path : 'brands' , component: BrandsComponent , title : 'Brands Page'},
        {path : 'categories' , component: CategoriesComponent , title : 'Categories Page'},
        {path : 'contact' , component: ContactusComponent , title : 'Contact Us Page'},
        {path : 'allorders' , component: AllordersComponent , title : 'All Orders Page'},
        {path : 'details/:slug/:id' , component: DetailsComponent , title : 'Details Page'},
        {path : 'details/:id' , component: DetailsComponent , title : 'Details Page'},
        {path : 'checkout/:id' , component: CheckoutComponent , title : 'CheckOut Page'}
    ]},
    {path:'**' , component:NotfoundComponent , title: 'NotFound Page'}
];
