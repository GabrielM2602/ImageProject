import Image from "next/image";
import Componente from "./Componente/page";
import { Template } from "./Componente/template";

export default function Home() {
  return (
    <div className="dark:bg-black">
      <main className="dark:bg-black sm:items-start">
        <Template children={<>oi</>}>
 
        </Template>
      
      </main>
    </div>
  );
}
