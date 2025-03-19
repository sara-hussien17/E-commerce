import { ToastrService } from 'ngx-toastr';
import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';

export const resErrorInterceptor: HttpInterceptorFn = (req, next) => {

const _ToastrService = inject(ToastrService )
  return next(req).pipe(

catchError( (err)=>{
  console.log('from interceptor',err.error.message);
//_ToastrService.error(err.error.message,'Fresh Cart',{closeButton:true,
 //timeOut:2000,
//})

  return throwError(()=> err)
  
}

)


  );
};
