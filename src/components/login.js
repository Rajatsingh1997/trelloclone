import { useRouter } from "next/router";
import React, { useState } from "react";
import axios from "axios";

const UserLogin = () => {
  const router = useRouter();
  const [toggle, setToggle] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    userName: "",
    password: "",
    confirmPass: "",
  });

  const handleGoDashboard = async () => {
    const data = {
      username: user.userName,
      password: user.password,
    };
    setError("");
    try {
      const resp = await axios.post("http://localhost:8080/users/login", data);
      if (resp?.data) {
        if (resp?.data?._id) {
          router.push("/dashbord");
        } else {
          setError(resp?.data?.message);
        }
      }else{
        setError("Something went wrong");
      }
    }catch (error) {
      setError("Something went wrong")
    }
  };

  const handleSignUp = async () => {
    if (user.password === user.confirmPass) {
      setError("");
      const data = {
        username: user.userName,
        password: user.password,
        confirmpassword: user.confirmPass,
      };
      try{
      const res = await axios.post("http://localhost:8080/users/signup", data);
      if (res?.data) {
        if (res?.data?._id) {
          setUser({ ...user, userName: "", password: "" });
          setToggle(false);
        } else {
          setError(res?.data?.message);
        }
      }
    } catch(error){
      setError("something went wrong")
    }}
    
    
    else {
      setError("Password not matched");
    }
  };
  return (
    <div>
      <section className="h-full gradient-form bg-gray-200 md:h-screen">
        <div className="container py-12 px-6 h-full">
          <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
            <div className="xl:w-10/12">
              <div className="block bg-white shadow-lg rounded-lg">
                <div className="lg:flex lg:flex-wrap g-0">
                  <div className="lg:w-6/12 px-4 md:px-0 mx-auto">
                    <div className="md:p-12 md:mx-6">
                      <div className="text-center">
                        <h4 className="text-xl font-semibold mt-1 mb-12 pb-1">
                          This is Trello clone
                        </h4>
                      </div>
                      <form>
                        <p className="mb-4">Please login to your account</p>
                        <div className="mb-4">
                          <input
                            type="text"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            id="username"
                            placeholder="Username"
                            value={user.userName}
                            onChange={(e) =>
                              setUser({ ...user, userName: e.target.value })
                            }
                          />
                        </div>
                        <div className="mb-4">
                          <input
                            type="password"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            id="password"
                            placeholder="Password"
                            value={user.password}
                            onChange={(e) =>
                              setUser({ ...user, password: e.target.value })
                            }
                          />
                        </div>
                        {toggle && (
                          <div className="mb-4">
                            <input
                              type="password"
                              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                              id="confirmpassword"
                              placeholder="confirm Password"
                              onChange={(e) =>
                                setUser({
                                  ...user,
                                  confirmPass: e.target.value,
                                })
                              }
                            />
                          </div>
                        )}

                        <div className="text-center pt-1 mb-12 pb-1">
                          {!toggle ? (
                            <button
                              className="inline-block px-6 py-2.5 border-2 hover:border-indigo-400  border-black text-black hover:text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                              type="button"
                              data-mdb-ripple="true"
                              data-mdb-ripple-color="light"
                              onClick={handleGoDashboard}
                              disabled={!user.userName && !user.password}
                            >
                              Log in
                            </button>
                          ) : (
                            <button
                              className="inline-block px-6 py-2.5 border-2 hover:border-indigo-400  border-black text-black hover:text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                              type="button"
                              data-mdb-ripple="true"
                              data-mdb-ripple-color="light"
                              onClick={handleSignUp}
                              disabled={!user.userName && !user.password && !user.confirmPass}
                            >
                              Sign Up
                            </button>
                          )}
                          <a className="text-red-700" href="#!">
                            {error ? error : null}
                          </a>
                        </div>
                        <div className="flex items-center justify-between pb-6">
                          {!toggle ? (
                            <>
                              <p className="mb-0 mr-2">
                                Don't have an account?
                              </p>
                              <button
                                type="button"
                                className="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                                data-mdb-ripple="true"
                                data-mdb-ripple-color="light"
                                onClick={(e) => setToggle(!toggle)}
                              >
                                Sign up
                              </button>
                            </>
                          ) : (
                            <>
                              <p className="mb-0 mr-2">Have account ?</p>

                              <button
                                type="button"
                                className="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                                data-mdb-ripple="true"
                                data-mdb-ripple-color="light"
                                onClick={(e) => setToggle(!toggle)}
                              >
                                Sign In
                              </button>
                            </>
                          )}
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserLogin;
