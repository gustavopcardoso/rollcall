import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { authInterceptor } from './interceptors/auth.interceptor';
import { timezoneInterceptor } from './interceptors/timezone.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([authInterceptor, timezoneInterceptor])
    ),
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
    //{provide: LOCALE_ID, useValue: 'pt-BR'}
  ]
};
