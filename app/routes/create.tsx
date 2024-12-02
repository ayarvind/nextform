import type { MetaFunction } from "@remix-run/node";
import Canvas from "~/components/Canvas";
import Navbar from "~/components/Navbar";
import PropertyDefiner from "~/components/PropertyDefiner";
import { NextFormProvider } from "~/context/useNextFormContext";
import { NextFormPropsProvider } from "~/context/useNextFormPropsDefiner";


export default function Index() {
  return (
    <NextFormProvider>
      <NextFormPropsProvider>
        
        <div className="flex w-[80%] m-auto  border-2 h-[80vh] overflow-y-auto border-slate-200 ">
          {/* Sidebar for Property Definer */}
          <aside className="w-1/3 bg-white border-r border-gray-200">
            <div className="h-full p-6" id='props-definer'>
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
