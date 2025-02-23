import { HttpInterceptorFn } from '@angular/common/http';

export const timezoneInterceptor: HttpInterceptorFn = (req, next) => {
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  req = req.clone({
    setHeaders: {
      'Timezone': userTimezone // Adiciona no Header
    }
  });

  return next(req);
};
