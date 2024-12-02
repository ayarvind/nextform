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
    <>
    <h1>Home</h1>
    </>

  );
}
