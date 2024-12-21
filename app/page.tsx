import Image from "next/image";
import {BsTwitterX} from "react-icons/bs"
export default function Home() {
  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen px-40">
        <div className=" border border-red-700 col-span-3 flex  flex-col justify-start ">
          <div className="text-3xl h-fit w-fit hover:bg-gray-800 rounded-full p-2 cursor-pointer transition-all">
            <BsTwitterX />
          </div>
          
          <a href="">Home</a>
          

          
        </div>
        <div className="col-span-6 border-r-[0.2px] border-l-[0.2px] border-gray-800"></div>
        <div className="col-span-3 "></div>
      </div>
    </div>
    
  );
}
