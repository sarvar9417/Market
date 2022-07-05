export const Functions = () => {
  const changePosition = ({ e, setModal, setPosition }) => {
    setModal(true);
    setPosition(e.target.name);
  };

  const positions = {
    view: 'Diqqat! Buyurtmani qabul qilishni tasdiqlaysizmi?',
    ready: 'Diqqat! Buyurtma tayyorlanganligini tasdiqlaysizmi?',
    tosend: 'Diqqat! Buyurtma yuborilganligini tasdiqlaysizmi?',
    accept:
      'Diqqat! Buyurtma muvaffaqqiyatli yakunlanganligini tasdiqlaysizmi?',
    rejection: 'Diqqat! Buyurtmani rad etishni tasdiqlaysizmi?',
  };

  const searchOrdersFunction = ({
    e,
    orders,
    setSearch,
    search,
    setCurrentOrders,
  }) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
    if (e.target.name === 'code') {
      const searching = orders.filter((item) =>
        item.productdata.code.includes(e.target.value)
      );
      setCurrentOrders(searching);
    }
    if (e.target.name === 'name') {
      const searching = orders.filter((item) =>
        item.productdata.name
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      );
      setCurrentOrders(searching);
    }
  };

  const changeInput = ({ e, currentOrders, setCurrentOrders, i }) => {
    let orders = [...currentOrders];

    orders[i][e.target.name] = e.target.value;
    setCurrentOrders([...orders]);
  };

  return { changePosition, positions, searchOrdersFunction, changeInput };
};
