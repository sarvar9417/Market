import React, { useCallback, useEffect, useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'

const animatedComponents = makeAnimated()

export const RegisterIncoming = ({
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
              <div className="row mt-3">
                <div className="col-md-4">
                  <p className="font-bold text-teal-700">Yetkazib beruvchi</p>
                  <Select
                    placeholder="Yetkazib beruvchilar"
                    isClearable={true}
                    isLoading={loading}
                    onChange={(e) => setSupplier(e)}
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
                    placeholder="Mahsulot kategoriyalari"
                    isClearable={true}
                    isLoading={loading}
                    onChange={(e) => setSupplier(e)}
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
                    placeholder="Mahsulotlar"
                    isClearable={true}
                    isLoading={loading}
                    onChange={(e) => setSupplier(e)}
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
              </div>
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
                        <th className="border py-1">№</th>
                        <th className="border py-1">Nomi</th>
                        <th className="border py-1">Narxi</th>
                        <th className="border py-1">Soni</th>
                      </tr>
                    </thead>
                    <tbody></tbody>
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
