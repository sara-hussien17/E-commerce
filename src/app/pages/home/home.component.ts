import { SearchPipe } from './../../shared/pipes/search/search.pipe';
import { CategoriesService } from './../../core/services/categories/categories.service';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/products/product.service';
import { Console } from 'console';
import { IProduct } from '../../core/interfaces/product/iproduct';
import { Subscription } from 'rxjs';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ICategory } from '../../core/interfaces/categories/icategory';
import{ FormsModule} from '@angular/forms'
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/authentication/auth.service';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { WishListService } from '../../core/services/WishList/wish-list.service';
@Component({
  selector: 'app-home',
  imports: [CarouselModule,SearchPipe,FormsModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit ,OnDestroy{
  private readonly _AuthService = inject(AuthService)
  private readonly _NgxSpinnerService = inject(NgxSpinnerService)

  MainSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay:false,
    autoplayTimeout:1000,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: true
  }

  categoriesSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay:true,
    autoplayTimeout:1000,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: true
  }

  saerchValue:string=''
  categoriesData!: ICategory[]
  productsData!: IProduct[]
  productSub!:Subscription
  constructor(private _productService:ProductService , private _CategoriesService:CategoriesService,private _CartService:CartService ,private toastr: ToastrService,private _WishListService: WishListService){}
ngOnInit():void{

 this._NgxSpinnerService.show()
 console.log( this._AuthService.userInfo);
 

this._CategoriesService.getAllCategories().subscribe({
  next:(res)=>{
    this._NgxSpinnerService.hide()
    console.log(res.data);
    this.categoriesData= res.data
  }
})


 this.productSub= this._productService.getAllProducts().subscribe({
next:(res)=>{
  this._NgxSpinnerService.hide()
  this.productsData = res.data
   console.log(this.productsData);
    
 
},

})
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
      this.toastr.error(err.message ,'FreshCart',{
        closeButton:true,})
      
    }
  })
}



ngOnDestroy(): void {
  this.productSub?.unsubscribe()
}
}
