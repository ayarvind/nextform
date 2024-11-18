
import { createContext, useState } from "react";
import NewElement from "./NewElement";
import { RiArrowDownSLine, RiArrowUpSLine, RiCloseCircleLine, RiCrossLine, RiDeleteBackLine, RiDeleteBin2Line, RiDeleteBin3Line } from "@remixicon/react";
import { NextFormElement } from "~/types/NextFormElement";
import { useNextFormContext } from "~/context/useNextFormContext";
import CreateElement from "./CreateElement";
import { useNextFormPropsDefiner } from "~/context/useNextFormPropsDefiner";
function Canvas(): React.ReactElement {
    const { nextFormElements, setNextFormElements } = useNextFormContext();
    const { currentElement, setCurrentElement } = useNextFormPropsDefiner();
    const [swapIdx1, setSwapIdx1] = useState<number | undefined>(undefined);
    const [swapIdx2, setSwapIdx2] = useState<number | undefined>(undefined);
    const removeElement = (index: number) => {
        // close the property definer if the element is removed

        if (currentElement && currentElement.index == index) {
            setCurrentElement(undefined);
        }
        const newElements = [...nextFormElements];
        newElements.splice(index, 1);
        setNextFormElements(newElements);
    }

    const swapElements = (index1: number, index2: number) => {
        const newElements = [...nextFormElements];
        const temp = newElements[index1 - 1];
        newElements[index1 - 1] = newElements[index2 - 1];
        newElements[index2 - 1] = temp;
        setNextFormElements(newElements);

    }


    return (
        <>

            <div className="flex flex-col justify-start gap-2 p-4 ">

                {/* header section */}
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Form Name
                    </h1>
                    <div className="">
                        {/* Swap section */}
                        <input
                            type='number'
                            min={1}
                            onChange={(e) => { setSwapIdx1(parseInt(e.target.value)) }}
                            max={nextFormElements.length}
                            className="w-10  bg-slate-50  text-center border-gray-300 px-2 py-1"
                        />



                        <input
                            type='number'
                            min={1}
                            onChange={(e) => { setSwapIdx2(parseInt(e.target.value)) }}
                            max={nextFormElements.length}
                            className="w-10 border-l-2 text-center border-gray-300 px-2 py-1 "
                        />

                        <button onClick={() => {
                            swapElements(swapIdx1 as number, swapIdx2 as number)
                        }} className="p-2 text-gray-500  rounded-full hover:bg-gray-200 transition duration-300 ease-in-out">
                            Swap
                        </button>
                    </div>

                </div>

                <form>
                    {
                        nextFormElements.map((element, index) => (
                            <div onClick={() => {
                                setCurrentElement({
                                    element,
                                    index: index
                                });
                            }} key={index} className="flex justify-between items-start p-3 bg-white gap-3" style={{
                                border: `1px solid #e5e7eb`,
                            }}>
                                <div className="badges  bg-black text-white text-center w-9 h-9 flex justify-center items-center ">
                                    {index + 1}
                                </div>

                                <div className="w-[90%]" >
                                    <CreateElement nextFormElement={element} />
                                </div>
                                <div>
                                    <button onClick={() => {
                                        removeElement(index)
                                    }} className="p-2  text-grey rounded-md">
                                        <RiCloseCircleLine size={24} />
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </form>
            </div>

            <NewElement />



        </>
    )
}

export default Canvas