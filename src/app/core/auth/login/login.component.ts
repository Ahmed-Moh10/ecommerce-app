import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  imports: [RouterLink , ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  private readonly cdRef = inject(ChangeDetectorRef)
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)
  private readonly cookieService = inject(CookieService)

  flag:boolean = true
  msgError:string = ""
  isLoading:boolean = false
  subscription:Subscription = new Subscription()


  loginForm:FormGroup = new FormGroup({
      email:new FormControl(null , [Validators.required ,Validators.email ]),
      password:new FormControl(null , [Validators.required ,Validators.pattern(/^\w{6,}$/) ]),
  })



  submitForm():void {
    if(this.loginForm.valid){
      
      this.subscription.unsubscribe()

      this.isLoading = true
      this.subscription =  this.authService.loginForm(this.loginForm.value).subscribe({
        next:(res)=>{
          if(res.message === 'success'){
            this.msgError = ''

            this.cookieService.set('token' , res.token )

            this.authService.decodeToken()

            setTimeout(() => {
              this.router.navigate(['/home'])  
            }, 1000);
          }
          this.isLoading = false
          this.cdRef.detectChanges(); 
        },


        error:(err)=>{
          console.log(err)
          this.msgError = err.error.message
          this.isLoading = false
          this.cdRef.detectChanges();
        }
      })
    }

  }
}
