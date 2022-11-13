import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ICurrencyConversionParams, ICurrencyConversionResponse } from './app-currency.models';
import { ICurrencyResult, ICurrentState } from './state/convertor.models';
import { IConvercySide } from './utils/check-convercy-side';

@Injectable({
  providedIn: 'root'
})
export class AppCurrencyService {
  private url: string = environment.CURRENCY.url;
  private apiKey: string = environment.CURRENCY.apiKey;

   convertCurrency({ from, to, amount }: ICurrencyConversionParams) {
    return this.http.get<ICurrencyConversionResponse>(`${this.url}/convert?api_key=${this.apiKey}&from=${from}&to=${to}&amount=${amount}&format=json`)
  }

  constructor(private http: HttpClient) {}

  public loadCurrency() {
    return this.http.get<ICurrencyResult>(`${this.url}/list?api_key=${this.apiKey}`);
  }

  public fetchConvercies(data: ICurrentState, side: IConvercySide) {
    const anotherSide = side === IConvercySide.LEFT ? IConvercySide.RIGHT : IConvercySide.LEFT;

    return this
      .convertCurrency({
        from: data[`${side}Currency`],
        to: data[`${anotherSide}Currency`],
        amount: data[`${side}CurrencyAmount`],
      })
      .pipe<ICurrentState>(
        map(({ rates }) => ({
          ...data,
          [`${anotherSide}CurrencyAmount`]: rates[data[`${anotherSide}Currency`]].rate_for_amount,
        }))
      );
  }
}
