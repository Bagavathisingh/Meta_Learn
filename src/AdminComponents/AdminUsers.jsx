import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export default function UsersAdmin() {
  const [users, setUsers] = useState([]);
  const [Auth, setAuth] = useState([]);
  const [userLoad,setuserLoad] = useState(true);
  const api = import.meta.env.VITE_URL;

  const fetchUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "feedback"));
    const usersData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setUsers(usersData);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    fetch(`${api}/auth-users`)
      .then((res) => res.json())
      .then((data) => {
        setAuth(data);
        setuserLoad(false);
      })
      .catch((err) => console.error(err));
  }, []);

  if (userLoad)
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
      <div className="flex justify-between gap-10 p-1 h-full">
        {/* User list container */}
        <div className="drop-shadow p-1 w-160 rounded-[10px] h-full">
          <div className="text-5xl font-serif flex justify-center uppercase p-1">
            <h1>Users</h1>
          </div>
          <div className="flex flex-col h-150 hide-scroll overflow-y-auto rounded-[10px] p-2">
            {
              userLoad
            }
            {/* Dynamic User Cards */}
            {Array.isArray(Auth) &&Auth.map((user, index) => (
              <div
                key={index}
                className="drop-shadow h-30 p-3 rounded-[10px] bg-[#FFC477] mb-3"
              >
                <div className="flex gap-5 h-full">
                  <div className="border-r-1 w-full p-1">
                    <div className="border-b-1 h-10">
                      <h1 className="flex justify-center uppercase mt-1">
                        username
                      </h1>
                    </div>
                    <span className="p-1">{user.Email}</span>
                  </div>
                  <div className="border-r-1  p-1">
                    <div className="border-b-1 h-10">
                      <h1 className="flex justify-center uppercase mt-1">
                        password
                      </h1>
                    </div>
                    <span className="p-1">.............</span>
                  </div>
                  <div className="border-r-1 w-full p-1">
                    <div className="border-b-1 h-10">
                      <h1 className="flex justify-center uppercase mt-1">
                        created At
                      </h1>
                    </div>
                    <span className="p-1">
                      {user.CreatedAt ? user.CreatedAt : "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feedback Container */}
        <div className="p-1 w-250">
          <div className="drop-shadow p-1 h-full overflow-hidden rounded-lg">
            <div className="text-5xl font-serif flex justify-center p-1">
              <h1>FEEDBACK</h1>
            </div>
              <div className="h-149 p-10 rounded-lg overflow-y-auto hide-scroll ">
                {/* Dynamic Feedback Cards */}
                {Array.isArray(users) && users.map((user, index) => (
                  <div
                    key={index}
                    className="h-60 rounded-lg p-3 bg-[#FFC477] drop-shadow flex gap-10 justify-between mb-5"
                  >
                    <div className="h-full w-90 rounded-lg flex flex-col p-1 gap-1 justify-between">
                      <div className="drop-shadow rounded-lg flex flex-col justify-center items-center gap-10 h-full">
                        <h1 className="flex text-xl justify-center mt-1 border-b-1 border-gray-800 w-50">
                          NAME OF USER
                        </h1>
                        <span className="-mt-5">{user.Name}</span>
                      </div>
                      <div className="drop-shadow rounded-lg flex flex-col justify-center items-center gap-10 h-full">
                        <h1 className="flex text-xl justify-center mt-1 border-b-1 border-gray-800 w-50">
                          DEPT OF USER
                        </h1>
                        <span className="-mt-5">{user.Dept}</span>
                      </div>
                    </div>
                    <div className="drop-shadow p-5 w-full rounded-lg">
                      <p className="h-full font-semibold">{user.Feedback}</p>
                    </div>
                  </div>
                ))}
                {/* End of feedback card */}
              </div>
          </div>
        </div>
      </div>
    </>
  );
}
