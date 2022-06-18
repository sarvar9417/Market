import React, { useContext, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { AuthContext } from '../../../../context/AuthContext';
import { Control } from './ChequeConnectors/Control';
import { Header } from './ChequeConnectors/Header';
import { Table } from './ChequeConnectors/Table';
import { TableFooter } from './ChequeConnectors/TableFooter';
// import QRCode from "qrcode";

export const ChequeConnectors = ({ sales, setCheck }) => {
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
  return (
    <div className='absolute top-0 w-full bg-white font-mono h-full right-0 z-50'>
      <div className='a4 m-auto w-[27cm]' ref={componentRef}>
        <Header auth={auth} sales={sales} />
        <hr />
        <Table sales={sales} />
        <TableFooter sales={sales} />
      </div>
      <div className='py-4 w-full'>
        <Control setCheck={setCheck} print={print} />
      </div>
    </div>
  );
};
