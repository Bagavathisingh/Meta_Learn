import Photo from "../assets/batman.jpg";
import { useState } from "react";
import { db } from "../../firebaseConfig";
import { collection, Timestamp, addDoc } from "firebase/firestore";
import git from '.././assets/animation/pngwing.com (2).png'
import linkedIn from '.././assets/animation/pngwing.com (3).png'
import insta from '.././assets/animation/pngwing.com (1).png'
export default function About() {
  const [feedback, setfeedback] = useState("");
  const [name, setname] = useState("");
  const [dept, setdept] = useState("");

  const handlefeedback = async (e) => {
    e.preventDefault();
    if (name.trim() !== "" && dept.trim() !== "" && feedback.trim() !== "") {
      try {
        await addDoc(collection(db, "feedback"), {
          Name: name,
          Dept: dept,
          Feedback: feedback,
          CreatedAt: Timestamp.now(),
        });
        alert("Thank You For Your Feedback!");
        setfeedback("");
        setname("");
        setdept("");
      } catch (error) {
        alert(error);
      }
    } else {
      if (name.trim() === "") {
        alert("Enter the Name Field!");
      } else if (dept.trim() === "") {
        alert("Enter the Dept Field!");
      } else if (feedback.trim() === "") {
        alert("Enter the feedback section");
      } else {
        alert("Enter valid Feedback!");
      }
    }
  };

  return (
    <>
      <div className="h-full overflow-x-hidden hide-scroll overflow-y-auto">
        <div className="h-200 md:h-175">
          <div className="flex flex-col md:flex-row items-center justify-center gap-10 px-4 py-10 md:py-20 bg-transparent rounded-xl  mx-auto max-w-6xl">
  {/* Image Section */}
  <div className="flex-shrink-0">
    <div className="w-48 h-48 md:w-60 md:h-60 rounded-full overflow-hidden border-4 border-orange-600 shadow-md hover:scale-105 transition-all duration-500 ease-in-out">
      <img
        src={Photo}
        alt="Bat-Man"
        className="w-full h-full object-cover"
      />
    </div>
  </div>

  {/* Text Content Section */}
  <div className="flex flex-col gap-4 text-left font-serif text-white">
    <h1 className="text-4xl md:text-5xl text-red-600 font-bold">BagavathiSingh</h1>

    <p className="text-base md:text-lg leading-relaxed">
      Welcome to <strong>Meta Learn</strong> — a platform designed to make learning easy, accessible, and organized. Built with the vision to help students and developers access essential resources like programming PDFs, video tutorials, and subject-wise notes.
    </p>

    <div className="border-t border-gray-400 w-full opacity-40 my-2"></div>

    <h2 className="text-xl font-semibold text-black">Why It Was Developed</h2>
    <p className="text-base md:text-lg leading-relaxed">
      This site was developed by <strong className="text-red-600">BagavathiSingh</strong>, a passionate full-stack developer and problem solver. Whether you're a beginner looking to start your journey or someone polishing their skills, this hub has something for you.
    </p>

    <div className="border-t border-gray-400 w-full opacity-40 my-2"></div>

    <h2 className="text-xl font-semibold text-black">Technologies & Frameworks Used</h2>
    <p className="text-base md:text-lg leading-relaxed">
      Technologies used include <strong>React, Firebase, Node.js, MongoDB</strong> and more.
    </p>

    <p className="text-base mt-2">Our goal? To build a central hub where students can grow together. Join us on this mission!</p>
  </div>
</div>


          <div className="h-10 md:mt-30">
            <hr className="m-5 border-1 border-gray-500" />
          </div>

          <div className="h-full md:mt-30">
            <div className="h-30 cursor-default w-100 m-3">
              <h1 className="text-6xl p-5 font-serif text-white">Feedback</h1>
            </div>

            <div className="flex flex-col justify-center items-center md:-ml-100">
              <div id="feedback" className="h-102 md:h-105 w-90 md:w-90 md:ml-100 m-10 relative">
                <form className="h-full rounded-lg flex flex-col gap-10 p-3 drop-shadow bg-blue-200">
                  <div className="rounded-lg">
                    <input
                      required
                      type="text"
                      placeholder="Enter Your Name"
                      value={name}
                      className="input border focus:outline-none"
                      onChange={(e) => setname(e.target.value)}
                    />
                    <input
                      required
                      type="text"
                      placeholder="Enter Your Dept"
                      value={dept}
                      className="input border focus:outline-none"
                      onChange={(e) => setdept(e.target.value)}
                    />
                  </div>
                  <div className="drop-shadow rounded-lg h-32 w-84">
                    <textarea
                      required
                      placeholder="Enter Your Feedback About This Website Here"
                      value={feedback}
                      onChange={(e) => setfeedback(e.target.value)}
                      className="h-32 p-5 hide-scroll w-full bg-blue-300 rounded-lg outline-none focus:outline-orange-600 resize-none hover:scale-102 transition duration-400 ease-in-out focus:placeholder-transparent placeholder:transition duration-400 ease-in-out"
                    ></textarea>
                  </div>
                  <div className="h-30 md:h-full flex justify-center md:justify-end">
                    <button
                      type="submit"
                      onClick={handlefeedback}
                      className="border-1 border-black w-full h-10  font-serif text-lg md:w-full rounded-lg bg-blue-600 text-white  hover:scale-102 transition duration-400 ease-in-out hover:bg-blue-700"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
              <div className=" h-10 w-90 md:ml-90 flex justify-center gap-10 items-center">
                <a href="https://github.com/Bagavathisingh">
                <img src={git} alt="GitHub" className=" h-15 rounded-full hoves-link hover:scale-108 transition duration-400 ease-in-out" />
                </a>
                <a href='https://www.instagram.com/bugzx___/' className=" h-15 w-15 flex justify-center items-center rounded-full hoves-link hover:scale-108 transition duration-400 ease-in-out" >
                <img src={insta} alt="Insta" className="h-10 hover:scale-108 transition duration-400 ease-in-out" />
                </a>
                <a href='https://www.linkedin.com/in/bagavathi-singh' className=" h-15 w-15 flex justify-center items-center rounded-full hoves-link hover:scale-108 transition duration-400 ease-in-out" >
                <img src={linkedIn} alt="linkedIn" className="h-8 ml-1 hover:scale-108 transition duration-400 ease-in-out" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
