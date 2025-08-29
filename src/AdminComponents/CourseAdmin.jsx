import pic from "../assets/javascript.png";
import { useState, useRef, useEffect } from "react";

export default function CourseAdmin() {
  const [subjectTopic, setSubjectTopic] = useState("");
  const [subjectDescription, setSubjectDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [subImage, setSubImage] = useState(null);
  const [item, setItem] = useState([]);
  const subImageRef = useRef(null);
  const materialPdfRef = useRef(null);
  const [loading,setLoading] = useState(true);

  const api = import.meta.env.VITE_URL;

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("videoUrl", videoUrl);
    formData.append("subjectTitle", subjectTopic);
    formData.append("content", subjectDescription);
    if (subImage) formData.append("image", subImage);

    try {
      const response = await fetch(`${api}/subjects`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      alert("Subject uploaded successfully!");

      setSubjectTopic("");
      setSubjectDescription("");
      setVideoUrl("");
      setSubImage(null);
      setMaterialPdf(null);
      subImageRef.current.value = null;
      materialPdfRef.current.value = null;
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed.");
    }
  };

  const listItems = () => {
    fetch(api + "/subjectsGet")
      .then((res) => res.json())
      .then((res) => {setItem(res);
           setLoading(false)})
      .catch((err) => {
        console.error("fetch Error :", err);
        setItem([]);
         setLoading(false);
      });
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
    <div className="h-full p-2">
      <div className="flex gap-5 p-1 h-full">
        <div className="p-2 w-150 h-full">
          <form onSubmit={handleUpload} className="h-full p-15 flex flex-col">
            <div className="h-140 flex flex-col justify-between p-5">
              <input
                type="file"
                accept="image/*"
                className="w-full p-4 bg-[#FFC477] text-orange-600 rounded-lg drop-shadow"
                ref={subImageRef}
                onChange={(e) => setSubImage(e.target.files[0])}
                required
              />
              <input
                type="text"
                className="w-full p-4 bg-[#FFC477] text-orange-600 text-xl rounded-lg placeholder:text-[15px] placeholder:text-red-500 drop-shadow focus:placeholder-transparent"
                value={subjectTopic}
                placeholder="Enter Course Topic"
                onChange={(e) => setSubjectTopic(e.target.value)}
                required
              />
              <input
                type="text"
                className="w-full p-4 bg-[#FFC477] text-orange-600 text-xl rounded-lg placeholder:text-[15px] placeholder:text-red-500 drop-shadow focus:placeholder-transparent"
                value={videoUrl}
                placeholder="Enter Course VideoUrl"
                onChange={(e) => setVideoUrl(e.target.value)}
                required
              />
              <input
                type="text"
                className="w-full p-4 bg-[#FFC477] text-orange-600 text-xl rounded-lg placeholder:text-[15px] placeholder:text-red-500 drop-shadow focus:placeholder-transparent"
                value={subjectDescription}
                placeholder="Enter the Content About This Course"
                onChange={(e) => setSubjectDescription(e.target.value)}
                required
              />
            </div>

            <div className="h-20 flex p-5">
              <button
                type="submit"
                className="border h-10 uppercase w-full rounded-lg text-xl bg-red-500 text-white"
              >
                Upload
              </button>
            </div>
          </form>
        </div>

        {/* Right Side Preview */}
        <div className="p-1 w-250">
          <div className="drop-shadow p-1 h-full rounded-lg">
            <div className="text-5xl font-serif uppercase flex justify-center p-1">
              <h1>Courses</h1>
            </div>
            <div className="h-145 p-10 rounded-lg grid gap-20 hide-scroll overflow-y-auto">
              {item.map((list, index) => (
                <div
                  key={index}
                  className="h-100 rounded-lg m-5 p-3 bg-[#FFC477] drop-shadow flex flex-col justify-between"
                >
                  <div className="w-full rounded-lg ">
                    <div className="flex p-1 gap-5 h-40">
                      <div className="drop-shadow rounded-lg overflow-hidden object-cover w-full">
                        <img
                          src={`${api}${list.imageUrl}`}
                          alt={list.subjectTitle}
                          className="h-full w-full"
                        />
                      </div>
                      <div className="border rounded-lg flex justify-center items-center w-full">
                        <div
                          className={`border rounded-full p-1 ${
                            list.videoUrl !=null ? "bg-green-500" : "bg-red-600"
                          } h-4 w-4`}
                        >
                          <div className="h-full rounded-full bg-white w-full"></div>
                        </div>
                        <div className="ml-4 font-serif font-semibold">
                          {list.videoUrl != null ? <h1>Available</h1> : <h1>UnAvailable</h1>}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="h-full p-2 flex gap-5 rounded-lg">
                    <div className="border-r-2 flex flex-col gap-5 p-3 w-70">
                      <div className="border rounded-lg flex justify-center items-center text-md uppercase h-full">
                        <h1>{list.subjectTitle}</h1>
                      </div>
                      <div className="border flex justify-center items-center  text-sm rounded-lg h-full">
                        <h1 className="text-[10px] p-2">{list.content}</h1>
                      </div>
                    </div>
                    <div className="border w-full rounded-lg p-3 leading-relaxed">
                      {list.videoContent}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
