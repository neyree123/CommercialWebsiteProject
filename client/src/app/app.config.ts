import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { InitService } from './core/services/init.service';
import { lastValueFrom } from 'rxjs';

function initApp( initService: InitService) {
  return () => lastValueFrom(initService.initService()).finally(() => {
    const splash = document.getElementById('initial-splash');
    if(splash) {
      splash.remove();
    }
  });
}

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), 
    provideHttpClient(withInterceptors([errorInterceptor, loadingInterceptor])),
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      multi: true,
      deps: [InitService]
    }
]
};
