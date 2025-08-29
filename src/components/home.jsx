import { useState, useEffect } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import Menu from "../assets/MenuBar.svg";
import CloseMenu from "../assets/CloseMenu.svg";

export default function Home() {
  const [menu, setmenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const MenuFunc = () => {
    setmenu(!menu);
  };
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/", { replace: true });
      }
    });
  }, []);

  const goTo = (path) => {
    if (location.pathname !== path) {
      navigate(path);
    }
    setmenu(false);
  };

      useEffect(() => {
        let historyIndex = parseInt(sessionStorage.getItem("navIndex") || "0");
    
        const handlePopState = () => {
          let newIndex = window.history.state?.idx || 0;
    
          if (newIndex > historyIndex) {

            alert("Forward navigation is disabled.");
            navigate(-1); 
          } else {

            historyIndex = newIndex;
            sessionStorage.setItem("navIndex", historyIndex.toString());
          }
        };
    
        const currentIndex = window.history.state?.idx || 0;
        sessionStorage.setItem("navIndex", currentIndex.toString());
    
        window.addEventListener("popstate", handlePopState);
        return () => window.removeEventListener("popstate", handlePopState);
      }, [navigate, location]);

  return (
    <div className="h-full w-full overflow-hidden">
      <nav className="Container flex justify-between items-center bg-transparent text-white p-5">
        <h1 className="text-3xl select-none text-black inter-Font font-bold ml-4 lg:4xl cursor-default"><span className="text-[#FF3700]">ME</span>TA <span className="text-[#FF3700]">LE</span>ARN</h1>

        <ul className="hidden select-none md:flex gap-10 mr-10">
          <li
            className={`cursor-pointer hover:bg-[#FF3700] hover:text-white font-bold homeLine p-2 rounded-lg hover:scale-105 transition duration-300 ease-in-out ${
              location.pathname === "/home" ? "text-[#FF3700]" : ""
            }`}
            onClick={() => goTo("/home")}
          >
            Home
          </li>
          <li
            className={`cursor-pointer hover:bg-[#FF3700] hover:text-white p-2 font-bold homeLine2 rounded-lg hover:scale-105 transition duration-300 ease-in-out ${
              location.pathname === "/home/subject" ? "text-[#FF3700]" : ""
            }`}
            onClick={() => goTo("/home/subject")}
          >
            Subject
          </li>
          <li
            className={`cursor-pointer hover:bg-[#FF3700] hover:text-white font-bold p-2 homeLine2  rounded-lg hover:scale-105 transition duration-300 ease-in-out ${
              location.pathname === "/home/course" ? "text-[#FF3700]" : ""
            }`}
            onClick={() => goTo("/home/course")}
          >
            Course
          </li>
          <li
            className={`cursor-pointer hover:bg-[#FF3700] hover:text-white font-bold p-2 homeLine  rounded-lg transition hover:scale-105 duration-300 ease-in-out ${
              location.pathname === "/home/about" ? "text-[#FF3700] " : ""
            }`}
            onClick={() => goTo("/home/about")}
          >
            About
          </li>
          <li className="cursor-pointer bg-[#FF3700] w-36 flex justify-center hover:bg-orange-800 p-2 rounded-r-lg border-l-4 border-l-white text-white transition duration-300 ease-in-out"
          onClick={()=>goTo("/adminlogin")}>
            Admin Login
          </li>
        </ul>

        <button id={menu?'close':'open'} className="md:hidden" onClick={MenuFunc}>
          <img src={menu ? CloseMenu : Menu} />
        </button>
      </nav>
      {menu && (
        <div className="bg-blue-200 w-full md:hidden absolute z-10">
          <ul className="flex flex-col">
            <li
              className="rounded-r-lg cursor-pointer hover:bg-[#FF3700] hover:text-white p-2 m-2"
              onClick={() => goTo("/home")}
            >
              Home
            </li>
            <li
              className="rounded-r-lg cursor-pointer hover:bg-[#FF3700] hover:text-white p-2 m-2"
              onClick={() => goTo("/home/subject")}
            >
              Subject
            </li>
            <li
              className="rounded-r-lg cursor-pointer hover:bg-[#FF3700] hover:text-white p-2 m-2"
              onClick={() => goTo("/home/course")}
            >
              Course
            </li>
            <li
              className="rounded-r-lg cursor-pointer hover:bg-[#FF3700] hover:text-white p-2 m-2"
              onClick={() => goTo("/home/about")}
            >
              About
            </li>
            <li className="cursor-pointer bg-orange-600 p-2 m-2 rounded-r-lg border-l-4 border-l-green-400 text-white hover:bg-orange-800"
            onClick={()=>goTo("/adminlogin")}>
              Admin Login
            </li>
          </ul>
        </div>
      )}


      {!menu && (
        <main id="main">
          <Outlet/>
        </main>
      )}

      
    </div>
  );
}
