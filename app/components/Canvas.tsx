
import { createContext, useState } from "react";
import NewElement from "./NewElement";
import { RiCloseCircleLine, RiCrossLine, RiDeleteBackLine, RiDeleteBin2Line, RiDeleteBin3Line } from "@remixicon/react";
import { useNextFormContext } from "~/context/useNextFormContext";
import CreateElement from "./CreateElement";
import { useNextFormPropsDefiner } from "~/context/useNextFormPropsDefiner";
import { NextFormElement } from "~/types/NextFormElement";
function Canvas(): React.ReactElement {
    const { nextFormElements, setNextFormElements } = useNextFormContext();
    const { currentElement, setCurrentElement } = useNextFormPropsDefiner();
    const [swapIdx1, setSwapIdx1] = useState<number | undefined>(undefined);
    const [swapIdx2, setSwapIdx2] = useState<number | undefined>(undefined);
    const removeElement = (elementId: number) => {
       
        const newElements = nextFormElements.filter((element) => element.elementId !== elementId);
        setNextFormElements(newElements);
      
    };

    const swapElements = (elementId1: number, elementId2: number) => {

        const element1 = nextFormElements.find((element) => {
            return element.elementId == elementId1
        });
        const element2 = nextFormElements.find((element) => {
            return element.elementId == elementId2
        });;
        const index1 = nextFormElements.indexOf(element1!);
        const index2 = nextFormElements.indexOf(element2!);
        console.log(index1,index2)
        const newElements = [...nextFormElements];
        const temp = newElements[index1];
        newElements[index1] = newElements[index2];
        newElements[index2] = temp;
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
                            placeholder="1"
                            min={1}
                            onChange={(e) => { setSwapIdx1(parseInt(e.target.value)) }}
                            max={nextFormElements.length}
                            className="w-20  bg-slate-50  text-center border-gray-300 px-2 py-1"
                        />



                        <input
                            type='number'
                            placeholder="2"
                            min={1}
                            onChange={(e) => { setSwapIdx2(parseInt(e.target.value)) }}
                            max={nextFormElements.length}
                            className="w-20 border-l-2 text-center border-gray-300 px-2 py-1 "
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
                            <div key={element.elementId} onClick={() => {
                                setCurrentElement({
                                    element,
                                    index: index
                                });
                            }} className="flex justify-between items-start p-3 bg-white gap-3" style={{
                                border: `1px solid #e5e7eb`,
                            }}>
                                <div className="badges  bg-black text-white text-center w-9 h-9 flex justify-center items-center ">
                                    {
                                        element.elementId ? element.elementId : index + 1
                                    }
                                </div>

                                <div className="w-[90%]" >
                                    <CreateElement setNextFormElements={setNextFormElements} nextFormElement={element} index={
                                        index
                                    } />


                                </div>
                                <div>
                                    <button onClick={() => {
                                        removeElement(element.elementId)
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