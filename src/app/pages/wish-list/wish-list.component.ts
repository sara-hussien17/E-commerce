import { WishListService } from './../../core/services/WishList/wish-list.service';
import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { IWishList } from '../../core/interfaces/wishList/iwish-list';
import { IProduct } from '../../core/interfaces/product/iproduct';
import { ICart } from '../../core/interfaces/cart/icart';

@Component({
  selector: 'app-wish-list',
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent {

wishListData:IWishList [] |null =null;

  private readonly _WishListService= inject(WishListService)
  private readonly _CartService= inject(CartService)
  constructor(private toastr: ToastrService){}
  ngOnInit():void{
    this._WishListService.GetLoggedUserWishList().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.wishListData = res.data;
       
        
      },
      error:(err)=>{
    console.log(err);
    
      }
    })
    }

    deletItemFromWishList(p_id: string): void {
      this._WishListService.RemoveSpeceficWishListItem(p_id).subscribe({
        next: (res) => {
          console.log(res.data);
    
          if (this.wishListData) {
            this.wishListData = this.wishListData.filter(item => item._id !== p_id);
          }
    
          this.toastr.success('Item removed successfully!', 'FreshCart', {
            closeButton: true,
          });
        },
        error: (err) => {
          console.log(err);
        }
      });
    }

    addToCart(p_id:string):void{
      this._CartService.AddProductToCart(p_id).subscribe({
        next:(res)=>{
          console.log(res);
          
          console.log(res.numOfCartItems);
          this._CartService.cartCount.next(res.numOfCartItems);
          console.log(this._CartService.cartCount);
          
          this.toastr.success(res.message ,'FreshCart',{
            closeButton:true,
          })
        }
      })
    }
}
