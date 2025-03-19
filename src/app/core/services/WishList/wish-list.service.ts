import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../shared/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  userToken:any ;
  
  wishListItems:BehaviorSubject<string> = new BehaviorSubject('')
  

  constructor( private _HttpClient:HttpClient,@Inject(PLATFORM_ID) private _PLATFORM_ID :any) { 

if(isPlatformBrowser(this._PLATFORM_ID)){
  this.userToken = {token: sessionStorage.getItem('token')}
} else{
  this.userToken={}
}
  }

GetLoggedUserWishList():Observable<any>{
return this._HttpClient.get(`${environment.baseUrl}/api/v1/wishlist` )
}


AddProductToWishList(p_id:string):Observable<any>{
  return this._HttpClient.post(`${environment.baseUrl}/api/v1/wishlist`,{"productId": p_id})
}

RemoveSpeceficWishListItem(p_id:string):Observable<any>{
  return this._HttpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${p_id}`)
}

updateCartProductQuantity(p_id:string,count:number):Observable<any>{
  return this._HttpClient.put(`${environment.baseUrl}/api/v1/cart/${p_id}`,{"count":count})
}


}
