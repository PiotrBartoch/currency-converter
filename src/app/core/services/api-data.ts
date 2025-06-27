import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ApiRoute } from '../../shared/routes/api-route';
import { Currency } from '../../shared/model/currency';

@Injectable({
  providedIn: 'root',
})
export class ApiData {
  private readonly apiUrl: string = environment.apiUrl;
  private readonly http: HttpClient = inject(HttpClient);

  currencies$: Observable<Currency[]> = this.http
    .get<any>(`${this.apiUrl}${ApiRoute.CURRENCIES}`)
    .pipe(
      map((response) => {
        const currencies: Currency[] = Object.values(response);
        return currencies.filter((_: any, index) => index <= 160);
      }),
    );

  convert(
    fromCurrency: string,
    toCurrency: string,
    amount: number,
  ): Observable<number> {
    const url: string = `${this.apiUrl}${ApiRoute.CONVERT}`;
    return this.http
      .get<any>(url, {
        params: {
          from: fromCurrency,
          to: toCurrency,
          amount: amount.toString(),
        },
      })
      .pipe(map((response) => response.response.value));
  }
}
