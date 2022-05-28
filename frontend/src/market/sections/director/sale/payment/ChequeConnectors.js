import { faClose, faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { AuthContext } from "../../../../context/AuthContext";
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
    <div className='absolute top-0 w-full bg-white font-mono h-full'>
      <div className='a4 m-auto w-[21cm]' ref={componentRef}>
        <div className='grid grid-cols-3 items-center'>
          <div className='flex flex-col'>
            <p className='flex justify-between'>
              <span className='font-bold'>Do'kon:</span>{" "}
              <span>{auth.market.name}</span>
            </p>
            <p className='flex justify-between'>
              <span className='font-bold'>Telefon:</span>{" "}
              <span>+998 {auth.market.phone1}</span>
            </p>
            <p className='flex justify-between'>
              <span className='font-bold'>Manzil:</span>{" "}
              <span>{auth.market.address}</span>
            </p>
            <p className='flex justify-between'>
              <span className='font-bold'>Sana:</span>
              <span>{new Date(sales.createdAt).toLocaleDateString()}</span>
            </p>
          </div>
          <div className='text-center text-xl font-bold'>
            Buyurtma: A{sales.id}
          </div>
          <div className='text-right text-2xl font-bold '>PIPIHOUSE</div>
        </div>
        <hr />
        <div className='h-96 overflow-y-scroll'>
          <table className='relative table text-black border-collapse my-3'>
            <thead>
              <tr>
                <th className='border sticky py-1 bg-slate-200 text-black text-center top-0'>
                  №
                </th>
                <th className='border sticky py-1 bg-slate-200 text-black text-center top-0'>
                  Sanasi
                </th>
                <th className='border sticky py-1 bg-slate-200 text-black text-center top-0'>
                  Kategoriya
                </th>
                <th className='border sticky py-1 bg-slate-200 text-black text-center top-0'>
                  Mahsulot
                </th>
                <th className='border sticky py-1 bg-slate-200 text-black text-center top-0'>
                  Soni
                </th>
                <th className='border sticky py-1 bg-slate-200 text-black text-center top-0'>
                  Narxi (dona)
                </th>
                <th className='border sticky py-1 bg-slate-200 text-black text-center top-0'>
                  Jami
                </th>
              </tr>
            </thead>
            <tbody>
              {sales.products.map((product, index) => {
                return (
                  <tr key={index}>
                    <td className='font-bold text-center border border-black py-1'>
                      {index + 1}
                    </td>
                    <td className='font-bold text-right border border-black py-1'>
                      {new Date(product.createdAt).toLocaleDateString()}
                    </td>
                    <td className='font-bold text-right border border-black py-1'>
                      {product.product.category.code}
                    </td>
                    <td className='font-bold border border-black py-1'>
                      {product.product.name}
                    </td>
                    <td className='font-bold text-right border border-black py-1'>
                      {product.pieces.toLocaleString("de-DE")}
                    </td>
                    <td className='font-bold text-right border border-black py-1'>
                      {product.unitprice.toLocaleString("de-DE")} USD
                    </td>
                    <td className='font-bold text-right border border-black py-1 text-teal-900'>
                      {product.totalprice.toLocaleString("de-DE")} USD
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <table className='table'>
          <tfoot className='text-base'>
            <tr>
              <th colSpan={6} className='py-1'>
                Jami:
              </th>
              <th className='text-right text-teal-900 py-1'>
                {sales.products
                  .reduce((summ, product) => {
                    return summ + product.totalprice;
                  }, 0)
                  .toLocaleString("de-DE")}{" "}
                USD
              </th>
            </tr>
            <tr>
              <th colSpan={6} className='py-1'>
                To'langan:
              </th>
              <th className='text-right text-teal-900 py-1'>
                {sales.payments
                  .reduce((summ, payment) => {
                    return summ + payment.payment;
                  }, 0)
                  .toLocaleString("de-DE")}{" "}
                USD
              </th>
            </tr>
            <tr>
              <th colSpan={6} className='py-1'>
                Chegirma:
              </th>
              <th className='text-right text-teal-900 py-1'>
                {sales.discounts
                  .reduce((summ, discount) => {
                    return summ + discount.discount;
                  }, 0)
                  .toLocaleString("de-DE")}{" "}
                USD
              </th>
            </tr>
            <tr>
              <th colSpan={6} className='py-1'>
                Qarz:
              </th>
              <th className='text-right text-teal-900 py-1'>
                {sales.debts
                  .reduce((summ, debt) => {
                    return summ + debt.debt;
                  }, 0)
                  .toLocaleString("de-DE")}{" "}
                USD
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className='py-4 w-full'>
        <div className='w-full flex '>
          <button
            onClick={print}
            className='bg-teal-500 hover:bg-teal-600 text-white m-auto px-10 py-1 text-lg  rounded mr-4'>
            <FontAwesomeIcon icon={faPrint} />
          </button>
          <button
            onClick={() => setCheck(false)}
            className='bg-red-500 hover:bg-red-600 text-white m-auto px-10 py-1 text-lg  rounded ml-4'>
            <FontAwesomeIcon icon={faClose} />
          </button>
        </div>
      </div>
    </div>
  );
};
