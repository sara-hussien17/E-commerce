import { ProductService } from './../../core/services/products/product.service';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../core/interfaces/product/iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  imports: [CarouselModule ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit{

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },

    },
    nav: false
  }



  private readonly _ActivatedRoute = inject(ActivatedRoute)

  productID!:string
  productDetails:IProduct |null =null

  constructor(private _ProductService:ProductService,private _CartService:CartService,private toastr: ToastrService){

  }
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (param)=>{
      this.productID=param.get('p_id')!;
     console.log(this.productID)
     
      }
    })

    this._ProductService.getSpecificProduct(this.productID).subscribe({
      next:(res)=>{
        this.productDetails=res.data 
        console.log(this.productDetails);
       
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
addToCart():void{
  this._CartService.AddProductToCart(this.productID).subscribe({
next:(res)=>{
  console.log(res);
  console.log(res.numOfCartItems);
          this._CartService.cartCount.next(res.numOfCartItems);
          console.log(this._CartService.cartCount);
          
          this.toastr.success(res.message ,'FreshCart',{
            closeButton:true,})
},
error:(err)=>{
  console.log(err);
  
}
  })
}
}
