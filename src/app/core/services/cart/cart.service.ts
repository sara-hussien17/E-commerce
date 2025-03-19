import { Private } from './../../../../../node_modules/@babel/types/lib/index-legacy.d';
import { Token } from './../../../../../node_modules/acorn/dist/acorn.d';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../shared/environment/environment';
import { platformBrowser } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CartService {

userToken:any ;

cartCount:BehaviorSubject<number> = new BehaviorSubject(0)

  constructor(private _HttpClient:HttpClient , @Inject(PLATFORM_ID) private _PLATFORM_ID :any) {
if(isPlatformBrowser(this._PLATFORM_ID)){
  this.userToken = {token: sessionStorage.getItem('token')}
} else{
  this.userToken={}
}
  }

GetLoggedUserCart():Observable<any>{
return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart` )
}


AddProductToCart(p_id:string):Observable<any>{
  return this._HttpClient.post(`${environment.baseUrl}/api/v1/cart`,{"productId": p_id})
}

RemoveSpeceficCartItem(p_id:string):Observable<any>{
  return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${p_id}`)
}

updateCartProductQuantity(p_id:string,count:number):Observable<any>{
  return this._HttpClient.put(`${environment.baseUrl}/api/v1/cart/${p_id}`,{"count":count})
}






}
