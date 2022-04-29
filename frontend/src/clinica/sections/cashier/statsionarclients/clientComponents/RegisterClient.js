import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFloppyDisk} from "@fortawesome/free-solid-svg-icons";

export const RegisterClient = ({
                                   updateServices,
                                   room,
                                   inputPayment,
                                   totalpayment,
                                   checkPayment,
                                   debtComment,
                                   changeDebt,
                                   serviceComment,
                                   productComment,
                                   discountComment,
                                   discount,
                                   changeDiscount,
                                   setPayment,
                                   changeProduct,
                                   changeService,
                                   payments,
                                   payment,
                                   client,
                                   services,
                                   products,
                                   loading,
                                   connector
                               }) => {
    return (
        <>
            {/* Row start */}
            <div className="row gutters">
                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <div className="card-title">Mijozning shaxsiy ma'lumotlari</div>
                        </div>
                        <div className="card-body">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th scope="col" className="border py-1">
                                        #
                                    </th>
                                    <th scope="col" className="border py-1">
                                        First
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td className="py-1 border">Familiyasi</td>
                                    <td className="py-1 border">{client.lastname}</td>
                                </tr>
                                <tr>
                                    <td className="py-1 border">Ismi</td>
                                    <td className="py-1 border">{client.firstname}</td>
                                </tr>
                                <tr>
                                    <td className="py-1 border">Otasining ismi</td>
                                    <td className="py-1 border">{client.fathername}</td>
                                </tr>
                                <tr>
                                    <td className="py-1 border">Tugilgan sanasi</td>
                                    <td className="py-1 border">{client.born && new Date(client.born).toLocaleDateString()}</td>
                                </tr>
                                <tr>
                                    <td className="py-1 border">Telefon raqami</td>
                                    <td className="py-1 border">+998{client.phone}</td>
                                </tr>
                                <tr>
                                    <td className="py-1 border">ID</td>
                                    <td className="py-1 border">{client.id}</td>
                                </tr>
                                <tr>
                                    <td className="py-1 border">Probirka</td>
                                    <td className="py-1 border">{connector.probirka}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <div className="card-title">
                                Xizmat va tolovlar bilan ishlash bo'limi
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="row gutters">
                                <div className="col-12">
                                    <table className="table table-sm border-collapse">
                                        <thead>
                                        <tr>
                                            <th className="border py-1">№</th>
                                            <th className="border py-1">Nomi</th>
                                            <th className="border py-1">Narxi</th>
                                            <th className="border py-1">Soni</th>
                                            <th className="border py-1">To'lov</th>
                                            <th className="border py-1">Izoh</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {services &&
                                            services.map((service, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td className="py-1 border">{index + 1}</td>
                                                        <td className="py-1 border">{service.service.name}</td>
                                                        <td className="text-right py-1 border">
                                                            {service.service.price * service.pieces}
                                                        </td>
                                                        <td className="text-right py-1 border">
                                                            {service.pieces}
                                                        </td>
                                                        <td className="text-right py-1 border">
                                                            <div className="custom-control custom-checkbox text-center">
                                                                <input
                                                                    defaultChecked={!service.refuse}
                                                                    type="checkbox"
                                                                    className="custom-control-input border border-dager"
                                                                    id={`service${index}`}
                                                                    onChange={(e) => changeService(e, index)}
                                                                />
                                                                <label className="custom-control-label"
                                                                       htmlFor={`service${index}`}></label>
                                                            </div>
                                                        </td>
                                                        <td className="text-right py-1 border">
                                                            {service.refuse && <input
                                                                onChange={(e) => serviceComment(e, index)}
                                                                defaultValue={service.comment}
                                                                type="text"
                                                                className="form-control form-control-sm"
                                                                id="comment"
                                                                name="comment"
                                                                placeholder="Izoh"
                                                            />}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        <tr></tr>
                                        {products &&
                                            products.map((product, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td className="py-1 border">{index + 1}</td>
                                                        <td className="py-1 border">{product.product.name}</td>
                                                        <td className="text-right py-1 border">
                                                            {product.product.price * product.pieces}
                                                        </td>
                                                        <td className="text-right py-1 border">
                                                            {product.pieces}
                                                        </td>
                                                        <td className="text-right py-1 border">
                                                            <div className="custom-control custom-checkbox text-center">
                                                                <input defaultChecked={!product.refuse}
                                                                       type="checkbox"
                                                                       className="custom-control-input border border-dager"
                                                                       id={`product${index}`}
                                                                       onChange={(e) => changeProduct(e, index)}
                                                                />
                                                                <label className="custom-control-label"
                                                                       htmlFor={`product${index}`}></label>
                                                            </div>
                                                        </td>
                                                        <td className="text-right py-1 border">
                                                            {product.refuse && <input
                                                                onChange={(e) => productComment(e, index)}
                                                                defaultValue={product.comment}
                                                                type="text"
                                                                className="form-control form-control-sm"
                                                                id="comment"
                                                                name="comment"
                                                                placeholder="Izoh"
                                                            />}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        <tr>
                                            <td className="border py-1 font-bold"> Xona</td>
                                            <td className="border py-1 text-emerald-600 font-bold"> {room.type}</td>
                                            <td className="border py-1 text-right font-bold"> {room.price}</td>
                                            <td className="border py-1 text-right font-bold"> {room.day} kun
                                            </td>
                                            <td className="border font-bold text-right">{room.totalprice}</td>
                                            <td className="border"></td>
                                        </tr>
                                        <tr className="bg-white">
                                            <td className="border py-1 font-bold text-right text-teal-600 text-sm "
                                                colSpan={2}> Jami
                                            </td>
                                            <td className="border py-1 font-bold  text-teal-600 text-sm"
                                                colSpan={4}> {totalpayment}</td>

                                        </tr>
                                        </tbody>

                                    </table>
                                    <div>
                                        <button
                                            onClick={updateServices}
                                            className="bg-teal-500 py-1 px-3 text-white rounded-sm float-right hover:bg-teal-600 d-inline-block">
                                            <FontAwesomeIcon icon={faFloppyDisk}/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <div className="card-title">
                                Hisobot
                            </div>
                        </div>
                        {connector.room && connector.room.endday ? <div className="card-body">
                                <table className="table table-sm">
                                    <tfoot>
                                    <tr>
                                        <th className="text-right" colSpan={2}>
                                            Jami to'lov:
                                        </th>
                                        <th className="text-left" colSpan={4}>
                                            {totalpayment}
                                        </th>
                                    </tr>
                                    <tr>
                                        <th className="text-right" colSpan={2}>
                                            Chegirma:
                                        </th>
                                        <th className="text-left" colSpan={4}>
                                            { discount.discount}
                                        </th>
                                    </tr>
                                    <tr>
                                        <th className="text-right" colSpan={2}>
                                            To'langan:
                                        </th>
                                        <th className="text-left" colSpan={4}>
                                            {payments}
                                        </th>
                                    </tr>
                                    <tr>
                                        <th className="text-right" colSpan={2}>
                                            Qarz:
                                        </th>
                                        <th className="text-left" colSpan={4}>
                                            {payment.debt}
                                        </th>
                                    </tr>
                                    <tr>
                                        <th className="text-right" colSpan={2}>
                                            To'lanayotgan:
                                        </th>
                                        <th className="text-left" colSpan={4}>
                                            {totalpayment - payments  - discount.discount - payment.debt}
                                        </th>
                                    </tr>
                                    </tfoot>
                                </table>
                            </div> :
                            <div className="card-body">
                                <table className="table table-sm">
                                    <tfoot>
                                    <tr>
                                        <th className="text-right" colSpan={2}>
                                            Jami to'lov:
                                        </th>
                                        <th className="text-left" colSpan={4}>
                                            {totalpayment}
                                        </th>
                                    </tr>
                                    <tr>
                                        <th className="text-right" colSpan={2}>
                                            Oldindan to'lov:
                                        </th>
                                        <th className="text-left" colSpan={4}>
                                            {payments}
                                        </th>
                                    </tr>
                                    <tr>
                                        <th className="text-right" colSpan={2}>
                                            To'lanayotgan summa:
                                        </th>
                                        <th className="text-left" colSpan={4}>
                                            {payment.payment}
                                        </th>
                                    </tr>
                                    </tfoot>
                                </table>
                            </div>
                        }
                    </div>
                </div>
                <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <div className="card-title">
                                To'lov qabul qilish
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className={connector.room && connector.room.endday ? "col - md - 6" : "d-none"}>
                                    <div className="form-group">
                                        <div className="input-group input-group-sm mb-3">
                                            <div className="input-group-prepend w-25">
                                                <span
                                                    className="w-100 input-group-text bg-primary text-white font-weight-bold"
                                                    id="inputGroup-sizing-sm"
                                                    style={{fontSize: "9pt"}}>
                                                    Chegirma
                                                </span>
                                            </div>
                                            {
                                                discount.procient ?
                                                    <input
                                                        onChange={changeDiscount}
                                                        type="number"
                                                        className="form-control"
                                                        placeholder="Chegirma foizi yoki summasini kiriting"
                                                        defaultValue={discount.discount}
                                                    /> : <input
                                                        onChange={changeDiscount}
                                                        type="number"
                                                        className="form-control"
                                                        placeholder="Chegirma foizi yoki summasini kiriting"
                                                        value={discount.discount || ''}
                                                    />}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="input-group input-group-sm">
                                            <div className="input-group-prepend w-25">
                                                <label
                                                    className="w-100 input-group-text bg-primary text-white font-weight-bold"
                                                    htmlFor="inputGroupSelect01"
                                                    style={{fontSize: "9pt"}}
                                                >
                                                    Izoh</label>
                                            </div>
                                            <select
                                                onChange={discountComment}
                                                className="custom-select"
                                                id="inputGroupSelect01"
                                            >
                                                <option value="delete">Tanglang</option>
                                                <option value="Kam ta'minlangan">Kam ta'minlangan</option>
                                                <option value="Two">Two</option>
                                                <option value="Three">Three</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="input-group input-group-sm mb-3">
                                            <div className="input-group-prepend w-25">
                                                <span
                                                    className="w-100 input-group-text bg-primary text-white font-weight-bold"
                                                    id="inputGroup-sizing-sm"
                                                    style={{fontSize: "9pt"}}>
                                                    Qarz
                                                </span>
                                            </div>
                                            <input
                                                onChange={changeDebt}
                                                type="number"
                                                className="form-control"
                                                placeholder="Qarz summasini kiriting"
                                                value={payment.debt || ''}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group m-0 mb-3">
                                        <div className="input-group input-group-sm">
                                            <div className="input-group-prepend w-25">
                                                <span
                                                    className="w-100 input-group-text bg-primary text-white font-weight-bold"
                                                    id="inputGroup-sizing-sm"
                                                    style={{fontSize: "9pt"}}>
                                                    Izoh
                                                </span>
                                            </div>
                                            <input
                                                onChange={debtComment}
                                                type="text"
                                                className="form-control"
                                                placeholder="Qarz izohini kiriting"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className={connector.room && connector.room.endday ? "col-md-6" : "col-12"}>
                                    <div className="btn-group mb-3 w-100" role="group" aria-label="Basic example">
                                    <button
                                            onClick={() => {
                                                setPayment({
                                                    ...payment,
                                                    type: "cash",
                                                    payment: totalpayment - payments - discount.discount - payment.debt,
                                                    cash: totalpayment - payments - discount.discount - payment.debt,
                                                    card: 0,
                                                    transfer: 0
                                                })
                                            }}
                                            type="button"
                                            className={`btn btn-sm py-1 text-white  ${payment.type === "cash" ? "bg-amber-500" : "bg-teal-500"}`}
                                        >
                                            Naqt
                                        </button>
                                        <button
                                            onClick={() => {
                                                setPayment({
                                                    ...payment,
                                                    type: "card",
                                                    payment: totalpayment - payments - discount.discount - payment.debt,
                                                    cash: 0,
                                                    card: totalpayment - payments - discount.discount - payment.debt,
                                                    transfer: 0
                                                })
                                            }}
                                            type="button"
                                            className={`btn btn-sm py-1 text-white ${payment.type === "card" ? "bg-amber-500" : "bg-teal-500"}`}
                                        >
                                            Plastik
                                        </button>
                                        <button
                                            onClick={() => {
                                                setPayment({
                                                    ...payment,
                                                    type: "transfer",
                                                    payment:totalpayment - payments - discount.discount - payment.debt,
                                                    cash: 0,
                                                    card: 0,
                                                    transfer: totalpayment - payments - discount.discount - payment.debt
                                                })
                                            }}
                                            type="button"
                                            className={`btn btn-sm py-1 text-white ${payment.type === "transfer" ? "bg-amber-500" : "bg-teal-500"}`}
                                        >
                                            O'tkazma
                                        </button>
                                        <button
                                            onClick={() => {
                                                setPayment({
                                                    ...payment,
                                                    type: "mixed",
                                                    cash: 0,
                                                    card: 0,
                                                    transfer: 0
                                                })
                                            }}
                                            type="button"
                                            className={`btn btn-sm py-1 text-white ${payment.type === "mixed" ? "bg-amber-500" : "bg-teal-500"}`}
                                        >
                                            Aralash
                                        </button>
                                    </div>
                                    {(payment.type === "cash" || payment.type === "mixed") &&
                                        <div className="input-group input-group-sm mb-3">
                                            <div className="input-group-prepend w-25">
                                                <span
                                                    className="w-100 input-group-text bg-primary text-white font-weight-bold"
                                                    id="inputGroup-sizing-sm"
                                                    style={{fontSize: "9pt"}}>
                                                    Naqt
                                                </span>
                                            </div>
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="Naqt to'lov"
                                                value={payment.cash || ''}
                                                name="cash"
                                                onChange={inputPayment}
                                            />
                                        </div>}
                                    {(payment.type === "card" || payment.type === "mixed") &&
                                        <div className="input-group input-group-sm mb-3">
                                            <div className="input-group-prepend w-25">
                                                <span
                                                    className="w-100 input-group-text bg-primary text-white font-weight-bold"
                                                    id="inputGroup-sizing-sm"
                                                    style={{fontSize: "9pt"}}>
                                                    Plastik
                                                </span>
                                            </div>
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="Karta orqali to'lov to'lov"
                                                value={payment.card || ''}
                                                name="card"
                                                onChange={inputPayment}
                                            />
                                        </div>}
                                    {(payment.type === "transfer" || payment.type === "mixed") &&
                                        <div className="input-group input-group-sm mb-3">
                                            <div className="input-group-prepend w-25">
                                                <span
                                                    className="w-100 input-group-text bg-primary text-white font-weight-bold"
                                                    id="inputGroup-sizing-sm"
                                                    style={{fontSize: "9pt"}}>
                                                    O'tkazma
                                                </span>
                                            </div>
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="O'tkazma to'lov"
                                                value={payment.transfer || ''}
                                                name="transfer"
                                                onChange={inputPayment}
                                            />
                                        </div>}

                                </div>
                            </div>

                        </div>
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mb-3">
                            <div className="text-right">
                                {loading ? (
                                    <button className="btn btn-warning" disabled>
                                        <span className="spinner-border spinner-border-sm"></span>
                                        Loading...
                                    </button>
                                ) : (
                                    <button onClick={checkPayment} className="btn btn-warning w-100">
                                        Qabul qilish
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Row end */}
        </>
    );
};
