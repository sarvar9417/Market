import React, { useContext, useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { AuthContext } from '../../../../context/AuthContext';
import { Control } from './ChequeConnectors/Control';
import { Header } from './ChequeConnectors/Header';
import { Table } from './ChequeConnectors/Table';
// import QRCode from "qrcode";

export const ChequeConnectors = ({ sales, setCheck, currency }) => {
  //=================================================
  //=================================================
  //QR code
  // const [qr, setQr] = useState();
  // const changeQr = () => {
  //   QRCode.toDataURL().then((data) => {
  //     setQr("Salom");
  //   });
  // };

  //=================================================
  //=================================================
  const componentRef = useRef();
  const print = () => {
    setCheck(false);
    handlePrint();
  };
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const auth = useContext(AuthContext);

  const [currentSales, setCurrentSales] = useState([]);
  const [returnSales, setReturnSales] = useState([]);

  useEffect(() => {
    const returnS = [];
    const currentS = sales.products.filter((product) => {
      product.pieces < 0 && returnS.push(product);
      return product.pieces > 0;
    });
    setCurrentSales(
      currentS.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    );
    setReturnSales(
      returnS.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    );
  }, [sales]);

  return (
    <div className='absolute top-0 w-full bg-white font-mono h-full right-0 z-50'>
      <div className='a4 m-auto w-[27cm]' ref={componentRef}>
        <Header auth={auth} sales={sales} />
        <hr />
        <Table
          currency={currency}
          sales={sales}
          currentSales={currentSales}
          returnSales={returnSales}
        />
      </div>
      <div className='py-4 w-full'>
        <Control setCheck={setCheck} print={print} />
      </div>
    </div>
  );
};
