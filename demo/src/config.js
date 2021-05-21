const clayerConfig = document.querySelector("#clayer-config");

let config = {
  baseUrl: "",
  clientId: "",
  marketId: "",
  countryCode: "",
  languageCode: "",
  cartUrl: "",
  returnUrl: "",
  privacyUrl: "",
  termsUrl: "",
  devSettings: {
    debug: "",
    console: "",
    trace: "",
  },
};

if (clayerConfig) {
  config = {
    baseUrl: clayerConfig.getAttribute("data-base-url"),
    clientId: clayerConfig.getAttribute("data-client-id"),
    marketId: clayerConfig.getAttribute("data-market-id"),
    countryCode: clayerConfig.getAttribute("data-country-code"),
    languageCode: clayerConfig.getAttribute("data-language-code").split("-")[0],
    cartUrl: clayerConfig.getAttribute("data-cart-url"),
    returnUrl: clayerConfig.getAttribute("data-return-url"),
    privacyUrl: clayerConfig.getAttribute("data-privacy-url"),
    termsUrl: clayerConfig.getAttribute("data-terms-url"),
    devSettings: {
      debug: clayerConfig.getAttribute("data-dev-settings-debug"),
      console: clayerConfig.getAttribute("data-dev-settings-console"),
      trace: clayerConfig.getAttribute("data-dev-settings-trace"),
    },
  };
}

export default config;
