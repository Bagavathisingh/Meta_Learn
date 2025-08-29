import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
export default function Subject() {
  const location = useLocation();
  const [id,setid] = useState();
  return (
    <>
      <div className={`scrollSubject overflow-x-hidden hide-scroll overflow-y-auto h-200 md:h-175`}>
        <div className="h-full height flex flex-col p-1">
          <div className="border-b-2">
            <div className=" w-70 m-2 h-20 p-5">
              <h1 className="text-5xl font-serif"> Subjects </h1>
            </div>
          </div>
          <main className="md:p-1 flex flex-col justify-center items-center">
            <Outlet/>
          </main>
        </div>
      </div>
    </>
  );
}
