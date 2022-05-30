export const returnProduct = (products, e) => {
  products[parseInt(e.target.id)].pieces = e.target.value;
  products[parseInt(e.target.id)].totalprice =
    e.target.value === ""
      ? 0
      : products[parseInt(e.target.id)].unitprice * parseFloat(e.target.value);
  products[parseInt(e.target.id)].totalpriceuzs =
    e.target.value === ""
      ? 0
      : products[parseInt(e.target.id)].unitpriceuzs *
        parseFloat(e.target.value);
  return products;
};

export const discountProcient = (EditDiscounts, products, e, i) => {
  EditDiscounts[i].discount -=
    (products[parseInt(e.target.id)].totalprice * EditDiscounts[i].procient) /
    100;
  EditDiscounts[i].discountuzs -=
    (products[parseInt(e.target.id)].totalpriceuzs *
      EditDiscounts[i].procient) /
    100;
};
