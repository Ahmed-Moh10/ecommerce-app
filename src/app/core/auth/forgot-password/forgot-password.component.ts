import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormGroup, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent implements OnInit  {

  private readonly fb = inject(FormBuilder)
  private readonly authService = inject(AuthService)
  private readonly cookieService = inject(CookieService)
  private readonly router = inject(Router)
  private readonly cdRef = inject(ChangeDetectorRef);




  verifyEmail!:FormGroup
  verifyCode!:FormGroup
  resetPassword!:FormGroup

  msgError:string = ""
  flag:boolean = true
  step:number = 1


  ngOnInit(): void {
      this.initForm()
  }

  initForm():void{
    this.verifyEmail = this.fb.group({
      email:[null , [Validators.required , Validators.email]]
    })

    this.verifyCode = this.fb.group({
      resetCode:[null , [Validators.required ]]
    })

    this.resetPassword = this.fb.group({
      email:[null , [Validators.required , Validators.email]],
      newPassword:[null , [Validators.required ,Validators.pattern(/^.{6,}$/)]]
    })
  }


formStep1(): void {
    if (this.verifyEmail.valid) {
      this.authService.sumbitVerifyEmail(this.verifyEmail.value).subscribe({
        next: (res) => {
          console.log(res);
          this.step = 2; 
          this.cdRef.detectChanges()
        },
      });
    }
  }

  formStep2(): void {
    if (this.verifyCode.valid) {
      this.authService.sumbitVerifyCode(this.verifyCode.value).subscribe({
        next: (res) => {
          console.log(res);
          this.step = 3; 
          this.cdRef.detectChanges()
        },
      });
    }
  }

  formStep3(): void {
    if (this.resetPassword.valid) {
      this.authService.sumbitResetPassword(this.resetPassword.value).subscribe({
        next: (res) => {
          this.cookieService.set('token', res.token);
          this.router.navigate(['/home']);
          this.cdRef.detectChanges()
        },
      });
    }
  }






  



  // private readonly cdRef = inject(ChangeDetectorRef)

  // isLoading:boolean = false
  // subscription:Subscription = new Subscription()


  // loginForm:FormGroup = new FormGroup({
  //     email:new FormControl(null , [Validators.required ,Validators.email ]),
  //     password:new FormControl(null , [Validators.required ,Validators.pattern(/^\w{6,}$/) ]),
  // })



  // submitForm():void {
  //   if(this.loginForm.valid){
      
  //     this.subscription.unsubscribe()

  //     this.isLoading = true
  //     this.subscription =  this.authService.loginForm(this.loginForm.value).subscribe({
  //       next:(res)=>{
  //         if(res.message === 'success'){
  //           this.msgError = ''

  //           this.cookieService.set('token' , res.token )

  //           this.authService.decodeToken()

  //           setTimeout(() => {
  //             this.router.navigate(['/home'])  
  //           }, 1000);
  //         }
  //         this.isLoading = false
  //         this.cdRef.detectChanges(); 
  //       },


  //       error:(err)=>{
  //         console.log(err)
  //         this.msgError = err.error.message
  //         this.isLoading = false
  //         this.cdRef.detectChanges();
  //       }
  //     })
  //   }

  // }

}
