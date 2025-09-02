import { replace, useNavigate } from "react-router-dom";
import { Adminauth} from "../../AdminFireBaseConfig";
import { useState,useEffect } from "react";
import eyeOff from "../assets/VisibleOff.svg";
import eyeOn from "../assets/VisibleOn.svg";
import { onAuthStateChanged, signInWithEmailAndPassword,createUserWithEmailAndPassword} from "firebase/auth";
export default function AdminLoginPage() {
  const [eye, seteye] = useState(false);
  const AdminKey = import.meta.env.VITE_ADMIN_KEY;
  const [username,setusername] = useState();
  const [password,setpassword] = useState();
  const Navigate = useNavigate();
  
  const handleEye = (e) => {
    e.preventDefault();
    seteye(!eye);
  };
const Adminloginhandle = async (e) => {
    e.preventDefault();
    try {
        const login = await signInWithEmailAndPassword(Adminauth, username, password);
    } catch (error) {
        alert(error.message);
    }
};

useEffect(() => {
    const unsubscribe = onAuthStateChanged(Adminauth, (user) => {
        if (user) {
            const key = prompt("Enter the Admin Key:");
            if (key === AdminKey) {
                alert("Your key is matched");
                Navigate("/adminhome", { replace: true });
            } else {
              Navigate('/home');
                alert("Invalid key");
            }
        }
    });
    return () => unsubscribe();
    }, []);
  return (
    <>
      <div className=" md:h-196 h-220 overflow-y-hidden">
        <div className="h-full flex justify-center items-center ">
          <form className="border w-100 h-120 flex flex-col drop-shadow p-10 gap-10 justify-between rounded-lg">
            <div className="text-4xl cursor-default font-serif font-bold">
              <h1>AdminLogin</h1>
            </div>
            <div className="flex flex-col h-30 gap-10 justify-around">
              <button
                className="absolute cursor-pointer ml-69 mt-20 invert"
                onClick={handleEye}
              >
                <img src={eye ? eyeOff : eyeOn} />
              </button>
              <input
                type="text"
                name="username"
                placeholder="Name"
                className="border-b-2 h-10 p-2 placeholder:text-black focus:outline-none "
                onChange={(e)=>setusername(e.target.value)}
                value={username}
              />
              <input
                type={eye ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="border-b-2 h-10 placeholder:text-black p-2 focus:outline-none"
                onChange={(e)=>setpassword(e.target.value)}
                value={password}
              />
            </div>
            <div className="h-10 flex justify-center">
              <button onClick={Adminloginhandle} className="cursor-pointer text-white rounded-lg bg-[#FF3700] hover:border-2 hover:border-white hover:bg-orange-500 w-full">
                AdminLogin
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
