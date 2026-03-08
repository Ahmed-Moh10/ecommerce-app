import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

import {provideAnimations}  from '@angular/platform-browser/animations'
import {CookieService} from 'ngx-cookie-service';

import { provideToastr } from 'ngx-toastr';
import { headersInterceptor } from './core/interceptors/headers-interceptor';
import { errorInterceptor } from './core/interceptors/error-interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { loadingInterceptor } from './core/interceptors/loading-interceptor';



export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes , withHashLocation()), provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()  ,   withInterceptors([headersInterceptor , errorInterceptor , loadingInterceptor])),
    provideAnimations(),
    importProvidersFrom(CookieService , NgxSpinnerModule ),
    provideToastr()
  ]
};
