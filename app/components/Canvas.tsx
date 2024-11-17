
import { createContext, useState } from "react";
import NewElement from "./NewElement";
import { RiCloseCircleLine, RiCrossLine, RiDeleteBackLine, RiDeleteBin2Line, RiDeleteBin3Line } from "@remixicon/react";
import { NextFormElement } from "~/types/NextFormElement";
import { useNextFormContext } from "~/context/useNextFormContext";
import CreateElement from "./CreateElement";
import { useNextFormPropsDefiner } from "~/context/useNextFormPropsDefiner";
function Canvas(): React.ReactElement {
    const { nextFormElements, setNextFormElements } = useNextFormContext();
    const {currentElement,setCurrentElement } = useNextFormPropsDefiner();
    const removeElement = (index: number) => {
        // close the property definer if the element is removed
      
        if (currentElement && currentElement.index == index) {
            setCurrentElement(undefined);
        }
        const newElements = [...nextFormElements];
        newElements.splice(index, 1);
        setNextFormElements(newElements);
    }
    return (
        <>

            <div className="flex flex-col justify-start gap-2 p-4 ">
                {
                    nextFormElements.map((element, index) => (
                        <div onClick={() => {
                            setCurrentElement({
                                element,
                                index: index
                            });
                        }} key={index} className="flex justify-between items-center p-3 bg-white gap-3">
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
            </div>

            <NewElement />



        </>
    )
}

export default Canvas