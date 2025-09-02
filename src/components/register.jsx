import { useState } from "react";
import VisibleOn from '../assets/VisibleOn.svg';
import VisibleOff from '../assets/VisibleOff.svg';
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword} from "firebase/auth";
export default function Register(){
    const [username ,setusername] = useState();
    const [password,setpassword] = useState();
    const[passShow,setpassShow] =useState(true);
    const Navigate = useNavigate();
    const have_Acc = ()=>{
        Navigate('/',{replace:true});
    }
    const passShows = (e)=>{
        e.preventDefault()
        setpassShow(!passShow);
    }
    const SignUpHandle =async (e)=>{
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth,username,password);
            alert(`you're Account Was Created Successfully`);
            Navigate('/',{replace:true});
            
        } catch (error) {
            alert(error)
        }
    }
    return(
        <>
        <div id="loginBack" className="bg-blue-100 h-240 w-full shirnk-1 flex flex-col justify-center items-center">
            <div className="drop-shadow h-130 w-90 md:-mt-10 p-10 md:p-0 md:h-100 md:w-150 mb-20 flex justify-center items-center rounded-lg">
                <h1 className="absolute mb-85 mr-40 text-6xl -m-10 md:mt-10 ml-10 md:-ml-30 font-serif cursor-default">SignUp</h1>
                <form onSubmit={SignUpHandle} className=" h-30 flex mb-10 flex-col justify-between items-center gap-10 md:p-1">
                    <div className="h-10 md:w-100 w-70 border-b-2">
                    <input required onChange={(e)=>setusername(e.target.value)} className="p-2 h-10 w-full placeholder:text-black outline-none focus:placeholder-transparent transition duration-300 ease-in-out" type="mail" name="username" id="username" placeholder="Email"/>
                    </div>
                    <div  className="h-10 md:w-100 w-70 border-b-2">
                        <div className=" absolute ml-63 md:ml-89 mt-[7px]">
                            <button onClick={passShows} className="invert">
                                {passShow?<img src={VisibleOn} />:<img src={VisibleOff}/>}
                            </button>
                        </div>
                    <input required onChange={(e)=>setpassword(e.target.value)} className="p-2 h-10 w-full placeholder:text-black outline-none focus:placeholder-transparent transition duration-300 ease-in-out" type={passShow?"password":"text"} name="password" id="password" placeholder="Password"/>
                    </div>
                    <div className="h-full w-full flex justify-center">
                        <button type="submit" className="cursor-pointer py-1 rounded-lg  w-full h-full text-xl bg-orange-600 text-white hover:bg-orange-500 flex justify-center items-center font-serif">
                            Sign-Up
                        </button>
                    </div>
                    <div onClick={have_Acc} className="h-full w-full text-md select-none flex justify-center cursor-pointer hover:text-white">
                        <a>I Already have an Account ?/Login</a>
                    </div>
                </form>
            </div>
        </div>
        </>
    );
}