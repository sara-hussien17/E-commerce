import { Brand } from './core/interfaces/product/iproduct';
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { BrandsComponent } from './pages/brands/brands.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CartComponent } from './pages/cart/cart.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthComponent } from './layout/auth-layout/auth/auth.component';
import { MainComponent } from './layout/main-layout/main/main.component';
import { authGuard } from './core/guards/auth.guard';
import { RenderMode } from '@angular/ssr';

export const routes: Routes = [

    
    {path:'' ,component:AuthComponent , children:[
     
        {path:'login', component:LoginComponent,title:'login'},
        {path:'register', loadComponent:()=>import('./pages/register/register.component').then((c)=>c.RegisterComponent),title:'register'} ,
        {path:'forget', loadComponent:()=>import('./pages/forget-pass/forget-pass.component').then((c)=>c.ForgetPassComponent),title:'forgetPassword'} 
    ]},
    {path:'' ,component:MainComponent ,canActivate:[authGuard] , children:[
        {path:'' , redirectTo:'home', pathMatch:'full'},
        {path:'home', component:HomeComponent,title:'Home'},
        {path:'products',  loadComponent:()=>import('./pages/products/products.component').then((c)=>c.ProductsComponent),title:'products'},
        {path:'categories',  loadComponent:()=>import('./pages/categories/categories.component').then((c)=>c.CategoriesComponent),title:'categories'},
        {path:'brands',  loadComponent:()=>import('./pages/brands/brands.component').then((c)=>c.BrandsComponent),title:'brands'},
        {path:'cart',  loadComponent:()=>import('./pages/cart/cart.component').then((c)=>c.CartComponent),title:'cart'},
        {path:'wishList',  loadComponent:()=>import('./pages/wish-list/wish-list.component').then((c)=>c.WishListComponent),title:'wish list'},
        {path:'allorders',  loadComponent:()=>import('./pages/allorders/allorders.component').then((c)=>c.AllordersComponent),title:'All ordars',},
        {path:'checout/:c_id',  loadComponent:()=>import('./pages/checout/checout.component').then((c)=>c.ChecoutComponent),title:'checout',},
        {path:'product-details/:p_id',  loadComponent:()=>import('./pages/product-details/product-details.component').then((c)=>c.ProductDetailsComponent),title:'Details', },
        {path:'**', component:NotFoundComponent,title:'Eror 404'},
    ]},

];
