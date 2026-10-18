import type { RatesData } from '../types/currency';
import { FALLBACK_RATES } from '../data/fallbackRates';

const CACHE_KEY = 'currenflow_exchange_rates_v1';
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes cache

export async function fetchExchangeRates(): Promise<RatesData> {
  // 1. Check local storage cache
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      const isFresh = Date.now() - parsed.timestamp < CACHE_TTL_MS;
      if (isFresh && parsed.data && parsed.data.rates) {
        return {
          ...parsed.data,
          source: 'cache'
        };
      }
    }
  } catch {
    // Ignore localStorage errors
  }

  // 2. Fetch live data with timeout
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const res = await fetch('https://open.er-api.com/v6/latest/USD', {
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    if (data && data.rates) {
      const result: RatesData = {
        base: data.base_code || 'USD',
        rates: data.rates,
        lastUpdated: data.time_last_update_utc || new Date().toUTCString(),
        nextUpdate: data.time_next_update_utc,
        source: 'live'
      };

      try {
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ timestamp: Date.now(), data: result })
        );
      } catch {
        // quota exceeded or private mode
      }

      return result;
    }
  } catch (err) {
    console.warn('Could not fetch live rates, falling back to cache or defaults:', err);
  }

  // 3. Fallback to cached even if expired
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (parsed.data && parsed.data.rates) {
        return {
          ...parsed.data,
          source: 'cache'
        };
      }
    }
  } catch {
    // Ignore
  }

  // 4. Default hardcoded fallback
  return {
    base: 'USD',
    rates: FALLBACK_RATES,
    lastUpdated: new Date().toUTCString(),
    source: 'fallback'
  };
}

export function convertCurrency(
  amount: number,
  from: string,
  to: string,
  rates: Record<string, number>
): { result: number; rate: number; inverseRate: number } {
  if (from === to) {
    return { result: amount, rate: 1, inverseRate: 1 };
  }

  const fromRateInUSD = rates[from] || 1;
  const toRateInUSD = rates[to] || 1;

  // Since all rates are relative to 1 USD:
  // 1 unit of FROM in USD = 1 / fromRateInUSD
  // in TO = (1 / fromRateInUSD) * toRateInUSD = toRateInUSD / fromRateInUSD
  const rate = toRateInUSD / fromRateInUSD;
  const inverseRate = fromRateInUSD / toRateInUSD;
  const result = amount * rate;

  return { result, rate, inverseRate };
}

export function formatNumber(val: number, isCrypto = false): string {
  if (isNaN(val)) return '0.00';
  if (val === 0) return '0.00';

  if (isCrypto || Math.abs(val) < 0.001) {
    return val.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6
    });
  }

  return val.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4
  });
}
