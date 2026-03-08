import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-landingpage',
  standalone: true,
  imports: [], 
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.css'
})
export class LandingpageComponent implements OnInit {
  private readonly _router = inject(Router);
  private readonly _cookieService = inject(CookieService);
  private readonly _platformId = inject(PLATFORM_ID); 

  ngOnInit(): void {
    if (isPlatformBrowser(this._platformId)) {
      if (this._cookieService.check('token')) {
        this._router.navigate(['/home']);
      }
    }
  }
}