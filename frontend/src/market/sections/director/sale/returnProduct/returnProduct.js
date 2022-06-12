export const returnProduct = (products, e) => {
  console.log(e.target);
  products[parseInt(e.target.id)].pieces = e.target.value;
  products[parseInt(e.target.id)].totalprice =
    e.target.value === ''
      ? 0
      : Math.round(
          products[parseInt(e.target.id)].unitprice *
            parseFloat(e.target.value) *
            100
        ) / 100;
  products[parseInt(e.target.id)].totalpriceuzs =
    e.target.value === ''
      ? 0
      : Math.round(
          products[parseInt(e.target.id)].unitpriceuzs *
            parseFloat(e.target.value) *
            100
        ) / 100;
  return products;
};

export const discountProcient = (EditDiscounts, products, e, i) => {
  EditDiscounts[i].discount -=
    Math.round(
      ((products[parseInt(e.target.id)].totalprice *
        EditDiscounts[i].procient) /
        100) *
        100
    ) / 100;
  EditDiscounts[i].discountuzs -=
    Math.round(
      ((products[parseInt(e.target.id)].totalpriceuzs *
        EditDiscounts[i].procient) /
        100) *
        100
    ) / 100;
};
