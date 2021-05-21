import * as _ from "lodash";
import {
  disableElement,
  enableElement,
  setElementHTML,
  displayElement,
  updateShoppingBagItemsCount,
  updateShoppingBagTotal,
  updateShoppingBagSubtotal,
  updateShoppingBagShipping,
  updateShoppingBagPayment,
  updateShoppingBagTaxes,
  updateShoppingBagDiscount,
} from "./helpers";
import { getInventoryFirstAvailableLevel, getElementFromTemplate } from "utils";
import { hideElement } from "./helpers";

export const updatePrice = (sku, priceContainerId) => {
  const price = _.first(sku.prices().toArray());
  const priceContainer = document.querySelector(`#${priceContainerId}`);
  if (priceContainer) {
    const priceAmount = priceContainer.querySelector(".amount");
    if (priceAmount) {
      priceAmount.innerHTML = price.formattedAmount;
    }
    const priceCompareAmount = priceContainer.querySelector(
      ".compare-at-amount"
    );
    if (priceCompareAmount) {
      if (price.compareAtAmountCents > price.amountCents) {
        priceCompareAmount.innerHTML = price.formattedCompareAtAmount;
      }
    }
  }
};
export const updatePrices = (skus) => {
  skus.map((sku) => {
    const price = _.first(sku.prices().toArray());
    const priceAmounts = document.querySelectorAll(
      '[data-sku-code="' + sku.code + '"] > .amount'
    );
    priceAmounts.forEach((priceAmount) => {
      priceAmount.innerHTML = price.formattedAmount;
    });
    const priceCompareAmounts = document.querySelectorAll(
      '[data-sku-code="' + sku.code + '"] > .compare-at-amount'
    );
    priceCompareAmounts.forEach((priceCompareAmount) => {
      if (price.compareAtAmountCents > price.amountCents) {
        priceCompareAmount.innerHTML = price.formattedCompareAtAmount;
      }
    });
  });
};
export const updateVariants = (skus, clear) => {
  if (clear === true) {
    let allVariants = document.querySelectorAll(".clayer-variant");
    allVariants.forEach((variant) => {
      disableElement(variant);
    });
  }
  skus.map((sku) => {
    let variants = document.querySelectorAll(
      '.clayer-variant[data-sku-code="' + sku.code + '"]'
    );
    variants.forEach((variant) => {
      variant.value = sku.id;
      enableElement(variant);
    });
  });
};
export const updateVariantsQuantity = (skus) => {
  let allAddVariantQuantity = document.querySelectorAll(
    ".clayer-add-to-bag-quantity"
  );
  allAddVariantQuantity.forEach((addVariantQuantity) => {
    disableElement(addVariantQuantity);
  });
  skus.forEach((sku) => {
    let addVariantsQuantity = document.querySelectorAll(
      '.clayer-add-to-bag-quantity[data-sku-code="' + sku.code + '"]'
    );
    addVariantsQuantity.forEach((addVariantQuantity) => {
      addVariantQuantity.dataset.skuId = sku.id;
      enableElement(addVariantQuantity);
    });
  });
};
export const updateAddVariantQuantitySKU = (
  skuId,
  skuName,
  skuCode,
  skuImageUrl,
  skuMaxQuantity,
  addToBagQuantityId
) => {
  let addVariantQuantity = document.querySelector(`#${addToBagQuantityId}`);
  if (addVariantQuantity) {
    const customMax = addVariantQuantity.getAttribute("max");
    const customMin = addVariantQuantity.getAttribute("min");
    const customVal = addVariantQuantity.getAttribute("value");
    addVariantQuantity.dataset.skuId = skuId;
    addVariantQuantity.value = customVal || customMin || "1";
    addVariantQuantity.min = customMin || "1";
    if (skuName) addVariantQuantity.dataset.skuName = skuName;
    if (skuCode) addVariantQuantity.dataset.skuCode = skuCode;
    if (skuImageUrl) addVariantQuantity.dataset.skuImageUrl = skuImageUrl;
    if (skuMaxQuantity) addVariantQuantity.max = customMax || skuMaxQuantity;
  }
};
export const updateAddToBags = (skus) => {
  let allAddToBags = document.querySelectorAll(".clayer-add-to-bag");
  allAddToBags.forEach((addToBag) => {
    disableElement(addToBag);
  });
  skus.forEach((sku) => {
    let addToBags = document.querySelectorAll(
      '.clayer-add-to-bag[data-sku-code="' + sku.code + '"]'
    );
    addToBags.forEach((addToBag) => {
      addToBag.dataset.skuId = sku.id;
      enableElement(addToBag);
    });
  });
};
export const updateAvailabilityMessage = (
  inventory,
  availabilityMessageContainerId
) => {
  let availabilityMessageContainer = document.querySelector(
    `#${availabilityMessageContainerId}`
  );
  if (availabilityMessageContainer) {
    let first_level = getInventoryFirstAvailableLevel(inventory);
    if (first_level.quantity > 0) {
      displayAvailableMessage(availabilityMessageContainer, first_level);
    } else {
      displayUnavailableMessage(availabilityMessageContainer);
    }
  }
};
export const displayAvailableMessage = (container, stockLevel) => {
  const dlt = _.first(stockLevel.delivery_lead_times);
  const qty = stockLevel.quantity;
  const minDays = dlt ? dlt.min.days : "";
  const maxDays = dlt ? dlt.max.days : "";
  const minHours = dlt ? dlt.min.hours : "";
  const maxHours = dlt ? dlt.max.hours : "";
  const shippingMethodName = dlt ? dlt.shipping_method.name : "";
  const shippingMethodPrice = dlt
    ? dlt.shipping_method.formatted_price_amount
    : "";
  if (container) {
    const template = document.querySelector(
      "#clayer-availability-message-available-template"
    );
    if (template && dlt) {
      const element = getElementFromTemplate(template);
      setElementHTML(
        element,
        ".clayer-availability-message-available-qty",
        qty
      );
      setElementHTML(
        element,
        ".clayer-availability-message-available-min-days",
        minDays
      );
      setElementHTML(
        element,
        ".clayer-availability-message-available-max-days",
        maxDays
      );
      setElementHTML(
        element,
        ".clayer-availability-message-available-min-hours",
        minHours
      );
      setElementHTML(
        element,
        ".clayer-availability-message-available-max-hours",
        maxHours
      );
      setElementHTML(
        element,
        ".clayer-availability-message-available-shipping-method-name",
        shippingMethodName
      );
      setElementHTML(
        element,
        ".clayer-availability-message-available-shipping-method-price",
        shippingMethodPrice
      );
      container.innerHTML = "";
      container.appendChild(element);
      displayElement(container);
    } else {
      container.innerHTML = "";
      displayElement(container);
    }
  }
};
export const updateAddToBagSKU = (
  skuId,
  skuName,
  skuCode,
  skuImageUrl,
  addToBagId,
  addToBagQuantityId
) => {
  let addToBag = document.querySelector(`#${addToBagId}`);
  if (addToBag) {
    addToBag.dataset.skuId = skuId;
    addToBag.dataset.skuName =
      skuName !== null && skuName !== void 0 ? skuName : "";
    addToBag.dataset.skuCode =
      skuCode !== null && skuCode !== void 0 ? skuCode : "";
    addToBag.dataset.skuImageUrl =
      skuImageUrl !== null && skuImageUrl !== void 0 ? skuImageUrl : "";
    addToBag.dataset.addToBagQuantityId =
      addToBagQuantityId !== null && addToBagQuantityId !== void 0
        ? addToBagQuantityId
        : "";
  }
};
export const enableAddVariantQuantity = (addToBagQuantityId) => {
  let addVariantQuantity = document.querySelector(`#${addToBagQuantityId}`);
  if (addVariantQuantity) {
    enableElement(addVariantQuantity);
  }
};
export const disableAddVariantQuantity = (addToBagQuantityId) => {
  let addVariantQuantity = document.querySelector(`#${addToBagQuantityId}`);
  if (addVariantQuantity) {
    disableElement(addVariantQuantity);
  }
};
export const enableAddToBag = (addToBagId) => {
  let addToBag = document.querySelector(`#${addToBagId}`);
  if (addToBag) {
    enableElement(addToBag);
  }
};
export const disableAddToBag = (addToBagId) => {
  let addToBag = document.querySelector(`#${addToBagId}`);
  if (addToBag) {
    disableElement(addToBag);
  }
};
export const toggleShoppingBag = () => {
  let shoppingBagContainer = document.querySelector(
    "#clayer-shopping-bag-container"
  );
  if (shoppingBagContainer) {
    shoppingBagContainer.classList.toggle("open");
  }
  let main = document.querySelector("#clayer-main");
  if (main) {
    main.classList.toggle("open");
  }
};
export const displayUnavailableMessage = (container) => {
  if (container) {
    let template = document.querySelector(
      "#clayer-availability-message-unavailable-template"
    );
    if (template) {
      let element = getElementFromTemplate(template);
      container.innerHTML = "";
      container.appendChild(element);
      displayElement(container);
    }
  }
};
export const updateShoppingBagSummary = (order) => {
  updateShoppingBagItemsCount(order);
  updateShoppingBagTotal(order);
  updateShoppingBagSubtotal(order);
  updateShoppingBagShipping(order);
  updateShoppingBagPayment(order);
  updateShoppingBagTaxes(order);
  updateShoppingBagDiscount(order);
};
export const updateShoppingBagCheckout = (order) => {
  let shoppingBagCheckouts = document.querySelectorAll(
    ".clayer-shopping-bag-checkout"
  );
  shoppingBagCheckouts.forEach((shoppingBagCheckout) => {
    if (order.lineItems) {
      enableElement(shoppingBagCheckout);
      shoppingBagCheckout.href = order.checkoutUrl;
    } else {
      shoppingBagCheckout.href = "";
      disableElement(shoppingBagCheckout);
    }
  });
};
export const clearShoppingBag = () => {
  if (document.querySelector("#clayer-shopping-bag-items-container")) {
    document.querySelector("#clayer-shopping-bag-items-container").innerHTML =
      "";
  }
};
export const openShoppingBag = () => {
  let shoppingBagContainer = document.querySelector(
    "#clayer-shopping-bag-container"
  );
  if (shoppingBagContainer) {
    shoppingBagContainer.classList.add("open");
  }
  let main = document.querySelector("#clayer-main");
  if (main) {
    main.classList.remove("open");
  }
};
export const hideAvailabilityMessages = () => {
  let allAvailabilityMessageContainers = document.querySelectorAll(
    ".clayer-availability-message-container"
  );
  allAvailabilityMessageContainers.forEach((container) => {
    hideElement(container);
  });
};
