export const returnProduct = (products, e) => {
  products[parseInt(e.target.id)].pieces = e.target.value;
  products[parseInt(e.target.id)].totalprice =
    e.target.value === ''
      ? 0
      : Math.round(
          products[parseInt(e.target.id)].unitprice *
            parseFloat(e.target.value) *
            10000
        ) / 10000;
  products[parseInt(e.target.id)].totalpriceuzs =
    e.target.value === ''
      ? 0
      : Math.round(
          products[parseInt(e.target.id)].unitpriceuzs *
            parseFloat(e.target.value) *
            10000
        ) / 10000;
  return products;
};

export const discountProcient = (EditDiscount, product, count) => {
  const difference = product.pieces === '' ? 0 - count : product.pieces - count;
  console.log(EditDiscount);
  EditDiscount.discount =
    Math.round(
      (EditDiscount.discount -
        (product.unitprice * difference * EditDiscount.procient) / 100) *
        10000
    ) / 10000;

  EditDiscount.discountuzs =
    Math.round(
      (EditDiscount.discountuzs -
        (product.unitpriceuzs * difference * EditDiscount.procient) / 100) *
        100
    ) / 100;
  console.log(EditDiscount);
};
