import React from "react";
import { Datapicker } from "./Datepicker";

export const ReportIncomings = () => {
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
              <p className="font-bold text-base text-primary ">
                <select className="py-1 px-2 rounded text-base outline-none bg-slate-200 font-bold">
                  <option> Yetkazib beruvchilar</option>
                  <option> Yetkazib beruvchilar</option>
                  <option> Yetkazib beruvchilar</option>
                </select>
              </p>
              <p className="font-bold text-base text-teal-700 ">
                Mahsulotlar: <span>{1231}</span>
              </p>
              <p className="font-bold text-base text-teal-700 ">
                Summasi: <span>{99999999}$</span>
              </p>
            </div>
          </div>
          <div className="grid grid-cols-12 py-2 gap-3">
            <div className="xsm:col-span-12 sm:col-span-4 md:col-span-3 lg:col-span-2">
              <button className="bg-[#216BA5] font-bold rounded text-white text-left py-2 px-3 inline-block w-100">
                <p className="font-bold  text-right text-xs">
                  <span className="text-amber-100">
                    {new Date().toLocaleDateString()}
                  </span>
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
            <div className="xsm:col-span-12 sm:col-span-4 md:col-span-3 lg:col-span-2">
              <button className="bg-[#216BA5] font-bold rounded text-white text-left py-2 px-3 inline-block w-100">
                <p className="font-bold  text-right text-xs">
                  <span className="text-amber-100">
                    {new Date().toLocaleDateString()}
                  </span>
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
            <div className="xsm:col-span-12 sm:col-span-4 md:col-span-3 lg:col-span-2">
              <button className="bg-[#216BA5] font-bold rounded text-white text-left py-2 px-3 inline-block w-100">
                <p className="font-bold  text-right text-xs">
                  <span className="text-amber-100">
                    {new Date().toLocaleDateString()}
                  </span>
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
            <div className="xsm:col-span-12 sm:col-span-4 md:col-span-3 lg:col-span-2">
              <button className="bg-[#216BA5] font-bold rounded text-white text-left py-2 px-3 inline-block w-100">
                <p className="font-bold  text-right text-xs">
                  <span className="text-amber-100">
                    {new Date().toLocaleDateString()}
                  </span>
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
            <div className="xsm:col-span-12 sm:col-span-4 md:col-span-3 lg:col-span-2">
              <button className="bg-[#216BA5] font-bold rounded text-white text-left py-2 px-3 inline-block w-100">
                <p className="font-bold  text-right text-xs">
                  <span className="text-amber-100">
                    {new Date().toLocaleDateString()}
                  </span>
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
            <div className="xsm:col-span-12 sm:col-span-4 md:col-span-3 lg:col-span-2">
              <button className="bg-[#216BA5] font-bold rounded text-white text-left py-2 px-3 inline-block w-100">
                <p className="font-bold  text-right text-xs">
                  <span className="text-amber-100">
                    {new Date().toLocaleDateString()}
                  </span>
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

            <div className="xsm:col-span-12 sm:col-span-4 md:col-span-3 lg:col-span-2">
              <button className="bg-[#216BA5] font-bold rounded text-white text-left py-2 px-3 inline-block w-100">
                <p className="font-bold  text-right text-xs">
                  <span className="text-amber-100">
                    {new Date().toLocaleDateString()}
                  </span>
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
            <div className="xsm:col-span-12 sm:col-span-4 md:col-span-3 lg:col-span-2">
              <button className="bg-[#216BA5] font-bold rounded text-white text-left py-2 px-3 inline-block w-100">
                <p className="font-bold  text-right text-xs">
                  <span className="text-amber-100">
                    {new Date().toLocaleDateString()}
                  </span>
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
            <div className="xsm:col-span-12 sm:col-span-4 md:col-span-3 lg:col-span-2">
              <button className="bg-[#216BA5] font-bold rounded text-white text-left py-2 px-3 inline-block w-100">
                <p className="font-bold  text-right text-xs">
                  <span className="text-amber-100">
                    {new Date().toLocaleDateString()}
                  </span>
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
            <div className="xsm:col-span-12 sm:col-span-4 md:col-span-3 lg:col-span-2">
              <button className="bg-[#216BA5] font-bold rounded text-white text-left py-2 px-3 inline-block w-100">
                <p className="font-bold  text-right text-xs">
                  <span className="text-amber-100">
                    {new Date().toLocaleDateString()}
                  </span>
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
            <div className="xsm:col-span-12 sm:col-span-4 md:col-span-3 lg:col-span-2">
              <button className="bg-[#216BA5] font-bold rounded text-white text-left py-2 px-3 inline-block w-100">
                <p className="font-bold  text-right text-xs">
                  <span className="text-amber-100">
                    {new Date().toLocaleDateString()}
                  </span>
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
            <div className="xsm:col-span-12 sm:col-span-4 md:col-span-3 lg:col-span-2">
              <button className="bg-[#216BA5] font-bold rounded text-white text-left py-2 px-3 inline-block w-100">
                <p className="font-bold  text-right text-xs">
                  <span className="text-amber-100">
                    {new Date().toLocaleDateString()}
                  </span>
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

            <div className="xsm:col-span-12 sm:col-span-4 md:col-span-3 lg:col-span-2">
              <button className="bg-[#216BA5] font-bold rounded text-white text-left py-2 px-3 inline-block w-100">
                <p className="font-bold  text-right text-xs">
                  <span className="text-amber-100">
                    {new Date().toLocaleDateString()}
                  </span>
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
            <div className="xsm:col-span-12 sm:col-span-4 md:col-span-3 lg:col-span-2">
              <button className="bg-[#216BA5] font-bold rounded text-white text-left py-2 px-3 inline-block w-100">
                <p className="font-bold  text-right text-xs">
                  <span className="text-amber-100">
                    {new Date().toLocaleDateString()}
                  </span>
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
            <div className="xsm:col-span-12 sm:col-span-4 md:col-span-3 lg:col-span-2">
              <button className="bg-[#216BA5] font-bold rounded text-white text-left py-2 px-3 inline-block w-100">
                <p className="font-bold  text-right text-xs">
                  <span className="text-amber-100">
                    {new Date().toLocaleDateString()}
                  </span>
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
            <div className="xsm:col-span-12 sm:col-span-4 md:col-span-3 lg:col-span-2">
              <button className="bg-[#216BA5] font-bold rounded text-white text-left py-2 px-3 inline-block w-100">
                <p className="font-bold  text-right text-xs">
                  <span className="text-amber-100">
                    {new Date().toLocaleDateString()}
                  </span>
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
            <div className="xsm:col-span-12 sm:col-span-4 md:col-span-3 lg:col-span-2">
              <button className="bg-[#216BA5] font-bold rounded text-white text-left py-2 px-3 inline-block w-100">
                <p className="font-bold  text-right text-xs">
                  <span className="text-amber-100">
                    {new Date().toLocaleDateString()}
                  </span>
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
            <div className="xsm:col-span-12 sm:col-span-4 md:col-span-3 lg:col-span-2">
              <button className="bg-[#216BA5] font-bold rounded text-white text-left py-2 px-3 inline-block w-100">
                <p className="font-bold  text-right text-xs">
                  <span className="text-amber-100">
                    {new Date().toLocaleDateString()}
                  </span>
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
