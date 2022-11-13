import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ChangeCurrentState, LoadCurrencies } from '../state/convertor.actions';
import { ICurrenciesArrayData, ICurrentState } from '../state/convertor.models';
import { ConvertorState } from '../state/convertor.state';

@Component({
  selector: 'app-converter-form',
  templateUrl: './converter-form.component.html',
  styleUrls: ['./converter-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConverterFormComponent implements OnInit {
  @Select(ConvertorState.currenciesArray)
  public readonly currencies$: Observable<ICurrenciesArrayData[]> | undefined;
  
  @Select(ConvertorState.getCurrentState)
  public readonly currentState$: Observable<ICurrentState> | undefined;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(new LoadCurrencies())
  }

  changeValue(newValue: string, field: string) {
    const value = field.includes('Amount') ? Number(newValue) : newValue
    this.store.dispatch(new ChangeCurrentState(value, field));
  }

  changeDate(event: MatDatepickerInputEvent<Date>) {
    this.store.dispatch(new ChangeCurrentState(event.value!, 'date'));
  }
}

