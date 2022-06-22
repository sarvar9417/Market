import React, { useContext, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Header } from './Print/Header';
import { Table } from './Print/Table';
import { Control } from './Print/Control';
import { AuthContext } from '../../../context/AuthContext';
// import QRCode from "qrcode";

export const Print = ({ inventories, inventoriesConnector, setCheck }) => {
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
    <div className='absolute top-0 right-0 z-50 w-full min-h-screen bg-white overflow-auto font-mono'>
      <div className='a4 m-auto w-[27cm]' ref={componentRef}>
        <Header auth={auth} inventoriesConnector={inventoriesConnector} />
        <hr />
        <Table inventories={inventories} />
      </div>
      <div className='py-4 w-full'>
        <Control setCheck={setCheck} print={print} />
      </div>
    </div>
  );
};
