import { jwtDecode } from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../shared/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
userInfo:any;
  constructor(private _HttpClient:HttpClient) {}
  
  decodeToken(){
  if(sessionStorage.getItem('token')){
    this.userInfo = jwtDecode(sessionStorage.getItem('token') !)
  console.log(this.userInfo);
  
  
    
   }
  }

    signUp(data:object):Observable<any>{
   return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signup` ,data)
    }
   
    signIn(data:object):Observable<any>{
      return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signin` ,data)
       }


    setEmailVerifay(data:object):Observable<any>{
      return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords` ,data)
       }


       setCodeVerifay(data:object):Observable<any>{
        return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode` ,data)
         }


         setResetPasswored(data:object):Observable<any>{
          return this._HttpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword` ,data)
           }



      }
