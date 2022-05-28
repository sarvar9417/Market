module.exports.checkPayments = (totalprice, payment, discount, debt) => {
  if (
    discount &&
    discount.procient &&
    Math.round(((totalprice * discount.procient) / 100) * 100) / 100 !==
      discount.discount
  ) {
    return true;
  }

  let prices =
    debt.debt +
    discount.discount +
    payment.cash +
    payment.card +
    payment.transfer;
  if (totalprice !== Math.round(prices * 100) / 100) {
    return true;
  }
  return false;
};
