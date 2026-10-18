export interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag: string;
  country: string;
  popular?: boolean;
}

export interface RatesData {
  base: string;
  rates: Record<string, number>;
  lastUpdated: string;
  nextUpdate?: string;
  source: 'live' | 'cache' | 'fallback';
}

export interface ConversionState {
  amount: number;
  fromCurrency: string;
  toCurrency: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}
