export interface ICurrencyConversionParams {
    from: string;
    to: string;
    amount: number;
}

export interface ICurrencyConversionResponse {
    status: string;
    updated_date: string;
    base_currency_code: string;
    base_currency_name: string;
    amount: number;
    rates: Record<string, IRates>;
}

export interface IRates {
    currency_name: string;
    rate: string;
    rate_for_amount: string;    
} 