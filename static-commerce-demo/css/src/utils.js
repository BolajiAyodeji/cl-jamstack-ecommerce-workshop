import * as _ from "lodash";
import * as cookies from "js-cookie";
import config from "./config";

export const getInventoryFirstAvailableLevel = (inventory) => {
  let first_level = _.first(inventory.levels);
  if (first_level.quantity == 0) {
    for (let k = 1; k < inventory.levels.length; k++) {
      const level = inventory.levels[k];
      if (level.quantity > 0) {
        first_level = level;
        break;
      }
    }
  }
  return first_level;
};
export const getElementFromTemplate = (template) => {
  if (template.tagName === "TEMPLATE") {
    return document.importNode(template.content.firstElementChild, true);
  } else {
    return document.importNode(template.firstElementChild, true);
  }
};
export const setOrderToken = (token) => {
  return cookies.set(getOrderCookieName(), token, { expires: 30 });
};
export const getOrderToken = () => {
  return cookies.get(getOrderCookieName());
};
export const getOrderCookieName = () => {
  return `order_token_${config.clientId}_${config.marketId}_${config.countryCode}`;
};
export const getAccessTokenCookieName = () => {
  return `access_token_${config.clientId}_${config.marketId}`;
};
export const getAccessTokenRetryLockCookieName = () => {
  return `${getAccessTokenCookieName()}_retry_lock`;
};
export const deleteOrderToken = () => {
  return cookies.remove(getOrderCookieName());
};
export const getAccessTokenCookie = () => {
  return cookies.get(getAccessTokenCookieName());
};
export const setAccessTokenCookie = (access_token, expires) => {
  cookies.set(getAccessTokenCookieName(), access_token, { expires });
};
export const getAccessTokenRetryLockCookie = () => {
  return cookies.get(getAccessTokenRetryLockCookieName());
};
export const setAccessTokenRetryLockCookie = () => {
  cookies.set(getAccessTokenRetryLockCookieName(), "1", { expires: 1 / 1440 }); // 1 minute
};
