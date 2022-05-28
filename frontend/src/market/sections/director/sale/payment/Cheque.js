import { faClose, faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { AuthContext } from "../../../../context/AuthContext";
// import QRCode from "qrcode";

export const Cheque = ({ sales, setCheck }) => {
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
    <div className='absolute top-0 z-50 w-full min-h-screen bg-white overflow-auto font-mono'>
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
            Buyurtma: A{sales.saleconnector && sales.saleconnector.id}
          </div>
          <div className='text-right text-2xl font-bold '>PIPIHOUSE</div>
        </div>
        <hr />
        <table className='table text-black border-collapse my-3'>
          <thead>
            <tr>
              <th className='border py-1 bg-slate-200 text-black text-center'>
                №
              </th>
              <th className='border py-1 bg-slate-200 text-black text-center'>
                Kategoriya
              </th>
              <th className='border py-1 bg-slate-200 text-black text-center'>
                Mahsulot
              </th>
              <th className='border py-1 bg-slate-200 text-black text-center'>
                Soni
              </th>
              <th className='border py-1 bg-slate-200 text-black text-center'>
                Narxi (dona)
              </th>
              <th className='border py-1 bg-slate-200 text-black text-center'>
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
          <tfoot className='text-base'>
            <tr>
              <th colSpan={5} className='py-1'>
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
              <th colSpan={5} className='py-1'>
                To'langan:
              </th>
              <th className='text-right text-teal-900 py-1'>
                {(sales.payment &&
                  sales.payment.payment &&
                  sales.payment.payment.toLocaleString("de-DE"))||0}{" "}
                USD
              </th>
            </tr>
            <tr>
              <th colSpan={5} className='py-1'>
                Chegirma:
              </th>
              <th className='text-right text-teal-900 py-1'>
                {(sales.discount &&
                  sales.discount.discount &&
                  sales.discount.discount.toLocaleString("de-DE")) ||
                  0}{" "}
                USD
              </th>
            </tr>
            <tr>
              <th colSpan={5} className='py-1'>
                Qarz:
              </th>
              <th className='text-right text-teal-900 py-1'>
                {(sales.debt &&
                  sales.debt.debt &&
                  sales.debt.debt.toLocaleString("de-DE")) ||
                  0}{" "}
                USD
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className='absolute bottom-0 py-4 w-full'>
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
