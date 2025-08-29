import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { Adminauth } from "../../AdminFireBaseConfig";
export default function AdminHomePage(){
    const navigate = useNavigate();
    const location = useLocation();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(Adminauth, (user) => {
      if (!user) {
        navigate("/adminlogin");
      }
    });


    return () => unsubscribe();
  }, [auth, navigate]);

      const goTo = (path) => {
    if (location.pathname !== path) {
      navigate(path);
    }
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
    return(
        <>

        
        <div className="p-10 sm:hidden h-175">
          <div className="h-full p-5 flex justify-center items-center rounded-lg">
            <div className=" border-red-600 rounded-lg border-5 w-full flex gap-5 p-1 flex-col h-100">
              <div className="flex justify-center items-center text-2xl  h-full">
                <div className="ml-8 text-red-600 uppercase leading-relaxed">
                     This Admin Page Not Accessible By<span className="text-black underline"> Android</span> And <span className="text-black underline"> Ios</span> devices
                </div>
              </div>
              <div className="flex justify-center items-center h-full">
                <div className="text-red-600 text-3xl uppercase">
                  <span className="ml-8">Internal</span><br /> Server Error  <br /><span className="ml-16">404</span>
                </div>
              </div>
              <div className="h-20 p-1">
                <button className="h-full border p-2 w-full text-xl hover:text-white hover:bg-red-600 bg-yellow-500 focus:bg-red-500 rounded-lg" onClick={()=>{alert("The Complaint is Raised . It Was Sent To The Website Admin thank You");navigate('/home') }}>Raise a Report </button>
              </div>
            </div>
          </div>
        </div>


        <div className="overflow-hidden hidden sm:block">
            <nav className="border-b-1 flex justify-center items-center h-25">
              <div className="flex justify-between w-full">
              <div className="w-100 select-none cursor-default flex justify-center items-center h-full ">
                <h1 className="inline text-4xl mr-20 p-3 font-semibold font-serif uppercase"><span className="text-red-600">ad</span>min <span className="text-red-600">bo</span>ard</h1>
              </div>
              <div className="flex justify-center mr-20 items-center ">
                <ul className="flex text-white font-bold select-none gap-10 font-serif ">
                  <li className={`text-lg px-5 cursor-pointer rounded-lg hover:bg-red-600 hover:text-white transition duration-500 ease-in-out ${ location.pathname === "/adminhome" ? "text-red-600":""}`}  onClick={()=>{goTo('/adminhome')}}>Users</li>
                  <li className={`text-lg px-5 cursor-pointer rounded-lg hover:bg-red-600 hover:text-white transition duration-500 ease-in-out ${ location.pathname ==="/adminhome/adminsub" ? "text-red-600":""}`} onClick={()=>{goTo('/adminhome/adminsub')}}>Subjects</li>
                  <li className={`text-lg px-5 cursor-pointer rounded-lg hover:bg-red-600 hover:text-white transition duration-500 ease-in-out ${ location.pathname === "/adminhome/admincourse" ? "text-red-600":""}`}  onClick={()=>{goTo('/adminhome/admincourse')}}>Courses</li>
                </ul>
              </div>
              </div>
            </nav>
            <main className="m-1 h-170 p-1 ">
              <Outlet/>
            </main>
        </div>
        </>
    );
}