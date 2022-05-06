import React from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'

const animatedComponents = makeAnimated()

export const RegisterIncoming = ({
  inputHandler,
  searchCategory,
  incomings,
  incoming,
  changeProducts,
  changeCategory,
  products,
  categorys,
  loading,
  suppliers,
  supplier,
  setSupplier,
}) => {
  return (
    <>
      {/* Row start */}
      <div className="row gutters">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <div className="card-title">Mahsulotni qabul qilish</div>
              <table className="table">
                <thead>
                  <tr>
                    <th className="border p-1 text-black">
                      <Select
                        placeholder="Yetkazib beruvchilar"
                        isClearable={true}
                        isLoading={loading}
                        onChange={(e) => setSupplier(e.supplier)}
                        components={animatedComponents}
                        options={suppliers}
                        theme={(theme) => ({
                          ...theme,
                          color: 'black',
                          borderRadius: 0,
                          padding: 0,
                          height: 0,
                        })}
                      />
                    </th>
                    <th className="border p-1 text-black">
                      <Select
                        isDisabled={!supplier}
                        placeholder="Mahsulot kategoriyalari"
                        isClearable={true}
                        isLoading={loading}
                        onChange={changeCategory}
                        components={animatedComponents}
                        options={categorys}
                        theme={(theme) => ({
                          ...theme,
                          borderRadius: 0,
                          padding: 0,
                          height: 0,
                        })}
                      />
                    </th>
                    <th className="border p-1 text-black">
                      <Select
                        isDisabled={!supplier}
                        placeholder="Mahsulotlar"
                        isClearable={true}
                        isLoading={loading}
                        onChange={changeProducts}
                        components={animatedComponents}
                        options={products}
                        theme={(theme) => ({
                          ...theme,
                          borderRadius: 0,
                          padding: 0,
                          height: 0,
                        })}
                      />
                    </th>
                    <th className="border">Soni</th>
                    <th className="border">Narx (1)</th>
                    <th className="border">Umumiy narx</th>
                    <th className="border">Qo'shish</th>
                  </tr>
                </thead>
                {incoming ? (
                  <tbody>
                    <tr className="bg-slate-100">
                      <td className="border m-0 px-3 py-2 font-bold">
                        {incoming.supplier.name}
                      </td>
                      <td className="border m-0 px-3 py-2 font-bold">
                        {incoming.category.code} - {incoming.category.name}
                      </td>
                      <td className="border m-0 px-3 py-2 font-bold">
                        {incoming.product.code} - {incoming.product.name}
                      </td>
                      <td className="border m-0 px-3 py-2 font-bold">
                        <input
                          onChange={inputHandler}
                          value={incoming.pieces && incoming.pieces}
                          type="number"
                          step={0.001}
                          className="outline-none text-right"
                          style={{ maxWidth: '50px' }}
                          name="pieces"
                        />
                      </td>
                      <td className="border m-0 px-3 py-2 font-bold">
                        <input
                          onChange={inputHandler}
                          value={incoming.unitprice && incoming.unitprice}
                          type="number"
                          className="outline-none text-right"
                          style={{ maxWidth: '50px' }}
                          name="unitprice"
                        />
                      </td>
                      <td className="border m-0 px-3 py-2 font-bold text-right">
                        <input
                          onChange={inputHandler}
                          value={incoming.totalprice}
                          type="number"
                          style={{ maxWidth: '50px' }}
                          className="outline-none text-right w-full"
                          name="totalprice"
                        />
                      </td>
                      <td className="border  m-0 px-3 py-1 text-center">
                        <button className="bg-emerald-600 text-white px-4 py-1 rounded hover:bg-emerald-500">
                          +
                        </button>
                      </td>
                    </tr>
                  </tbody>
                ) : (
                  <tbody></tbody>
                )}
              </table>
              {/* <div className="row mt-3">
                <div className="col-md-4">
                  <p className="font-bold text-teal-700">Yetkazib beruvchi</p>
                  <Select
                    placeholder="Yetkazib beruvchilar"
                    isClearable={true}
                    isLoading={loading}
                    onChange={(e) => setSupplier(e.supplier)}
                    components={animatedComponents}
                    options={suppliers}
                    theme={(theme) => ({
                      ...theme,
                      borderRadius: 0,
                      padding: 0,
                      height: 0,
                    })}
                  />
                </div>
                <div className="col-md-4">
                  <p className="font-bold text-teal-700">
                    Mahsulot categoriyasi
                  </p>
                  <Select
                    isDisabled={!supplier}
                    placeholder="Mahsulot kategoriyalari"
                    isClearable={true}
                    isLoading={loading}
                    onChange={changeCategory}
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
                <div className="col-md-4">
                  <p className="font-bold text-teal-700">Mahsulotlar</p>
                  <Select
                    isDisabled={!supplier}
                    closeMenuOnSelect={false}
                    placeholder="Mahsulotlar"
                    isClearable={true}
                    isLoading={loading}
                    onChange={changeProducts}
                    components={animatedComponents}
                    options={products}
                    theme={(theme) => ({
                      ...theme,
                      borderRadius: 0,
                      padding: 0,
                      height: 0,
                    })}
                    isMulti
                  />
                </div>
              </div> */}
            </div>
            <div className="card-body"></div>
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
                          Soni
                        </th>
                        <th className="border py-1 fontbold text-center">
                          Chakana narxi
                        </th>
                        <th className="border py-1 fontbold text-center">
                          Ulgurji narxi
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {incomings.map((product, key) => {
                        return (
                          <tr>
                            <td className="font-bold text-center">{key + 1}</td>
                            <td>
                              <span>{product.category.code}</span>
                              <span>{product.category.name}</span>
                            </td>
                            <td>
                              <span>{product.product.code}</span>
                              <span>{product.product.name}</span>
                            </td>
                          </tr>
                        )
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
                      <button className="btn btn-primary">Saqlash</button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Row end */}
    </>
  )
}
