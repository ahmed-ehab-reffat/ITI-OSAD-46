import { HttpInterceptorFn } from '@angular/common/http';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {

  console.log('Outgoing request:', req.url);

  const clonedReq = req.clone({
    setHeaders: {
      Authorization: 'Bearer FAKE_TOKEN'
    }
  });

  return next(clonedReq);
};
