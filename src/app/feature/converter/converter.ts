import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ApiData } from '../../core/services/api-data';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  startWith,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { Currency } from '../../shared/model/currency';
import { AsyncPipe } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';
import {
  ConversionForm,
  ConversionFormControls,
} from '../../shared/model/conversion-form';

@Component({
  selector: 'app-converter',
  imports: [
    AsyncPipe,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './converter.html',
  styleUrl: './converter.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Converter implements OnInit, OnDestroy {
  private readonly apiData: ApiData = inject(ApiData);
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly cd: ChangeDetectorRef = inject(ChangeDetectorRef);
  private readonly destroy: Subject<void> = new Subject();

  result: number = 0;
  currencies$: Observable<Currency[]> = this.apiData.currencies$;

  conversionForm: FormGroup<ConversionFormControls> = this.fb.nonNullable.group(
    {
      amountFrom: [0],
      fromCurrency: ['PLN'],
      toCurrency: ['USD'],
    },
    {
      validators: [this.differentCurrenciesValidator],
    },
  );

  ngOnInit(): void {
    this.conversionForm.valueChanges
      .pipe(
        startWith(this.conversionForm.getRawValue()),
        map(() => this.conversionForm.getRawValue()),
        debounceTime(300),
        distinctUntilChanged(
          (prev: ConversionForm, curr: ConversionForm): boolean =>
            JSON.stringify(prev) === JSON.stringify(curr),
        ),
        switchMap(
          (formVal: ConversionForm): Observable<number> =>
            this.apiData.convert(
              formVal.fromCurrency,
              formVal.toCurrency,
              formVal.amountFrom,
            ),
        ),
        tap((result: number) => {
          this.result = result;
          this.cd.markForCheck();
        }),
        takeUntil(this.destroy),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }

  differentCurrenciesValidator(
    control: AbstractControl,
  ): ValidationErrors | null {
    const fromCurrency = control.get('fromCurrency')?.value;
    const toCurrency = control.get('toCurrency')?.value;

    return fromCurrency && toCurrency && fromCurrency === toCurrency
      ? { currenciesMatch: true }
      : null;
  }
}
