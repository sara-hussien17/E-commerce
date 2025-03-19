import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { identity, Observable } from 'rxjs';
import { environment } from '../../../shared/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly _HttpClient= inject(HttpClient)



  constructor() { }
  getAllProducts():Observable<any>{
   return this._HttpClient.get(`${environment.baseUrl}/api/v1/products`)
  }

  getSpecificProduct(id:string):Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/products/${id}`)
   }


   
}
