import { IConvercySide } from "../utils/check-convercy-side";
import { ICurrentState } from "./convertor.models";

export class LoadCurrencies {
    static readonly type = '[CURRENCY] Load currencies';
}

export class ChangeCurrentState {
    static readonly type = '[CURRENCY] Change current state';
    constructor(public newValue: string | number | Date, public field: string) { }
}

