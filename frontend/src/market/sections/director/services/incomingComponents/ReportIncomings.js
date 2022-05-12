import React from "react";
import { Datapicker } from "./Datepicker";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

export const ReportIncomings = ({ dailyConnectors, suppliers, totalproducts, totalprice, totalproducttypes }) => {
    return (
        <div className="py-3 w-full">
            <div className="grid grid-cols-12">
                <div className="xsm:col-span-12 sm:col-sapn-12 md:col-span-4 lg:col-span-3">
                    <div className=" xsm:text-center sm:text-start">
                        <Datapicker />
                    </div>
                    <div className="font-bold flex justify-between pr-8 py-2">
                        <span>Yetkazib beruvchilar:</span>{" "}
                        <span className="py-1 px-3 bg-[#29245A]"></span>
                    </div>
                    <div className="font-bold flex justify-between pr-8 py-2">
                        <span>Mahsulotlar:</span>{" "}
                        <span className="py-1 px-3 bg-indigo-700"></span>
                    </div>
                    <div className="font-bold flex justify-between pr-8 py-2">
                        <span>Umumiy summasi:</span>{" "}
                        <span className="py-1 px-3 bg-amber-100"></span>
                    </div>
                </div>
                <div className="xsm:col-span-12 sm:col-span-12 md:col-span-8 lg:col-span-9 ">
                    <div className="grid grid-12">
                        <div className="flex justify-between sm:flex-row sm:space-y-0 sm:flex-start xsm:flex-col xsm:space-y-4 xsm:items-start ">
                            <div className="text-base text-primary ">
                                <Select
                                    id="select"
                                    placeholder="Yetkazib beruvchilar"
                                    isClearable={true}
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
                            <p className="font-bold text-base text-teal-700 ">
                                Mahsulotlar turlari: <span>{totalproducttypes}</span>
                            </p>
                            <p className="font-bold text-base text-teal-700 ">
                                Mahsulotlar: <span>{totalproducts}</span>
                            </p>
                            <p className="font-bold text-base text-teal-700 ">
                                Summasi: <span>{totalprice}$</span>
                            </p>
                        </div>
                    </div>
                    <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 xsm:grid-col-2 py-2 gap-3 ">
                        {
                            dailyConnectors.map((connector, index) => {
                                return <div key={index}>
                                    <button className="bg-[#216BA5] font-bold rounded text-white text-left py-2 px-3 inline-block w-100" >
                                        <p className="font-bold  text-right  flex justify-between">
                                            <span className="font-bold text-orange-700">{connector.suppliers}</span>
                                            <span className="text-amber-100">
                                                {new Date().toLocaleDateString()}
                                            </span>
                                        </p>
                                        <p className="font-bold  flex justify-around text-2xl py-1">
                                            <span className="text-amber-100">{connector.total} $</span>
                                        </p>
                                        <p className="font-bold text-sm flex justify-between">
                                            <span className="text-orange-400 font-bold">{connector.producttypes}</span>
                                            <span className="text-orange-400 font-bold">{connector.products}</span>
                                        </p>
                                    </button>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
        </div >
    );
};
