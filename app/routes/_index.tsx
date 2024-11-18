import type { MetaFunction } from "@remix-run/node";
import Canvas from "~/components/Canvas";
import Navbar from "~/components/Navbar";
import PropertyDefiner from "~/components/PropertyDefiner";
import { NextFormProvider } from "~/context/useNextFormContext";
import { NextFormPropsProvider } from "~/context/useNextFormPropsDefiner";

export const meta: MetaFunction = () => {
  return [
    { title: "NextForm - Create Forms Seamlessly" },
    { name: "description", content: "A tool for creating customizable forms with ease." },
  ];
};

export default function Index() {
  return (


    
    <NextFormProvider>
      <NextFormPropsProvider>
        <Navbar/>
        
        <div className="flex w-[80%] m-auto  border-2 h-[80vh] overflow-y-auto border-slate-200 ">
          {/* Sidebar for Property Definer */}
          <aside className="w-1/3 bg-white border-r border-gray-200">
            <div className="h-full p-6">
              <PropertyDefiner />
            </div>
          </aside>

          {/* Main Canvas Section */}
          <main className="flex-1 p-6">
            <div className="bg-white  p-6 h-full overflow-auto">
              <Canvas />
            </div>
          </main>
        </div>
      </NextFormPropsProvider>
    </NextFormProvider>
  );
}
