export const itemsPerPage = 25;
export const enableElement = (element) => {
    if (element) {
        element.removeAttribute('disabled');
        element.classList.remove('disabled');
    }
};
export const disableElement = (element) => {
    if (element) {
        element.setAttribute('disabled', 'disabled');
        element.classList.add('disabled');
    }
};
export const displayElement = (element) => {
    if (element) {
        element.style.display = 'block';
    }
};
export const hideElement = (element) => {
    if (element) {
        element.style.display = 'none';
    }
};
export const setElementHTML = (parent, selector, html) => {
    const element = parent.querySelector(selector);
    if (element) {
        element.innerHTML = html;
    }
};
export const shoppingBagItemsQuantity = (order) => {
    let count = 0;
    const countItems = Number(order.lineItems().size());
    if (countItems > 0) {
        order
            .lineItems()
            .toArray()
            .map((l) => {
            count = count + l.quantity;
        });
    }
    return `${count}`;
};
export const updateShoppingBagItemsCount = (order) => {
    let shoppingBagItemsCounts = document.querySelectorAll('.clayer-shopping-bag-items-count');
    shoppingBagItemsCounts.forEach((shoppingBagItemsCount) => {
        shoppingBagItemsCount.innerHTML = shoppingBagItemsQuantity(order);
    });
};
export const updateShoppingBagTotal = (order) => {
    let shoppingBagTotals = document.querySelectorAll('.clayer-shopping-bag-total');
    shoppingBagTotals.forEach((shoppingBagTotal) => {
        shoppingBagTotal.innerHTML = order.formattedTotalAmountWithTaxes;
    });
};
export const updateShoppingBagSubtotal = (order) => {
    let shoppingBagSubtotals = document.querySelectorAll('.clayer-shopping-bag-subtotal');
    shoppingBagSubtotals.forEach((shoppingBagSubtotal) => {
        shoppingBagSubtotal.innerHTML = order.formattedSubtotalAmount;
    });
};
export const updateShoppingBagShipping = (order) => {
    let shoppingBagShippings = document.querySelectorAll('.clayer-shopping-bag-shipping');
    shoppingBagShippings.forEach((shoppingBagShipping) => {
        shoppingBagShipping.innerHTML = order.formattedShippingAmount;
    });
};
export const updateShoppingBagPayment = (order) => {
    let shoppingBagPayments = document.querySelectorAll('.clayer-shopping-bag-payment');
    shoppingBagPayments.forEach((shoppingBagPayment) => {
        shoppingBagPayment.innerHTML = order.formattedPaymentMethodAmount;
    });
};
export const updateShoppingBagTaxes = (order) => {
    let shoppingBagTaxes = document.querySelectorAll('.clayer-shopping-bag-taxes');
    shoppingBagTaxes.forEach((shoppingBagTax) => {
        shoppingBagTax.innerHTML = order.formattedTotalTaxAmount;
    });
};
export const updateShoppingBagDiscount = (order) => {
    let shoppingBagDiscounts = document.querySelectorAll('.clayer-shopping-bag-discount');
    shoppingBagDiscounts.forEach((shoppingBagDiscount) => {
        shoppingBagDiscount.innerHTML = order.formattedDiscountAmount;
    });
};