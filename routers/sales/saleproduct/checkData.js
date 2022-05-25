module.exports.checkPayments = (totalprice, payment, discount, debt) => {
  if (
    discount &&
    discount.procient &&
    ((totalprice * discount.procient) / 100).toLocaleString('de-DE') !==
      discount.discount.toLocaleString('de-DE')
  ) {
    return true
  }

  let prices =
    debt.debt +
    discount.discount +
    payment.cash +
    payment.card +
    payment.transfer

  if (totalprice.toLocaleString('de-DE') !== prices.toLocaleString('de-DE')) {
    return true
  }
  return false
}
