import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  private readonly cdRef = inject(ChangeDetectorRef)
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)

  flag1:boolean = true
  flag2:boolean = true

  msgError:string = ""
  isLoading:boolean = false


  signupForm:FormGroup = new FormGroup({
      name: new FormControl(null ,  [Validators.required , Validators.minLength(3) , Validators.maxLength(20)] ),
      email:new FormControl(null , [Validators.required ,Validators.email ]),
      password:new FormControl(null , [Validators.required ,Validators.pattern(/^\w{6,}$/) ]),
      rePassword:new FormControl(null , [Validators.required ,Validators.pattern(/^\w{6,}$/) ]),
      phone:new FormControl(null , [Validators.required ,Validators.pattern(/^01[0125][0-9]{8}$/) ]),
      // label ===> i agree with terms
      agreeTerms:new FormControl(false , [Validators.requiredTrue])
  }  ,  {validators:this.confirmPassword}  )


  confirmPassword(group:AbstractControl){
    return group.get('password')?.value === group.get('rePassword')?.value ? null : {mismatch:true}
  }


  submitForm():void {
    if(this.signupForm.valid){
      this.isLoading = true
      this.authService.signupForm(this.signupForm.value).subscribe({
        next:(res)=>{
          if(res.message === 'success'){
            this.msgError = ''
            setTimeout(() => {
              this.router.navigate(['/login'])  
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

    else {
      this.signupForm.setErrors({mismatch:true})
      this.signupForm.markAllAsTouched()
    }

  }
}
