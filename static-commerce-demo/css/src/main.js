import { getSalesChannelToken } from "@commercelayer/js-auth";
import { initCLayer } from "@commercelayer/js-sdk";
import api from "./api";
import config from "./config";
import listeners from "./listeners";
import { getAccessTokenCookie, setAccessTokenCookie } from "./utils";

const init = async () => {
  let auth = {};
  if (!getAccessTokenCookie()) {
    auth = await getSalesChannelToken({
      clientId: config.clientId,
      endpoint: config.baseUrl,
      scope: `market:${config.marketId}`,
    });
    setAccessTokenCookie(auth.accessToken, auth.expires);
  } else {
    auth.accessToken = getAccessTokenCookie();
  }
  initCLayer({
    accessToken: auth.accessToken,
    endpoint: config.baseUrl,
  });
  api.getPrices();
  api.getVariants();
  api.getVariantsQuantity();
  api.getAddToBags();
  listeners.setupVariants();
  listeners.setupAddVariantQuantity();
  listeners.setupAddToBags();
  listeners.setupShoppingBagToggles();
  api.refreshOrder();
};
async function initCommercelayer() {
  window.commercelayer = {
    init,
  };
  await init();
}
if (document.readyState === "loading") {
  document.addEventListener("readystatechange", () => {
    if (document.readyState === "interactive") {
      initCommercelayer();
    }
  });
} else {
  // interactive or complete
  initCommercelayer();
}
