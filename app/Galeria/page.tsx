'use client'
import { Template } from "../Componente/template";
import { ImageCard } from "../Componente/image";



const Galeria = ({}) => {



  return (

        <main >
          <Template >
            <select className="grid grid-cols-3 gap-8">
              <ImageCard/>
            </select>
          </Template>

          
        </main>
    
  );
}

export default Galeria;