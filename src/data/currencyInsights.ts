export interface CurrencyInsight {
  name: string;
  centralBank: string;
  centralBankPolicy: string;
  profile: string;
  sampleBanks: string;
  transferAdvice?: string;
  historicalRange?: string;
}

export const CURRENCY_INSIGHTS: Record<string, CurrencyInsight> = {
  USD: {
    name: 'US Dollar',
    centralBank: 'Federal Reserve (Fed)',
    centralBankPolicy: "The Federal Reserve's Federal Open Market Committee (FOMC) sets the federal funds benchmark interest rate. Higher US borrowing costs attract institutional capital seeking yield, strengthening USD demand against world currencies.",
    profile: "The United States Dollar (USD) represents the world's preeminent global reserve currency, accounting for over 85% of worldwide foreign exchange trading turnover and pricing primary international commodities including crude oil and gold.",
    sampleBanks: 'US commercial banks (JPMorgan Chase, Bank of America, Wells Fargo, Citi)',
    historicalRange: 'The US Dollar Index (DXY) has traded in a defined multi-quarter macroeconomic band, reflecting global inflation differentials and shifting expectations regarding Fed rate cuts.'
  },
  EUR: {
    name: 'Euro',
    centralBank: 'European Central Bank (ECB)',
    centralBankPolicy: 'Headquartered in Frankfurt am Main, the ECB determines deposit and refinancing rates across 20 Eurozone member nations, managing regional price stability and sovereign debt yield differentials.',
    profile: 'The Euro (EUR) is the second most actively traded currency globally, serving as the official legal tender for over 350 million European Union citizens.',
    sampleBanks: 'European retail banks (Deutsche Bank, BNP Paribas, Santander, ING)',
    historicalRange: 'The EUR/USD pair has traded predominantly between 1.04 and 1.12, heavily dictated by interest rate differentials between Frankfurt and Washington.'
  },
  PKR: {
    name: 'Pakistani Rupee',
    centralBank: 'State Bank of Pakistan (SBP)',
    centralBankPolicy: 'The State Bank of Pakistan in Karachi manages national monetary policy, statutory reserve requirements, and foreign currency liquidity to stabilize the balance of payments.',
    profile: 'The Pakistani Rupee (PKR) is supported by billions in annual remittances sent by overseas Pakistani workers and expatriates in the United States, United Kingdom, and GCC countries.',
    sampleBanks: 'Pakistani commercial banks (Habib Bank HBL, National Bank of Pakistan NBP, MCB Bank, United Bank UBL)',
    transferAdvice: 'Always compare official State Bank of Pakistan interbank benchmarks against retail open-market kerb rates. Using registered Roshan Digital Accounts (RDA) or regulated remittance services avoids the 3%–5% hidden markups common in unvetted wire channels.',
    historicalRange: 'The USD/PKR exchange rate has stabilized in a tighter interbank corridor following central bank foreign exchange reserve replenishment and import rationalization measures.'
  },
  INR: {
    name: 'Indian Rupee',
    centralBank: 'Reserve Bank of India (RBI)',
    centralBankPolicy: 'The RBI Monetary Policy Committee (MPC) in Mumbai sets the benchmark repo rate. The RBI actively manages foreign exchange reserves to curb excessive currency volatility while maintaining rupee liquidity.',
    profile: "The Indian Rupee (INR) powers the world's 5th largest economy, propelled by expansive technology service exports, domestic consumer growth, and global remittance inflows.",
    sampleBanks: 'Indian commercial banks (State Bank of India SBI, HDFC Bank, ICICI Bank, Axis Bank)',
    transferAdvice: 'When sending money from USD to INR, compare commercial bank spreads (SBI, HDFC, and ICICI frequently charge 2% to 4% markups) against CurrenFlow mid-market rates. Be mindful of Liberalised Remittance Scheme (LRS) limits and Tax Collected at Source (TCS) rules on outward transfers.',
    historicalRange: 'USD/INR has traded in a steady, managed band between 82.50 and 84.50, supported by record foreign exchange reserves held by the Reserve Bank of India.'
  },
  AUD: {
    name: 'Australian Dollar',
    centralBank: 'Reserve Bank of Australia (RBA)',
    centralBankPolicy: 'The RBA Board in Sydney sets the official cash rate target. The Australian Dollar functions as a high-liquidity commodity currency, with valuation closely linked to global demand for iron ore, coal, LNG, and lithium.',
    profile: "The Australian Dollar (AUD, 'Aussie') is the 6th most traded currency globally, celebrated for its high market liquidity, transparent financial governance, and exposure to Asian economic cycles.",
    sampleBanks: 'Australian Big Four banks (Commonwealth Bank CBA, ANZ, Westpac, National Australia Bank NAB)',
    transferAdvice: "Australia's Big Four retail banks routinely apply a 3% to 4.5% foreign exchange spread on international wire transfers. Auditing the deliverable rate against CurrenFlow saves hundreds of dollars on typical expat transfers.",
    historicalRange: 'The AUD/USD cross has oscillated between 0.63 and 0.68, heavily responsive to Chinese industrial data and commodity price swings.'
  },
  CAD: {
    name: 'Canadian Dollar',
    centralBank: 'Bank of Canada (BoC)',
    centralBankPolicy: 'The Bank of Canada in Ottawa sets the overnight policy rate. Because over 75% of Canadian merchandise exports flow into the US, BoC monetary policy closely tracks or diverges from the US Fed based on bilateral inflation and trade conditions.',
    profile: "The Canadian Dollar (CAD, 'Loonie') has a strong historical correlation with global crude oil benchmarks (Western Canadian Select and WTI) and North American automotive manufacturing supply chains.",
    sampleBanks: 'Canadian Big Five banks (RBC Royal Bank, TD Canada Trust, Scotiabank, BMO, CIBC)',
    transferAdvice: 'When transferring between US and Canadian Dollars, cross-border retail bank spreads can erode 2.5% to 3.5% of principal. Use live mid-market benchmarks or multi-currency accounts to eliminate retail spreads.',
    historicalRange: 'USD/CAD has traded within a typical range between 1.33 and 1.39, reflecting interest rate differentials and North American energy export dynamics.'
  },
  GBP: {
    name: 'British Pound',
    centralBank: 'Bank of England (BoE)',
    centralBankPolicy: "The BoE's Monetary Policy Committee (MPC) in London sets the Bank Rate to target 2% inflation, influencing wholesale sterling gilt yields, mortgage rates, and interbank liquidity.",
    profile: "The British Pound (GBP, 'Sterling' or 'Cable' against USD) is one of the world's oldest actively circulating currencies and underpins London as the world's premier foreign exchange trading capital.",
    sampleBanks: 'UK High Street banks (Barclays, HSBC UK, Lloyds Bank, NatWest)',
    transferAdvice: 'Traditional UK high street banks charge high international wire fees alongside a 3%–4% currency conversion spread. Opting for transparent transfer specialists that match the mid-market rate saves significant costs on GBP transfers.',
    historicalRange: 'GBP/USD has traded in a band between 1.22 and 1.32, reacting to UK GDP releases, wage inflation figures, and transatlantic monetary policy differentials.'
  },
  JPY: {
    name: 'Japanese Yen',
    centralBank: 'Bank of Japan (BoJ)',
    centralBankPolicy: 'The Bank of Japan in Tokyo regulates policy interest rates and bond yield parameters. Historically low borrowing costs in Japan have made the Yen the foundational funding currency for the global carry trade.',
    profile: "The Japanese Yen (JPY) is a traditional global safe-haven currency, backed by Japan's position as the world's largest net creditor nation and significant foreign direct investment assets.",
    sampleBanks: 'Japanese megabanks (Mitsubishi UFJ Financial Group MUFG, Sumitomo Mitsui SMBC, Mizuho Bank)',
    transferAdvice: 'When transferring funds involving JPY, be attentive to Tokyo market hours (00:00 to 06:00 UTC) for optimal liquidity. Retail foreign exchange booths at international airports routinely charge spreads exceeding 4%.',
    historicalRange: 'USD/JPY has traded with elevated volatility between 140 and 160, driven by the wide interest rate gap between US Treasuries and Japanese Government Bonds (JGBs).'
  },
  AED: {
    name: 'UAE Dirham',
    centralBank: 'Central Bank of the UAE (CBUAE)',
    centralBankPolicy: 'The UAE Dirham is officially pegged to the US Dollar at a fixed rate of 3.6725 AED per USD. The CBUAE automatically mirrors US Federal Reserve monetary policy adjustments to safeguard the currency peg.',
    profile: 'The UAE Dirham (AED) serves as the leading currency for Middle Eastern trade, international aviation, logistics, and real estate investment across Dubai and Abu Dhabi.',
    sampleBanks: 'UAE commercial banks (First Abu Dhabi Bank FAB, Emirates NBD, Abu Dhabi Commercial Bank ADCB, Mashreq)',
    transferAdvice: 'While the interbank peg is fixed at ~3.6725 AED per USD, commercial banks and retail exchange houses still charge a 1.5% to 3% spread on consumer exchanges. Always check the net deliverable amount.',
    historicalRange: 'The USD/AED exchange rate remains constant around 3.6725 due to the statutory currency peg enforced by the Central Bank of the UAE.'
  },
  BDT: {
    name: 'Bangladeshi Taka',
    centralBank: 'Bangladesh Bank',
    centralBankPolicy: 'Bangladesh Bank in Dhaka administers monetary policy, crawling peg exchange rate corridors, and foreign exchange reserve management to support sustainable economic growth.',
    profile: 'The Bangladeshi Taka (BDT) is anchored by billions of dollars in foreign remittances from Bangladeshi expatriates worldwide and strong ready-made garment (RMG) export receipts.',
    sampleBanks: 'Bangladeshi commercial banks (Islami Bank Bangladesh, Sonali Bank, BRAC Bank, Eastern Bank)',
    transferAdvice: 'Expatriates sending remittances to Bangladesh should use formal banking channels to qualify for the government 2.5% cash incentive on wage-earner remittances while avoiding unauthorized informal channels.',
    historicalRange: 'USD/BDT has operated within managed central bank crawling peg bands to stabilize trade financing and balance import bills.'
  },
  SAR: {
    name: 'Saudi Riyal',
    centralBank: 'Saudi Central Bank (SAMA)',
    centralBankPolicy: 'The Saudi Central Bank (SAMA) in Riyadh maintains a fixed currency peg of 3.75 SAR per US Dollar, mirroring Federal Reserve policy to preserve price stability.',
    profile: 'The Saudi Riyal (SAR) powers the largest economy in the Arab world, backed by substantial hydrocarbon reserves and extensive sovereign wealth capital managed by the Public Investment Fund (PIF).',
    sampleBanks: 'Saudi commercial banks (Al Rajhi Bank, Saudi National Bank SNB, Riyad Bank, Alinma Bank)',
    transferAdvice: 'Retail exchange booths and credit card networks often add an undisclosed 2% to 3% fee on SAR transactions despite the stable interbank peg of 3.75 SAR per USD.',
    historicalRange: 'The USD/SAR rate is firmly stabilized around 3.75 SAR per US Dollar under the SAMA fixed exchange rate regime.'
  },
  BTC: {
    name: 'Bitcoin',
    centralBank: 'Decentralized Blockchain Consensus',
    centralBankPolicy: 'Bitcoin operates on decentralized, algorithmic proof-of-work consensus with a mathematically fixed supply cap of 21 million BTC and programmed 4-year halving cycles.',
    profile: 'Bitcoin (BTC) is the premier decentralized digital asset and store of value, enabling peer-to-peer international value transfer 24 hours a day without central bank intermediaries.',
    sampleBanks: 'Regulated digital asset custodians and cryptocurrency exchanges (Coinbase, Kraken, Binance)',
    transferAdvice: 'Cryptocurrency conversions incur network mining fees and exchange maker/taker spreads rather than traditional bank wire fees. Check network congestion before transferring.',
    historicalRange: 'BTC trades continuously with high volatility, influenced by institutional ETF inflows, macroeconomic liquidity cycles, and halving supply dynamics.'
  }
};

export function getCurrencyInsight(code: string, fallbackName: string): CurrencyInsight {
  const upper = code.toUpperCase();
  if (CURRENCY_INSIGHTS[upper]) {
    return CURRENCY_INSIGHTS[upper];
  }
  return {
    name: fallbackName || upper,
    centralBank: `Central Bank of ${fallbackName || upper}`,
    centralBankPolicy: `The national monetary authority governing ${fallbackName || upper} (${upper}) establishes benchmark interest rates, controls domestic currency circulation, and oversees commercial banking reserves to maintain macroeconomic stability.`,
    profile: `${fallbackName || upper} (${upper}) serves as the official legal tender in its jurisdiction, with exchange rate valuations driven by national trade balances, foreign direct investment, and sovereign fiscal policies.`,
    sampleBanks: `Commercial retail banks, licensed foreign exchange brokers, and authorized money transfer operators handling ${upper}`,
    transferAdvice: `When exchanging funds involving ${upper}, audit the total deliverable sum against CurrenFlow's real-time mid-market rate to avoid losing 3% to 5% in unlisted bank markups.`,
    historicalRange: `Monitoring the 30-day and 90-day moving averages for ${upper} helps identify whether current exchange quotes represent an advantageous conversion window.`
  };
}
