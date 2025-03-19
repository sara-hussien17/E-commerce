import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';
import { ProductService } from '../../core/services/products/product.service';
import { Subscription } from 'rxjs';
import { IProduct } from '../../core/interfaces/product/iproduct';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { WishListService } from '../../core/services/WishList/wish-list.service';

@Component({
  selector: 'app-products',
  imports: [SearchPipe,FormsModule,RouterLink,CarouselModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit,OnDestroy{
    productSub!:Subscription
    productsData!: IProduct[]
    saerchValue:string=''
constructor(private _productService:ProductService,private _CartService:CartService,private toastr: ToastrService,private _WishListService:WishListService){}
ngOnInit(): void {
  

this.productSub= this._productService.getAllProducts().subscribe({
  next:(res)=>{
    
    this.productsData = res.data
     console.log(this.productsData);
      
   }})
  
  }

  addToCart(p_id:string):void{
    this._CartService.AddProductToCart(p_id).subscribe({
      next:(res)=>{
        console.log(res.numOfCartItems);
        this._CartService.cartCount.next(res.numOfCartItems);
        console.log(this._CartService.cartCount);
        
        this.toastr.success(res.message ,'FreshCart',{
          closeButton:true,
        })
      }
    })
  }
  AddToWishList(p_id:string):void{
    this._WishListService.AddProductToWishList(p_id).subscribe({
      next:(res)=>{
        console.log(res);
        
        this.toastr.success(res.message ,'FreshCart',{
          closeButton:true,
        })
      },error:(err)=>{
        console.log(err);
        
      }
    })
  }
  ngOnDestroy(): void {
    this.productSub?.unsubscribe()
  }
}