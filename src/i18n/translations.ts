export type Language = 'en' | 'es' | 'ar';

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
  dir: 'ltr' | 'rtl';
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', dir: 'ltr' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', dir: 'ltr' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', dir: 'rtl' },
];

export interface TranslationDict {
  nav: {
    freeLiveRates: string;
    currenciesSupported: string;
    embedWidget: string;
  };
  converter: {
    amount: string;
    from: string;
    to: string;
    midMarketRate: string;
    inverseRate: string;
    liveRateToday: string;
    updatedJustNow: string;
    copyResult: string;
    copied: string;
    swapCurrencies: string;
    quickConvert: string;
    popularConversions: string;
    searchCurrencyPlaceholder: string;
    noCurrenciesFound: string;
  };
  table: {
    title: string;
    subtitle: string;
    reverseTitle: string;
  };
  affiliate: {
    tag: string;
    headline: string;
    description: string;
    button: string;
  };
  faq: {
    badge: string;
    title: string;
    subtitle: string;
    items: Array<{ question: string; answer: string }>;
  };
  seoContent: {
    badge: string;
    title: string;
    description: string;
    feature1Title: string;
    feature1Desc: string;
    feature2Title: string;
    feature2Desc: string;
    feature3Title: string;
    feature3Desc: string;
  };
  footer: {
    tagline: string;
    popularPairs: string;
    legalTitle: string;
    privacy: string;
    terms: string;
    contact: string;
    disclaimer: string;
    rights: string;
  };
}

export const TRANSLATIONS: Record<Language, TranslationDict> = {
  en: {
    nav: {
      freeLiveRates: 'Free Live Rates',
      currenciesSupported: '160+ Currencies Supported',
      embedWidget: 'Embed Widget',
    },
    converter: {
      amount: 'Amount',
      from: 'From',
      to: 'To',
      midMarketRate: 'Mid-market exchange rate',
      inverseRate: 'Inverse',
      liveRateToday: 'Live Rate Today',
      updatedJustNow: 'Updated live from central banks',
      copyResult: 'Copy conversion result',
      copied: 'Copied!',
      swapCurrencies: 'Swap currencies',
      quickConvert: 'Quick Convert',
      popularConversions: 'Popular Denominations',
      searchCurrencyPlaceholder: 'Search currency or country...',
      noCurrenciesFound: 'No currencies match your search.',
    },
    table: {
      title: 'Live Exchange Rate Table (Today)',
      subtitle: "Quick calculation reference for popular conversions at today's real mid-market rate.",
      reverseTitle: 'Reverse Conversion Table',
    },
    affiliate: {
      tag: 'Avoid Bank Fees',
      headline: 'Sending money abroad? Don’t pay high bank markups.',
      description: 'Traditional commercial banks add 3% to 5% in hidden conversion markups. Use transparent digital providers to get the real mid-market rate.',
      button: 'Compare Low-Fee Providers',
    },
    faq: {
      badge: 'Got Questions?',
      title: 'Frequently Asked Questions',
      subtitle: 'Everything you need to know about live foreign exchange rates, accuracy, and calculations.',
      items: [
        {
          question: 'What is the mid-market exchange rate?',
          answer: "The mid-market exchange rate (also known as the interbank rate) is the exact midpoint between the 'buy' and 'sell' prices of two global currencies. It is the real, transparent rate traded on world markets without any retail bank markup.",
        },
        {
          question: 'How frequently are exchange rates updated on CurrenFlow?',
          answer: 'Our rates are refreshed in real-time from open central bank feeds and international financial markets throughout trading hours.',
        },
        {
          question: 'Why do retail banks charge more than the rate shown here?',
          answer: 'Most traditional commercial banks and credit cards add a hidden retail markup (usually 2% to 5%) on top of the mid-market rate. CurrenFlow displays the unbiased mid-market rate so you can evaluate the true cost of transfers.',
        },
        {
          question: 'Can I embed this currency converter widget on my website?',
          answer: "Yes, 100%! Click 'Embed Widget' in the navigation bar to copy clean, responsive iframe code compatible with WordPress, Webflow, Shopify, or custom websites.",
        },
        {
          question: 'Does CurrenFlow track cryptocurrencies?',
          answer: 'Yes! In addition to 160+ fiat currencies, we calculate live rates for major digital assets including Bitcoin (BTC) and Ethereum (ETH).',
        },
        {
          question: 'Is CurrenFlow free for personal and commercial reference?',
          answer: 'Yes, it is 100% free with unlimited calculations, zero sign-up requirements, and no subscriptions.',
        },
      ],
    },
    seoContent: {
      badge: 'Market Transparency',
      title: 'Why Global Travelers and Businesses Trust CurrenFlow',
      description: 'Accurate, instantaneous foreign exchange calculations powered by reliable mid-market forex feeds across 160+ world currencies.',
      feature1Title: 'Zero Hidden Fees',
      feature1Desc: 'We display the genuine interbank rate without any retail markup, enabling you to detect undisclosed banking spreads.',
      feature2Title: 'Global Coverage',
      feature2Desc: 'From reserve currencies like USD, EUR, and GBP to emerging market and Gulf currencies, convert with precision.',
      feature3Title: 'Fast & Lightweight',
      feature3Desc: 'Optimized for sub-second calculations on mobile and desktop without heavy tracking scripts.',
    },
    footer: {
      tagline: 'Fast, free, and accurate currency converter with real-time mid-market exchange rates for global commerce, travel, and financial planning.',
      popularPairs: 'Popular Currency Pairs (Live Rates)',
      legalTitle: 'Legal & Compliance',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      contact: 'Contact & Support',
      disclaimer: 'Exchange rate figures are sourced from central and interbank feeds for informational purposes only.',
      rights: 'All rights reserved. Free Real-Time Foreign Exchange Rates.',
    },
  },

  es: {
    nav: {
      freeLiveRates: 'Tasas en Vivo Gratis',
      currenciesSupported: '+160 Divisas Disponibles',
      embedWidget: 'Insertar Widget',
    },
    converter: {
      amount: 'Cantidad',
      from: 'De',
      to: 'A',
      midMarketRate: 'Tipo de cambio medio del mercado',
      inverseRate: 'Inverso',
      liveRateToday: 'Tasa en Vivo Hoy',
      updatedJustNow: 'Actualizado en vivo desde bancos centrales',
      copyResult: 'Copiar resultado de conversión',
      copied: '¡Copiado!',
      swapCurrencies: 'Invertir divisas',
      quickConvert: 'Conversión Rápida',
      popularConversions: 'Denominaciones Populares',
      searchCurrencyPlaceholder: 'Buscar divisa o país...',
      noCurrenciesFound: 'No se encontraron divisas coincidentes.',
    },
    table: {
      title: 'Tabla de Tipos de Cambio en Vivo (Hoy)',
      subtitle: 'Referencia rápida para conversiones populares al tipo de cambio medio real del mercado.',
      reverseTitle: 'Tabla de Conversión Inversa',
    },
    affiliate: {
      tag: 'Ahorra en Comisiones',
      headline: '¿Envías dinero al extranjero? Evita las altas comisiones bancarias.',
      description: 'Los bancos tradicionales cobran entre un 3% y un 5% en comisiones ocultas. Usa proveedores digitales transparentes para obtener el tipo de cambio real.',
      button: 'Comparar Proveedores Baratos',
    },
    faq: {
      badge: '¿Tienes Preguntas?',
      title: 'Preguntas Frecuentes',
      subtitle: 'Todo lo que necesitas saber sobre tipos de cambio, precisión y conversiones en vivo.',
      items: [
        {
          question: '¿Qué es el tipo de cambio medio del mercado?',
          answer: 'El tipo de cambio medio (también llamado tasa interbancaria) es el punto medio exacto entre los precios de compra y venta en los mercados globales. Es la tasa real y transparente sin recargos bancarios ocultos.',
        },
        {
          question: '¿Con qué frecuencia se actualizan las tasas en CurrenFlow?',
          answer: 'Nuestras tasas se actualizan en tiempo real directamente desde fuentes interbancarias y bancos centrales mundiales.',
        },
        {
          question: '¿Por qué los bancos cobran más que la tasa mostrada aquí?',
          answer: 'La mayoría de bancos comerciales y tarjetas añaden un margen o diferencial oculto (generalmente entre el 2% y el 5%) sobre la tasa de mercado. CurrenFlow muestra la tasa real para que conozcas las comisiones exactas.',
        },
        {
          question: '¿Puedo insertar este convertidor en mi propio sitio web?',
          answer: "¡Sí, totalmente! Haz clic en 'Insertar Widget' para copiar un código iframe optimizado compatible con WordPress, Shopify o cualquier página web.",
        },
        {
          question: '¿CurrenFlow admite criptomonedas?',
          answer: '¡Sí! Además de más de 160 monedas fiduciarias, seguimos precios en vivo de Bitcoin (BTC) y Ethereum (ETH).',
        },
        {
          question: '¿El convertidor de CurrenFlow es 100% gratuito?',
          answer: 'Sí, es completamente gratis sin límites de conversión, sin registro obligatorio y sin suscripciones.',
        },
      ],
    },
    seoContent: {
      badge: 'Transparencia Financiera',
      title: 'Por Qué Viajeros y Empresas de Todo el Mundo Eligen CurrenFlow',
      description: 'Cálculos precisos e instantáneos de cambio de divisas con tasas medias del mercado en más de 160 monedas del mundo.',
      feature1Title: 'Cero Comisiones Ocultas',
      feature1Desc: 'Mostramos el tipo de cambio interbancario genuino para ayudarte a evitar recargos excesivos.',
      feature2Title: 'Cobertura Mundial',
      feature2Desc: 'Convierte desde las principales reservas (USD, EUR, GBP) hasta divisas de Latinoamérica y mercados emergentes.',
      feature3Title: 'Rápido y Seguro',
      feature3Desc: 'Optimizado para cálculos instantáneos en dispositivos móviles y ordenadores con máxima velocidad.',
    },
    footer: {
      tagline: 'Convertidor de divisas rápido, gratuito y preciso con tipos de cambio medios en tiempo real para viajes, finanzas y comercio global.',
      popularPairs: 'Pares de Divisas Populares (Tasas en Vivo)',
      legalTitle: 'Legal y Cumplimiento',
      privacy: 'Política de Privacidad',
      terms: 'Términos de Servicio',
      contact: 'Contacto y Soporte',
      disclaimer: 'Las cotizaciones provienen de fuentes bancarias e interbancarias únicamente con fines informativos.',
      rights: 'Todos los derechos reservados. Tipos de cambio en tiempo real.',
    },
  },

  ar: {
    nav: {
      freeLiveRates: 'أسعار حية مجاناً',
      currenciesSupported: 'أكثر من 160 عملة مدعومة',
      embedWidget: 'تضمين الأداة',
    },
    converter: {
      amount: 'المبلغ',
      from: 'من',
      to: 'إلى',
      midMarketRate: 'سعر الصرف الحقيقي في السوق',
      inverseRate: 'السعر العكسي',
      liveRateToday: 'السعر المباشر اليوم',
      updatedJustNow: 'محدث مباشرة من البنوك المركزية',
      copyResult: 'نسخ نتيجة التحويل',
      copied: 'تم النسخ!',
      swapCurrencies: 'تبديل العملات',
      quickConvert: 'تحويل سريع',
      popularConversions: 'فئات تحويل شائعة',
      searchCurrencyPlaceholder: 'ابحث عن العملة أو الدولة...',
      noCurrenciesFound: 'لم يتم العثور على أي عملات مطابقة.',
    },
    table: {
      title: 'جدول أسعار الصرف المباشرة (اليوم)',
      subtitle: 'مرجع سريع للتحويلات الشائعة بأسعار الصرف الحقيقية المتداولة في الأسواق اليوم.',
      reverseTitle: 'جدول التحويل العكسي',
    },
    affiliate: {
      tag: 'تجنب رسوم البنوك',
      headline: 'هل ترسل أموالاً إلى الخارج؟ لا تدفع رسوماً مصرفية خفية.',
      description: 'تضيف البنوك التقليدية ما بين 3% إلى 5% كرسوم تحويل خفية. استخدم مزودي التحويل الرقمي الشفافين للحصول على سعر السوق الحقيقي.',
      button: 'مقارنة مزودي التحويل الأقل رسوماً',
    },
    faq: {
      badge: 'هل لديك أسئلة؟',
      title: 'الأسئلة الشائعة',
      subtitle: 'كل ما تحتاج لمعرفته حول أسعار الصرف المباشرة ودقة التحويل وأسواق العملات.',
      items: [
        {
          question: 'ما هو سعر الصرف الحقيقي (سعر منتصف السوق)؟',
          answer: 'سعر منتصف السوق (أو السعر بين البنوك) هو نقطة الوسط الدقيقة بين سعري الشراء والبيع في الأسواق العالمية. إنه السعر العادل والشفاف بدون هوامش ربح خفية تفرضها البنوك التجارية.',
        },
        {
          question: 'كم مرة يتم تحديث أسعار الصرف في CurrenFlow؟',
          answer: 'يتم تحديث أسعارنا بصورة دورية ومباشرة من البنوك المركزية المفتوحة والأسواق المالية العالمية على مدار ساعات التداول.',
        },
        {
          question: 'لماذا تتقاضى البنوك سعراً أعلى من المعروض هنا؟',
          answer: 'تضيف معظم البنوك التجارية وبطاقات الائتمان هامش ربح غير معلن (غالباً بين 2% و 5%) فوق سعر السوق الحقيقي. يعرض CurrenFlow السعر المحايد لتتمكن من معرفة التكلفة الفعلية.',
        },
        {
          question: 'هل يمكنني تضمين أداة تحويل العملات في موقعي الخاص؟',
          answer: "نعم، بنسبة 100%! انقر على 'تضمين الأداة' لنسخ كود iframe خفيف ومتوافق مع ووردبريس وشوبيفاي وأي موقع إلكتروني.",
        },
        {
          question: 'هل يدعم موقع CurrenFlow العملات الرقمية؟',
          answer: 'نعم! بالإضافة إلى أكثر من 160 عملة نقدية رسمية، نقوم بحساب أسعار كبرى العملات الرقمية مثل بيتكوين (BTC) وإيثيريوم (ETH).',
        },
        {
          question: 'هل أداة محول العملات مجانية بالكامل؟',
          answer: 'نعم، الأداة مجانية 100% لجميع المستخدمين بلا حدود في عدد التحويلات ودون الحاجة لتسجيل حساب.',
        },
      ],
    },
    seoContent: {
      badge: 'شفافية مالية',
      title: 'لماذا يثق المسافرون والشركات حول العالم في CurrenFlow',
      description: 'حسابات دقيقة وفورية لتحويل العملات الأجنبية مدعومة ببيانات أسعار الصرف الحقيقية لأكثر من 160 عملة عالمية.',
      feature1Title: 'بدون أي رسوم خفية',
      feature1Desc: 'نعرض سعر الصرف الحقيقي بين البنوك لتتمكن من كشف الهوامش والرسوم الإضافية التي تفرضها المؤسسات.',
      feature2Title: 'تغطية عالمية شاملة',
      feature2Desc: 'من العملات الرئيسية كالدولار واليورو والجنيه، إلى عملات الخليج والشرق الأوسط والأسواق الناشئة.',
      feature3Title: 'سرعة فائقة ودقة متناهية',
      feature3Desc: 'موقع مُحسن لتقديم نتائج تحويل فورية في أقل من ثانية على أجهزة الجوال وأجهزة الكمبيوتر.',
    },
    footer: {
      tagline: 'محول عملات سريع ومجاني ودقيق بأسعار الصرف الحقيقية للأسواق للتجارة العالمية والسفر والتخطيط المالي.',
      popularPairs: 'أزواج العملات الشائعة (أسعار حية)',
      legalTitle: 'الشؤون القانونية',
      privacy: 'سياسة الخصوصية',
      terms: 'شروط الخدمة',
      contact: 'الاتصال والدعم',
      disclaimer: 'يتم استخراج أرقام أسعار الصرف من مصادر مركزية ومصرفية لأغراض إعلامية وتثقيفية فقط.',
      rights: 'جميع الحقوق محفوظة. أسعار صرف العملات الأجنبية المباشرة.',
    },
  },
};

// SEO Helper for dynamic page titles & descriptions in EN, ES, AR
export function getLocalizedSeo(lang: Language, from: string, to: string, fromName: string, toName: string) {
  const isDefault = from === 'USD' && to === 'EUR';

  if (lang === 'es') {
    return {
      title: isDefault
        ? 'CurrenFlow - Convertidor de Divisas y Tipos de Cambio en Vivo'
        : `Precio ${from} a ${to} Hoy - Conversor CurrenFlow`,
      description: isDefault
        ? 'Convierte más de 160 divisas con tipos de cambio reales del mercado hoy. Calculadora de divisas gratis sin comisiones ocultas.'
        : `Convierte ${from} a ${to} (${fromName} a ${toName}) con el tipo de cambio real hoy. Calculadora gratis con cotizaciones en tiempo real.`,
    };
  }

  if (lang === 'ar') {
    return {
      title: isDefault
        ? 'CurrenFlow - محول العملات المباشر وأسعار الصرف الحقيقية'
        : `سعر ${from} مقابل ${to} اليوم - محول CurrenFlow`,
      description: isDefault
        ? 'تحويل أكثر من 160 عملة بأسعار السوق الحقيقية اليوم. حاسبة تحويل العملات المجانية بدون رسوم خفية وأسعار مباشرة.'
        : `تحويل من ${from} إلى ${to} (${fromName} إلى ${toName}) بسعر الصرف الحقيقي المباشر اليوم. حاسبة مجانية للعملات.`,
    };
  }

  // Default English
  return {
    title: isDefault
      ? 'CurrenFlow - Live Currency Converter & Exchange Rates'
      : `${from} to ${to} Rate Today - CurrenFlow Converter`,
    description: isDefault
      ? 'Convert 160+ currencies with real-time mid-market exchange rates today. Free currency converter calculator with zero hidden fees and live forex data.'
      : `Convert ${from} to ${to} (${fromName} to ${toName}) at live mid-market exchange rates today. Free currency calculator with live forex data.`,
  };
}
