import { HomeComponent } from './../home/home.component';
import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/authentication/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-forget-pass',
  imports: [ReactiveFormsModule],
  templateUrl: './forget-pass.component.html',
  styleUrl: './forget-pass.component.scss'
})
export class ForgetPassComponent {

  private readonly _AuthService = inject(AuthService)
  private readonly _Router = inject(Router)

  step:number=1;
  verifayEmail: FormGroup = new FormGroup({  
      email: new FormControl(null, [Validators.required,Validators.email])})

     
      verifayCode: FormGroup = new FormGroup({
        resetCode: new FormControl(null, [Validators.required,Validators.pattern(/^\d{5,6}$/)])
       })



 resetPassword: FormGroup = new FormGroup({
          email: new FormControl(null, [Validators.required,Validators.email]),
          newPassword: new FormControl(null,[Validators.required,Validators.pattern(/^\w{6,}$/)])
        })

        verifayEmailSupmit():void{
          
      this._AuthService.setEmailVerifay(this.verifayEmail.value).subscribe({
        next:(res)=>{
          console.log(res);
          if(res.statusMsg=='success'){
            this.step =2;
          }
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
        }

        verifayCodeSupmit():void{
          this._AuthService.setCodeVerifay(this.verifayCode.value).subscribe({
            next:(res)=>{
              console.log(res);
              if(res.status =='Success'){
                this.step = 3;
              }
            },
            error:(err)=>{
              console.log(err);
              
            }
          })
            }

            resetPasswordSupmit():void{
              this._AuthService.setResetPasswored(this.resetPassword.value).subscribe({
                next:(res)=>{
                  console.log(res);
                sessionStorage.setItem('token',res.token)
                this._AuthService.decodeToken();
              this._Router.navigate(['/home'])
              
                },
                error:(err)=>{
                  console.log(err);
                  
                }
              })
                }

}
