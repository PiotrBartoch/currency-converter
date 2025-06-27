import { FormControl } from '@angular/forms';

export interface ConversionForm {
  amountFrom: number;
  fromCurrency: string;
  toCurrency: string;
}

export interface ConversionFormControls {
  amountFrom: FormControl<number>;
  fromCurrency: FormControl<string>;
  toCurrency: FormControl<string>;
}
