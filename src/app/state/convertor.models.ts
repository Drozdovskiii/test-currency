export interface IConvertorState {
    currencies: Record<string, string>;
    currentState: ICurrentState,
}

export interface ICurrentState {
    leftCurrency: string;
    leftCurrencyAmount: number;
    rightCurrency: string;
    rightCurrencyAmount: number;
    date: Date;
}

export interface ICurrencyResult {
    currencies: Record<string, string>;
    status: string;
}

export interface ICurrenciesArrayData {
    label: string;
    value: string;
  }
  