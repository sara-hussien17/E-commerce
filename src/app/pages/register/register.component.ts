import { Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, AbstractControl }from '@angular/forms';
import { AuthService } from '../../core/services/authentication/auth.service';

@Component({
  selector: 'app-register',
  imports: [ ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  loading:boolean=false;
resText!:string;
private readonly _AuthService = inject(AuthService)
private readonly _Router = inject(Router)
registerForm: FormGroup= new FormGroup({
  name:new FormControl(null ,[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
  email: new FormControl(null, [Validators.required,Validators.email]),
  password: new FormControl(null,[Validators.required,Validators.pattern(/^\w{6,}$/)]),
  rePassword: new FormControl(null,Validators.required),
  phone: new FormControl(null, [Validators.required ,Validators.pattern(/^01[0125][0-9]{8}$/)])
});

compare(fGroup:AbstractControl){
return fGroup.get('Password')?.value === fGroup.get('rePassword')?.value? null : {missMatch:true}
}




register():void{
 if(this.registerForm.valid){
  this.loading = true;
 console.log(this.registerForm); 
this._AuthService.signUp(this.registerForm.value).subscribe({
  next:(res)=>{
    console.log(res);
    this.loading=false;
    this._Router.navigate(['/login']);
  },
  error:(err)=>{
    console.log(err.error.message);
    this.resText= err.error.message;
    this.loading= false;
  }
})
}

 else{
  this.registerForm.markAllAsTouched();
  this.registerForm.setErrors({missMatch:true});
 }
}
}
