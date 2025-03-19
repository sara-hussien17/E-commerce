import { CurrencyPipe } from '@angular/common';
import { ICart } from '../../core/interfaces/cart/icart';
import { Data } from './../../../../node_modules/memfs/lib/fsa/types.d';
import { CartService } from './../../core/services/cart/cart.service';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent  {

cartData:ICart | null = null;
  private readonly _CartService= inject(CartService)
    constructor(private toastr: ToastrService){}
  ngOnInit():void{
    this._CartService.GetLoggedUserCart().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.cartData = res.data;
      },
      error:(err)=>{
    console.log(err);
    
      }
    })
    }




deletItemFromCart(p_id:string):void{
  this._CartService.RemoveSpeceficCartItem(p_id).subscribe({
    next:(res)=>{
      console.log(res.data);
      this._CartService.cartCount.next(res.numOfCartItems);
      this.cartData= res.data;
      this.toastr.success('Item removed successfully!', 'FreshCart', {
        closeButton: true,
      });
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}

updateCount(p_id :string,count:number):void{
  

this._CartService.updateCartProductQuantity(p_id,count).subscribe({
  next:(res)=>{
    console.log(res.data);
    this.cartData= res.data
  },
  error:(err)=>{
    console.log(err);
  
  }
})



}}
  

