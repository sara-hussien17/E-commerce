import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../shared/environment/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  userToken:any ;
    constructor(private _HttpClient:HttpClient , @Inject(PLATFORM_ID) private _PLATFORM_ID :any) {
  if(isPlatformBrowser(this._PLATFORM_ID)){
    this.userToken = {token: sessionStorage.getItem('token')}
  } else{
    this.userToken={}
  }
    }

checkOutSession(c_id:string,data:object):Observable<any>{
  return this._HttpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${c_id}?url=${environment.domain}`,
{'shippingAddress':data},
  )
}


}

