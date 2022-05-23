module.exports.checkPayments = (totalprice, payment, discount, debt) => {
  if (
    payment &&
    payment.payment !== payment.cash + payment.card + payment.transfer
  ) {
    return true
  }

  if (
    discount &&
    discount.procient &&
    (totalprice * discount.procient) / 100 !== discount.discount
  ) {
    return true
  }

  let prices = debt.debt + discount.discount + payment.payment

  if (totalprice !== prices) {
    return true
  }
  return false
}
