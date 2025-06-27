import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

export const authenticationInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn,
): Observable<HttpEvent<any>> => {
  const newReq: HttpRequest<any> = req.clone({
    setParams: {
      api_key: 'QlYjAePGG1Y8B3TmZUdkmoCkhdIS6YZ6',
    },
  });
  return next(
    req.url.startsWith('https://api.currencybeacon.com/v1') ? newReq : req,
  );
};
