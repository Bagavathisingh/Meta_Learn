import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import vid from '../assets/videoIcon.png';
import doc from '../assets/document.png';
import pap from '../assets/exam.png';
export default function SubjectData({sentId}) {
  const { id } = useParams();
  const [subject, setSubject] = useState(null);
  const [loading, setLoading] = useState(true);
  const api = import.meta.env.VITE_URL;

  useEffect(() => {
    fetch(`${api}/get_subjects/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSubject(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <div className="h-100 p-10">
        <div className="h-full flex justify-center items-center gap-10">
          <div className="h-20 animate-spin w-20 rounded-full border-t-4 border-[#FF3700]"></div>
          <div className="text-2xl font-bold">
            <h1>Loading ........ </h1>
          </div>
        </div>
      </div>
    );

  if (!subject)
    return (
      <div className=" h-100 p-10">
        <div className=" h-full p-1 flex flex-col">
          <div className=" h-40 flex flex-col justify-center items-center">
            <h1 className="text-6xl text-[#FF3700]">404</h1>
            <span className="text-xl text-red-500">Error</span>
          </div>
          <div className=" h-40 p-4 ml-10 text-[#FF3700]">
            <span>
              The Corresponding Subject is Not Founded May be It was an server
              Issue refesh the Page
            </span>
          </div>
        </div>
      </div>
    );

  return (
    <>
    <div onLoad={()=>{sentId(id)}} className=" h-185 md:h-160 p-2 flex md:justify-center flex-col gap-5 ">
      <div className="flex overflow-y-auto flex-col gap-5 p-5 hide-scroll">

        <div className=" h-45 w-95 ml-[1rem] md:ml-0 md:w-150 flex gap-5 rounded-md lines border-white drop-shadow p-2 m-1">
          <div className="w-30 h-30 mt-5 md:mt-0 md:w-40 md:h-40">
            <img src={doc} alt="loading..." className="h-full invert w-full bg-transparent" />
          </div>
          <div className="w-70 md:w-100 rounded-lg p-1">
            <div className="h-10 flex justify-center">
              <h1 className="text-3xl font-serif underline text-[#FF3700]">Materials</h1>
            </div>
            <div className="text-gray-200 mt-1 h-22 ">
              <p className="h-full text-[14px]">
                Here is your <span className="font-bold"> {subject.subjectTopic} </span>material Pdf.
                Its may be help for Your studies
              </p>
            </div>
          </div>
          <a href={`${api}${subject.MaterialPdf}`}  target="_blank" rel="noopener noreferrer" className="hover:bg-orange-700 absolute bg-red-600 h-8 flex justify-center px-7 py-[1px] md:ml-115 ml-54 rounded-lg text-white mt-32 md:mt-31">
          <button className="font-serif">
            click here
          </button>
          </a>
        </div>






       <div className=" h-45 w-95  md:ml-0 md:w-150 flex gap-5 lines  border-white rounded-md drop-shadow p-2 m-1">
          <div className="w-25 h-25 mt-8 md:mt-0 md:w-40 md:h-40">
            <img src={pap} alt="loading..." className="h-full invert w-full bg-transparent" />
          </div>
          <div className="w-70 md:w-100 rounded-lg p-1">
            <div className="h-10 flex justify-center">
              <h1 className="text-3xl font-serif underline text-[#FF3700]">Documents</h1>
            </div>
            <div className="  mt-1 h-22 ">
              <p className="h-full text-gray-200 text-[14px]">
                Here is your <span className="font-bold"> {subject.subjectTopic} </span>Internal Papers.
                Its may be help for Your studies
              </p>
            </div>
          </div>
          <a href={`${api}${subject.QnPdf}`}  target="_blank" rel="noopener noreferrer" className="hover:bg-orange-700 absolute bg-red-600 h-8 flex justify-center px-7 py-[1px] md:ml-115 ml-54  rounded-lg text-white mt-32 md:mt-31">
          <button className="font-serif">
            click here
          </button>
          </a>
        </div>




               <div className="lines  h-45 w-95 ml-[1rem] md:ml-0 md:w-150 flex gap-5 rounded-md drop-shadow p-2 m-1">
          <div className="w-30 h-30 mt-5 md:mt-0 md:w-40 md:h-40">
            <img src={vid} alt="loading..." className="h-full invert w-full bg-transparent" />
          </div>
          <div className="w-70 md:w-100 rounded-lg p-1">
            <div className="h-10 flex justify-center">
              <h1 className="text-3xl font-serif underline text-[#FF3700]">Related Videos</h1>
            </div>
            <div className="  mt-1 h-22 ">
              <p className="h-full text-gray-200 text-[14px]">
                Here is your <span className="font-bold"> {subject.subjectTopic} </span>Related Video Links.
                Its may be help for Your studies
              </p>
            </div>
          </div>
          <a href={`${api}${subject.VideoUrl}`}  target="_blank" rel="noopener noreferrer" className="hover:bg-orange-700 absolute bg-red-600 h-8 flex justify-center px-7 py-[1px] md:ml-115 ml-54  rounded-lg text-white mt-32 md:mt-31">
          <button className="font-serif">
            click here
          </button>
          </a>
        </div>

      </div>


        </div>
    </>
  )
}
