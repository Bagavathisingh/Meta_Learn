import { useState, useEffect } from "react";
import {useNavigate } from "react-router-dom";
export default function Subjectlist() {
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const api = import.meta.env.VITE_URL;
  const navigate = useNavigate();

const listItems = async () => {
  setLoading(true);
  try {
    const res = await fetch(api + "/get-subjects");
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    setItem(data);
  } catch (err) {
    console.error("fetch Error :", err);
    setItem([]);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    listItems();
  }, []);
    if (loading)
    return (
      <div className="h-100 p-10">
        <div className="h-full flex justify-center items-center gap-10">
          <div className="h-15 animate-spin w-15 rounded-full border-t-4 border-[#FF3700]"></div>
          <div className="text-2xl font-bold">
            <h1>Loading ........ </h1>
          </div>
        </div>
      </div>
    );
  return (
    <>
      <div className="p-2">
        <div className="py-6 px-3 md:p-10 h-full md:-ml-10 gap-10 md:gap-20 grid md:grid-cols-2">
          {item.map((list, index) => (
            <div
              key={index}
              className="w-90 md:w-180 h-140 md:h-80 p-3 gap-2 rounded-lg drop-shadow2 flex md:flex-row flex-col justify-between "
            >
              <div className="rounded-lg h-50 md:h-full w-full md:w-75">
                <img
                  src={`${api}${list.subImageUrl}`}
                  alt={list.subjectTitle}
                  style={{
                    height: "100%",
                    width: "100%",
                    borderRadius: "10px",
                  }}
                />
              </div>
              <div className="h-70 mb-6 md:h-60 rounded-lg w-85 md:w-94 p-2 gap-2 flex flex-col">
                <div className="border-b-2 h-15 cursor-default">
                  <h1 className="text-lg md:text-xl text-[#FF3700] font-bold font-serif px-4 py-2">
                    {list.subjectTopic}
                  </h1>
                </div>
                <div className="cursor-default font-serif text-white rounded-lg h-45 p-2">
                  <p className="leading-6">{list.subjectDescription}</p>
                </div>
                <div className="flex justify-end md:-mt-1 mt-4 ">
                  <button
                    className="text-xl font-serif bg-[#FF3700] rounded-lg w-30 p-1 hover:text-white border hover:border-white hover:bg-orange-700 cursor-pointer focus:scale-105"
                    onClick={() => navigate("Subjectdata/" + list._id)}
                  >
                    Access
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
