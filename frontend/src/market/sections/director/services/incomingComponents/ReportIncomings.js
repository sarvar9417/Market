import React, { useState } from "react";
import { Datapicker } from "./Datepicker";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

export const ReportIncomings = ({ connectors, suppliers }) => {
    const [totalprice, setTotalPrice] = useState(0)
    const [totalproducts, setTotalProducts] = useState(0)

    const [dailyConnectors, setDailyConnectors] = useState([])

    

    return (
        <div className='py-3 w-full'>
            <div className='grid grid-cols-12'>
                <div className='col-span-3'>
                    <Datapicker />
                    <div className="font-bold flex justify-between pr-8 py-2">
                        <span>Yetkazib beruvchilar:</span> <span className="py-1 px-3 bg-[#29245A]"></span>
                    </div>
                    <div className="font-bold flex justify-between pr-8 py-2">
                        <span>Mahsulotlar:</span> <span className="py-1 px-3 bg-indigo-700"></span>
                    </div>
                    <div className="font-bold flex justify-between pr-8 py-2">
                        <span>Umumiy summasi:</span> <span className="py-1 px-3 bg-amber-100"></span>
                    </div>
                </div>
                <div className='col-span-9'>
                    <div className='grid grid-12'>
                        <div className='flex justify-between'>
                            <div className='font-bold text-primary '>
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
                            <p className='font-bold text-base text-teal-700 '>
                                Mahsulotlar: <span>{totalproducts}</span>
                            </p>
                            <p className='font-bold text-base text-teal-700 '>
                                Summasi: <span>{totalprice}$</span>
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 py-2 gap-3">
                        <div className="col-span-2">
                            <button className="bg-[#216BA5] font-bold rounded text-white text-left py-2 px-3 inline-block w-100">
                                <p className="font-bold  text-right text-xs">
                                    <span className="text-amber-100">{new Date().toLocaleDateString()}</span>
                                </p>
                                <p className="font-bold  flex justify-around text-2xl py-1">
                                    <span className="text-amber-100">3000 $</span>
                                </p>
                                <p className="font-bold text-sm flex justify-between">
                                    <span className="text-primary font-bold">5</span>
                                    <span className="text-orange-400 font-bold">240</span>
                                </p>

                            </button>
                        </div>
                        <div className="col-span-2">
                            <button className="bg-[#216BA5] font-bold rounded text-white text-left py-2 px-3 inline-block w-100">
                                <p className="font-bold  text-right text-xs">
                                    <span className="text-amber-100">{new Date().toLocaleDateString()}</span>
                                </p>
                                <p className="font-bold  flex justify-around text-2xl py-1">
                                    <span className="text-amber-100">3000 $</span>
                                </p>
                                <p className="font-bold text-sm flex justify-between">
                                    <span className="text-primary font-bold">5</span>
                                    <span className="text-orange-400 font-bold">240</span>
                                </p>

                            </button>
                        </div>
                        <div className="col-span-2">
                            <button className="bg-[#216BA5] font-bold rounded text-white text-left py-2 px-3 inline-block w-100">
                                <p className="font-bold  text-right text-xs">
                                    <span className="text-amber-100">{new Date().toLocaleDateString()}</span>
                                </p>
                                <p className="font-bold  flex justify-around text-2xl py-1">
                                    <span className="text-amber-100">3000 $</span>
                                </p>
                                <p className="font-bold text-sm flex justify-between">
                                    <span className="text-primary font-bold">5</span>
                                    <span className="text-orange-400 font-bold">240</span>
                                </p>

                            </button>
                        </div>
                        <div className="col-span-2">
                            <button className="bg-[#216BA5] font-bold rounded text-white text-left py-2 px-3 inline-block w-100">
                                <p className="font-bold  text-right text-xs">
                                    <span className="text-amber-100">{new Date().toLocaleDateString()}</span>
                                </p>
                                <p className="font-bold  flex justify-around text-2xl py-1">
                                    <span className="text-amber-100">3000 $</span>
                                </p>
                                <p className="font-bold text-sm flex justify-between">
                                    <span className="text-primary font-bold">5</span>
                                    <span className="text-orange-400 font-bold">240</span>
                                </p>

                            </button>
                        </div>
                        <div className="col-span-2">
                            <button className="bg-[#216BA5] font-bold rounded text-white text-left py-2 px-3 inline-block w-100">
                                <p className="font-bold  text-right text-xs">
                                    <span className="text-amber-100">{new Date().toLocaleDateString()}</span>
                                </p>
                                <p className="font-bold  flex justify-around text-2xl py-1">
                                    <span className="text-amber-100">3000 $</span>
                                </p>
                                <p className="font-bold text-sm flex justify-between">
                                    <span className="text-primary font-bold">5</span>
                                    <span className="text-orange-400 font-bold">240</span>
                                </p>

                            </button>
                        </div>
                        <div className="col-span-2">
                            <button className="bg-[#216BA5] font-bold rounded text-white text-left py-2 px-3 inline-block w-100">
                                <p className="font-bold  text-right text-xs">
                                    <span className="text-amber-100">{new Date().toLocaleDateString()}</span>
                                </p>
                                <p className="font-bold  flex justify-around text-2xl py-1">
                                    <span className="text-amber-100">3000 $</span>
                                </p>
                                <p className="font-bold text-sm flex justify-between">
                                    <span className="text-primary font-bold">5</span>
                                    <span className="text-orange-400 font-bold">240</span>
                                </p>

                            </button>
                        </div>

                        <div className="col-span-2">
                            <button className="bg-[#216BA5] font-bold rounded text-white text-left py-2 px-3 inline-block w-100">
                                <p className="font-bold  text-right text-xs">
                                    <span className="text-amber-100">{new Date().toLocaleDateString()}</span>
                                </p>
                                <p className="font-bold  flex justify-around text-2xl py-1">
                                    <span className="text-amber-100">3000 $</span>
                                </p>
                                <p className="font-bold text-sm flex justify-between">
                                    <span className="text-primary font-bold">5</span>
                                    <span className="text-orange-400 font-bold">240</span>
                                </p>

                            </button>
                        </div>
                        <div className="col-span-2">
                            <button className="bg-[#216BA5] font-bold rounded text-white text-left py-2 px-3 inline-block w-100">
                                <p className="font-bold  text-right text-xs">
                                    <span className="text-amber-100">{new Date().toLocaleDateString()}</span>
                                </p>
                                <p className="font-bold  flex justify-around text-2xl py-1">
                                    <span className="text-amber-100">3000 $</span>
                                </p>
                                <p className="font-bold text-sm flex justify-between">
                                    <span className="text-primary font-bold">5</span>
                                    <span className="text-orange-400 font-bold">240</span>
                                </p>

                            </button>
                        </div>
                        <div className="col-span-2">
                            <button className="bg-[#216BA5] font-bold rounded text-white text-left py-2 px-3 inline-block w-100">
                                <p className="font-bold  text-right text-xs">
                                    <span className="text-amber-100">{new Date().toLocaleDateString()}</span>
                                </p>
                                <p className="font-bold  flex justify-around text-2xl py-1">
                                    <span className="text-amber-100">3000 $</span>
                                </p>
                                <p className="font-bold text-sm flex justify-between">
                                    <span className="text-primary font-bold">5</span>
                                    <span className="text-orange-400 font-bold">240</span>
                                </p>

                            </button>
                        </div>
                        <div className="col-span-2">
                            <button className="bg-[#216BA5] font-bold rounded text-white text-left py-2 px-3 inline-block w-100">
                                <p className="font-bold  text-right text-xs">
                                    <span className="text-amber-100">{new Date().toLocaleDateString()}</span>
                                </p>
                                <p className="font-bold  flex justify-around text-2xl py-1">
                                    <span className="text-amber-100">3000 $</span>
                                </p>
                                <p className="font-bold text-sm flex justify-between">
                                    <span className="text-primary font-bold">5</span>
                                    <span className="text-orange-400 font-bold">240</span>
                                </p>

                            </button>
                        </div>
                        <div className="col-span-2">
                            <button className="bg-[#216BA5] font-bold rounded text-white text-left py-2 px-3 inline-block w-100">
                                <p className="font-bold  text-right text-xs">
                                    <span className="text-amber-100">{new Date().toLocaleDateString()}</span>
                                </p>
                                <p className="font-bold  flex justify-around text-2xl py-1">
                                    <span className="text-amber-100">3000 $</span>
                                </p>
                                <p className="font-bold text-sm flex justify-between">
                                    <span className="text-primary font-bold">5</span>
                                    <span className="text-orange-400 font-bold">240</span>
                                </p>

                            </button>
                        </div>
                        <div className="col-span-2">
                            <button className="bg-[#216BA5] font-bold rounded text-white text-left py-2 px-3 inline-block w-100">
                                <p className="font-bold  text-right text-xs">
                                    <span className="text-amber-100">{new Date().toLocaleDateString()}</span>
                                </p>
                                <p className="font-bold  flex justify-around text-2xl py-1">
                                    <span className="text-amber-100">3000 $</span>
                                </p>
                                <p className="font-bold text-sm flex justify-between">
                                    <span className="text-primary font-bold">5</span>
                                    <span className="text-orange-400 font-bold">240</span>
                                </p>

                            </button>
                        </div>

                        <div className="col-span-2">
                            <button className="bg-[#216BA5] font-bold rounded text-white text-left py-2 px-3 inline-block w-100">
                                <p className="font-bold  text-right text-xs">
                                    <span className="text-amber-100">{new Date().toLocaleDateString()}</span>
                                </p>
                                <p className="font-bold  flex justify-around text-2xl py-1">
                                    <span className="text-amber-100">3000 $</span>
                                </p>
                                <p className="font-bold text-sm flex justify-between">
                                    <span className="text-primary font-bold">5</span>
                                    <span className="text-orange-400 font-bold">240</span>
                                </p>

                            </button>
                        </div>
                        <div className="col-span-2">
                            <button className="bg-[#216BA5] font-bold rounded text-white text-left py-2 px-3 inline-block w-100">
                                <p className="font-bold  text-right text-xs">
                                    <span className="text-amber-100">{new Date().toLocaleDateString()}</span>
                                </p>
                                <p className="font-bold  flex justify-around text-2xl py-1">
                                    <span className="text-amber-100">3000 $</span>
                                </p>
                                <p className="font-bold text-sm flex justify-between">
                                    <span className="text-primary font-bold">5</span>
                                    <span className="text-orange-400 font-bold">240</span>
                                </p>

                            </button>
                        </div>
                        <div className="col-span-2">
                            <button className="bg-[#216BA5] font-bold rounded text-white text-left py-2 px-3 inline-block w-100">
                                <p className="font-bold  text-right text-xs">
                                    <span className="text-amber-100">{new Date().toLocaleDateString()}</span>
                                </p>
                                <p className="font-bold  flex justify-around text-2xl py-1">
                                    <span className="text-amber-100">3000 $</span>
                                </p>
                                <p className="font-bold text-sm flex justify-between">
                                    <span className="text-primary font-bold">5</span>
                                    <span className="text-orange-400 font-bold">240</span>
                                </p>

                            </button>
                        </div>
                        <div className="col-span-2">
                            <button className="bg-[#216BA5] font-bold rounded text-white text-left py-2 px-3 inline-block w-100">
                                <p className="font-bold  text-right text-xs">
                                    <span className="text-amber-100">{new Date().toLocaleDateString()}</span>
                                </p>
                                <p className="font-bold  flex justify-around text-2xl py-1">
                                    <span className="text-amber-100">3000 $</span>
                                </p>
                                <p className="font-bold text-sm flex justify-between">
                                    <span className="text-primary font-bold">5</span>
                                    <span className="text-orange-400 font-bold">240</span>
                                </p>

                            </button>
                        </div>
                        <div className="col-span-2">
                            <button className="bg-[#216BA5] font-bold rounded text-white text-left py-2 px-3 inline-block w-100">
                                <p className="font-bold  text-right text-xs">
                                    <span className="text-amber-100">{new Date().toLocaleDateString()}</span>
                                </p>
                                <p className="font-bold  flex justify-around text-2xl py-1">
                                    <span className="text-amber-100">3000 $</span>
                                </p>
                                <p className="font-bold text-sm flex justify-between">
                                    <span className="text-primary font-bold">5</span>
                                    <span className="text-orange-400 font-bold">240</span>
                                </p>

                            </button>
                        </div>
                        <div className="col-span-2">
                            <button className="bg-[#216BA5] font-bold rounded text-white text-left py-2 px-3 inline-block w-100">
                                <p className="font-bold  text-right text-xs">
                                    <span className="text-amber-100">{new Date().toLocaleDateString()}</span>
                                </p>
                                <p className="font-bold  flex justify-around text-2xl py-1">
                                    <span className="text-amber-100">3000 $</span>
                                </p>
                                <p className="font-bold text-sm flex justify-between">
                                    <span className="text-primary font-bold">5</span>
                                    <span className="text-orange-400 font-bold">240</span>
                                </p>

                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
