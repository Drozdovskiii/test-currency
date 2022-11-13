import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { catchError, tap } from 'rxjs';
import { AppCurrencyService } from '../app-currency.service';
import { LEFT_CURRENCY_DEFAULT, RIGHT_CURRENCY_DEFAULT } from '../constants/currencies';
import { checkConvercySide } from '../utils/check-convercy-side';
import { ChangeCurrentState, LoadCurrencies } from './convertor.actions';
import { IConvertorState, ICurrenciesArrayData, ICurrentState } from './convertor.models';

@State<IConvertorState>({
  name: 'convertor',
  defaults: {
    currencies: {},
    currentState: {
        leftCurrency: LEFT_CURRENCY_DEFAULT,
        leftCurrencyAmount: 0,
        rightCurrency: RIGHT_CURRENCY_DEFAULT,
        rightCurrencyAmount: 0,
        date: new Date(),
    },
  },
})
@Injectable()
export class ConvertorState {
    constructor(private currencyService: AppCurrencyService) {}
    @Selector()
    public static currenciesArray({ currencies }: IConvertorState): ICurrenciesArrayData[] {
        return Object.entries(currencies).map(([value, label]) => ({ value, label }));
    }

    @Selector()
    public static getCurrentState({ currentState }: IConvertorState): ICurrentState {
        return currentState;
    }

    @Action(LoadCurrencies)
    loadCurrencies(ctx: StateContext<IConvertorState>) {
        return this.currencyService.loadCurrency().pipe(
            tap((result) => {
                ctx.patchState({
                    currencies: result.currencies,
                })
            }),
            catchError((error) => {
                return error;
            })
        )
    }

    @Action(ChangeCurrentState)
    changeCurrentState(ctx: StateContext<IConvertorState>, { newValue, field }: ChangeCurrentState) {
        const { currentState } = ctx.getState();
        const sideType = checkConvercySide(field);
        const newState = {
            ...currentState,
            [field]: newValue,
        }

        return this.currencyService.fetchConvercies(newState, sideType).pipe(
            tap((calculatedState) => {
                console.log({ calculatedState });
                ctx.patchState({
                    currentState: calculatedState,
                })
            }),
            catchError((error) => {
                return error;
            })
        )
    
    }
}