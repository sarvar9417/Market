import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const animatedComponents = makeAnimated();

export const RegisterIncoming = ({
  createHandler,
  removeIncoming,
  addIncoming,
  inputHandler,
  searchCategory,
  incomings,
  incoming,
  editIncoming,
  changeProduct,
  changeCategory,
  products,
  categorys,
  loading,
  suppliers,
  supplier,
  setSupplier,
  changeProductType,
  productType,
  brand,
  changeBrand,
  setModal,
}) => {
  const [value, setValue] = useState({
    supplier: false,
    category: false,
    // producttype: false,
    // brand: false,
    // product: false,
  });

  return (
    <>
      {/* Row start */}
      <div className="row gutters">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <div className="card-title">Mahsulotni qabul qilish</div>
            </div>
            <div className="card-body  ">
              <div className="bg-primary p-1 flex justify-between">
                <div className="w-1/3">
                  <Select
                    id="select"
                    placeholder="Yetkazib beruvchilar"
                    isClearable={true}
                    isLoading={loading}
                    onChange={(e) => {
                      setSupplier(e.supplier);
                      setValue({
                        ...value,
                        supplier: true,
                      });
                    }}
                    components={animatedComponents}
                    options={suppliers}
                    theme={(theme) => ({
                      ...theme,
                      color: "black",
                      borderRadius: 0,
                      padding: 0,
                      height: 0,
                    })}
                  />
                </div>
                <div className="w-1/3 px-1">
                  <Select
                    id="select"
                    isDisabled={!value.supplier}
                    placeholder="Kategoriyalar"
                    isClearable={true}
                    isLoading={loading}
                    onChange={(e) => {
                      changeCategory(e);
                      setValue({ ...value, category: true });
                    }}
                    components={animatedComponents}
                    options={categorys}
                    theme={(theme) => ({
                      ...theme,
                      borderRadius: 0,
                      padding: 0,
                      height: 0,
                    })}
                  />
                </div>
                <div className="w-1/3">
                  <Select
                    id="select"
                    isDisabled={!value.supplier}
                    placeholder="Mahsulot turlari"
                    isClearable={true}
                    isLoading={loading}
                    onChange={(e) => {
                      changeProductType(e);
                    }}
                    components={animatedComponents}
                    options={productType}
                    theme={(theme) => ({
                      ...theme,
                      color: "black",
                      borderRadius: 0,
                      padding: 0,
                      height: 0,
                    })}
                  />
                </div>
              </div>
              <div className="bg-primary p-1">
                <div>
                  <Select
                    id="select"
                    isDisabled={!value.supplier}
                    placeholder="Mahsulotlar"
                    isClearable={true}
                    isLoading={loading}
                    onChange={(e) => {
                      changeProduct(e);
                      setModal(true);
                    }}
                    components={animatedComponents}
                    options={products}
                    theme={(theme) => ({
                      ...theme,
                      borderRadius: 0,
                      padding: 0,
                      height: 0,
                    })}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <div className="card-title">Qabul qilinayotgan mahsulotlar</div>
            </div>
            <div className="card-body">
              <div className="row gutters">
                <div className="col-12">
                  <div className="text-teal-900 font-bold text-lg">
                    Yetzib beruvchi: {supplier && supplier.name}
                  </div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="border py-1 fontbold text-center">№</th>
                        <th className="border py-1 fontbold text-center">
                          Kategoriyasi va kategoriya kodi
                        </th>
                        <th className="border py-1 fontbold text-center">
                          Nomi va kodi
                        </th>
                        <th className="border py-1 fontbold text-center">
                          Mahsulot turi
                        </th>
                        <th className="border py-1 fontbold text-center">
                          Soni
                        </th>
                        <th className="border py-1 fontbold text-center">
                          Narx (1)
                        </th>
                        <th className="border py-1 fontbold text-center">
                          Ulgurji narxi
                        </th>
                        <th className="border py-1 fontbold text-center">
                          Tahrirlash
                        </th>
                        <th className="border py-1 fontbold text-center">
                          O'chirish
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {incomings &&
                        incomings.map((product, key) => {
                          return (
                            <tr key={key}>
                              <td className="font-bold text-center border">
                                {key + 1}
                              </td>
                              <td className="border text-black font-bold">
                                {product.category.code}
                              </td>
                              <td className="border text-black font-bold">
                                {product.product.code} {" - "}{" "}
                                {product.product.name},{" "}
                                {product.brand && product.brand.name.toUpperCase()}
                              </td>
                              <td className="border text-black font-bold">
                                <span>{product.producttype.name}</span>
                              </td>
                              <td className="border text-black font-bold text-right">
                                <span>{product.pieces} </span>
                              </td>
                              <td className="border text-black font-bold text-right">
                                <span> {product.unitprice} $</span>
                              </td>
                              <td className="border text-black font-bold text-right">
                                <span>{product.totalprice} $</span>
                              </td>
                              <td className="border text-black font-bold text-center py-0">
                                <button
                                  onClick={() => editIncoming(product, key)}
                                  className="bg-teal-500 hover:bg-teal-600 px-4 py-1 text-white"
                                >
                                  <FontAwesomeIcon icon={faPenAlt} />
                                </button>
                              </td>
                              <td className="border text-black font-bold text-center py-0">
                                <button
                                  onClick={() => removeIncoming(key)}
                                  className="bg-red-500 hover:bg-red-600 px-4 py-1 text-white"
                                >
                                  <FontAwesomeIcon icon={faTrashAlt} />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                    <tfoot></tfoot>
                  </table>
                </div>
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="text-right">
                    {loading ? (
                      <button className="btn btn-primary" disabled>
                        <span className="spinner-border spinner-border-sm"></span>
                        Loading...
                      </button>
                    ) : (
                      <button
                        onClick={createHandler}
                        className="btn btn-primary"
                      >
                        Saqlash
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
      {/* Row end */}
    </>
  );
};
