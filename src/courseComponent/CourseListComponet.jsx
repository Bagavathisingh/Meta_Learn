import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function BackendCourseComponent() {
  // const [item, setItem] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const api = import.meta.env.VITE_URL;
  // const navigate = useNavigate();

  // const handleNavi = (id) => {
  //   setTimeout(() => {
  //     navigate("video/" + id);
  //   }, 1000);
  // };
  // const listItems = () => {
  //   setLoading(true);
  //   fetch(api + "/subjectsGet")
  //     .then((res) => res.json())
  //     .then((res) => {
  //       setItem(res);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.error("fetch Error :", err);
  //       setItem([]);
  //       setLoading(false);
  //     });
  // };
  // useEffect(() => {
  //   listItems();
  // }, []);
  // if (!item) {
  //   <div className="p-6 ml-15 mt-20 flex flex-col gap-5 mr-10 ">
  //     <div className="text-7xl text-red-600 flex justify-center">
  //       <h1>404</h1>
  //     </div>
  //     <div className="text-red-500 flex justify-center font-bold">
  //       Video Not Found Or Failed To Load.
  //     </div>
  //   </div>;
  // }
  return (
    // <div className="overflow-x-hidden overflow-y-auto h-full flex w-400 p-7">
    //   <div className="w-full">
    //     {loading ? (
    //       <div className="w-full h-full justify-start ml-18 mt-35 md:mt-10 md:-ml-10 flex md:justify-center md:items-center text-xl font-bold text-orange-500">
    //         <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-orange-500 border-solid"></div>
    //         <div className="ml-4 text-3xl font-bold text-orange-500">
    //           Loading ......
    //         </div>
    //       </div>
    //     ) : (
    //       <div className="h-full w-full grid md:grid-cols-2 md:w-240 lg:w-full lg:grid-cols-3  gap-10 -ml-2 md:-ml-0">
    //         {item.map((list) => (
    //           <div
    //             key={list._id}
    //             className=" h-110 w-90 md:w-100 rounded-lg p-1 drop-shadow bg-back cursor-pointer"
    //             onClick={() => {
    //               handleNavi(list._id);
    //             }}
    //           >
    //             <div className="h-10 w-30 ml-59 mt-98 md:ml-65 md:mt-97 flex justify-center z-2 absolute">
    //               <button
    //                 className="text-[#FF3700] outline-none cursor-pointer hover:text-orange-900 font-bold"
    //                 onClick={() => handleNavi(list._id)}
    //               >
    //                 Show More
    //               </button>
    //             </div>
    //             <div className="h-full p-1 flex flex-col justify-around md:justify-between">
    //               <div className="select-none w-full h-50 overflow-hidden">
    //                 <img
    //                   className="drop-shadow rounded-lg"
    //                   src={`${api}${list.imageUrl}`}
    //                   alt={list.subjectTitle}
    //                 />
    //               </div>
    //               <div className="h-46 p-1 flex flex-col gap-1">
    //                 <div className="h-10 p-1">
    //                   <h1 className="text-2xl font-bold">
    //                     {list.subjectTitle}
    //                   </h1>
    //                 </div>
    //                 <div className="h-35">
    //                   <p className="p-2">{list.content}</p>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         ))}
    //       </div>
    //     )}
    //   </div>
    // </div>
    <>
    <div className="h-155 flex justify-center items-center">
      <div className=" md:-mt-30 h-100 w-110 flex flex-col items-center justify-center">
        <div className=" h-20 md:text-3xl text-2xl font-serif flex justify-start items-center font-semibold">
          <h1 className="invert w-full">This Service Availabe Soon</h1>
        </div>
        <div className="">
          <img src={maintanace}  alt="Maintance" className="h-70"/>
        </div>
      </div>
    </div>
    </>
  );
}
import maintanace from '.././assets/animation/pngwing.com.png'