import React from 'react';
import {Pagination} from "../../director/components/Pagination";
import {ExcelUpload} from "./uploadExcel/ExcelUpload";
import {Sort} from "./../components/Sort";

const TableTemplate = ({
                           setTemplate,
                           setPageSize,
                           searchName,
                           searchTemplate,
                           templates,
                           currentTemplates,
                           setCurrentTemplates,
                           setCurrentPage,
                           currentPage,
                           countPage,
                           setModal2,
                           loading,
                           setImports,
                           setModal,
                           setRemove
                       }) => {
    return (
        <div className="table-container">
            <div className="table-container">
                <div className="table-responsive">
                    <table className="table m-0">
                        <thead className="bg-white">
                        <tr>
                            <th>
                                <select
                                    className="form-control form-control-sm selectpicker"
                                    placeholder="Bo'limni tanlang"
                                    onChange={setPageSize}
                                    style={{minWidth: "50px"}}
                                >
                                    <option value={10}>10</option>
                                    <option value={25}>25</option>
                                    <option value={50}>50</option>
                                    <option value={100}>100</option>
                                </select>
                            </th>
                            <th>
                                <input
                                    onChange={searchName}
                                    style={{maxWidth: "100px", minWidth: "100px"}}
                                    type="search"
                                    className="w-100 form-control form-control-sm selectpicker"
                                    placeholder=""
                                />
                            </th>
                            <th colSpan={2}>
                                <input
                                    onChange={searchTemplate}
                                    style={{maxWidth: "100px"}}
                                    type="search"
                                    className="form-control form-control-sm selectpicker inline-block"
                                    placeholder=""
                                    aria-controls="basicExample"
                                />
                                <Pagination
                                    setCurrentDatas={setCurrentTemplates}
                                    datas={templates}
                                    setCurrentPage={setCurrentPage}
                                    countPage={countPage}
                                    totalDatas={templates && templates.length}
                                />
                            </th>
                            <th className="text-center">
                                <ExcelUpload setData={setImports} setModal={setModal2} loading={loading}/>
                            </th>
                        </tr>
                        </thead>
                        <thead>
                        <tr>
                            <th className="border-right text-center">№</th>
                            <th className="border-right">
                                Nomi
                                <Sort
                                    data={currentTemplates}
                                    setData={setCurrentTemplates}
                                    property={"name"}
                                />
                            </th>
                            <th className="border-right max-w-screen-sm">
                                Shablon
                                <Sort
                                    data={currentTemplates}
                                    setData={setCurrentTemplates}
                                    property={"template"}
                                />
                            </th>
                            <th className="border-right">
                                Tahrirlash
                            </th>
                            <th className="border-right">
                                O'chirish
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentTemplates && currentTemplates.map((template, key) => {
                            return (
                                <tr key={key}>
                                    <td className="border-right font-weight-bold text-center text-sm">
                                        {currentPage * countPage + key + 1}
                                    </td>
                                    <td className="border-right font-bold text-teal-600">{template.name}</td>
                                    <td className="border-right">
                                        {template.template}
                                    </td>
                                    <td className="border-right text-center">
                                        <button
                                            id={`btn${key}`}
                                            onClick={() => {
                                                setTemplate(template);
                                            }}
                                            type="button"
                                            className="btn btn-success py-1 px-2 bg-teal-500 hover:bg-teal-600 font-sm"
                                            style={{fontSize: "75%"}}
                                        >
                                            Tahrirlash
                                        </button>
                                    </td>
                                    <td className="text-center">
                                        <button
                                            onClick={() => {
                                                setRemove(template);
                                                setModal(true);
                                            }}
                                            type="button"
                                            className="btn text-white py-1 px-2 bg-red-600 hover:bg-red-500 "
                                            style={{fontSize: "75%"}}
                                        >
                                            O'chirish
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TableTemplate;
