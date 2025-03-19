import { inject, PLATFORM_ID } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

export const reqHeaderInterceptor: HttpInterceptorFn = (req, next) => {

const _PLATFORM_ID =inject(PLATFORM_ID)


if(isPlatformBrowser (_PLATFORM_ID)){
 // if(req.url.includes('cart') || req.url.includes('wishlist') || req.url.includes('orders')){

if(sessionStorage.getItem('token') != null){
  req = req.clone({
    setHeaders : {token : sessionStorage.getItem('token')!}
  })
}
 // }

}


  return next(req);
};
