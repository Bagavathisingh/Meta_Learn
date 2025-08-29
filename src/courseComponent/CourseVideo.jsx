import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Video() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const api = import.meta.env.VITE_URL;
  useEffect(() => {
    setLoading(true);
    fetch(`${api}/subjects/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCourse(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching course", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="h-full mt-30 ">
        <div className="h-full flex justify-center gap-3 items-center">
          <div className="border border-black h-15 w-15 border-b-5 border-t-3 border-r-5 animate-spin border-l-10 rounded-full"></div>
          <h1 className="text-2xl font-serif">Loading ......</h1>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="p-6 ml-15 mt-20 flex flex-col gap-5 mr-10 ">
        <div className="text-7xl text-red-600 flex justify-center">
          <h1>404</h1>
        </div>
       <div className="text-red-500 flex justify-center font-bold">
         Video Not Found Or Failed To Load.
       </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden overflow-y-hidden md:h-170 h-200 flex w-full md:w-373">
      <div className=" w-full p-1">
        <div className="rounded-lg md:drop-shadow md:h-150 p-10 flex flex-col items-center justify-center">
          <div className="flex flex-col border-10 border-gray-600 bg-gray-600 rounded-lg md:block h-65 md:h-full w-103 md:w-250">
            <iframe
              className="md:h-full h-65 md:w-full rounded-lg"
              src={course.videoUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
