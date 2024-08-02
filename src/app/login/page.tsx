"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function Login() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false);
  const [buttonDisabled, setSendButtonDisabled] = useState(true);
  const [user, setUser] = useState({
    email: "",
  });
  const [userLogin,setuserLogin]=useState({
    email:'',
    password:''
  })

  const onLogin = async()=>{
    try {
      await axios.post('/api/users/login',userLogin)
      console.log('loggedin Successfully')
      router.push('/profile')
      
    } catch (error:any) {
      console.log('something went wroing'+error.message)
      
    }
  }

  const onSend = async () => {
    try {
      await axios.post("/api/users/forgotpassword", user);
      setIsOpen(false);
      console.log("email send successfully");
    } catch (error: any) {
      console.log("something goes wrong" + error.message);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 )  {
      setSendButtonDisabled(false);
    } else {
      setSendButtonDisabled(true);
    }
  }, [user]);
  useEffect(() => {
    if (userLogin.email.length > 0  && userLogin.password.length>0)  {
      setSendButtonDisabled(false);
    } else {
      setSendButtonDisabled(true);
    }
  }, [userLogin]);
  return (
    <>
      <div className="bg-white dark:bg-gray-900">
        <div className="flex justify-right h-screen">
          <div
            className="hidden bg-cover lg:block lg:w-2/3"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)",
            }}
          >
            <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
              <div>
                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                  Meraki UI
                </h2>

                <p className="max-w-xl mt-3 text-gray-300">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. In
                  autem ipsa, nulla laboriosam dolores, repellendus perferendis
                  libero suscipit nam temporibus molestiae
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
            <div className="flex-1">
              <div className="text-center">
                <div className="flex justify-center mx-auto">
                  <img
                    className="w-auto h-7 sm:h-8"
                    src="https://merakiui.com/images/logo.svg"
                    alt=""
                  />
                </div>

                <p className="mt-3 text-gray-500 dark:text-gray-300">
                  Sign in to access your account
                </p>
              </div>

              <div className="mt-8">
                <form>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                     value={userLogin.email}
                     onChange={e=>{setuserLogin({...userLogin,email:e.target.value})}}
                      placeholder="example@example.com"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>

                  <div className="mt-6">
                    <div className="flex justify-between mb-2">
                      <label
                        htmlFor="password"
                        className="text-sm text-gray-600 dark:text-gray-200"
                      >
                        Password
                      </label>
                      {/* <a href="#" className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline">Forgot password?</a> */}
                    </div>

                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={userLogin.password}
                     onChange={e=>{setuserLogin({...userLogin,password:e.target.value})}}
                      placeholder="Your Password"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                  {/* model start */}
                  <div className="relative flex justify-end">
                    <button onClick={() => setIsOpen(true)}>
                      forgot password
                    </button>

                    {isOpen && (
                      <div
                        className="fixed inset-0 z-10 overflow-y-auto"
                        aria-labelledby="modal-title"
                        role="dialog"
                        aria-modal="true"
                      >
                        <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                          <span
                            className="hidden sm:inline-block sm:h-screen sm:align-middle"
                            aria-hidden="true"
                          >
                            &#8203;
                          </span>
                          <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
                            <form className="mt-4">
                              <label
                                htmlFor="emails-list"
                                className="text-sm text-gray-700 dark:text-gray-200"
                              >
                                Email address
                              </label>

                              <label className="block mt-3" htmlFor="email">
                                <input
                                  type="email"
                                  name="email"
                                  id="email"
                                  value={user.email}
                                  onChange={(e) => {
                                    setUser({ ...user, email: e.target.value });
                                  }}
                                  placeholder="user@email.xyz"
                                  className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                                />
                              </label>

                              <div className="mt-4 sm:flex sm:items-center sm:-mx-2">
                                <button
                                  type="button"
                                  onClick={() => setIsOpen(false)}
                                  className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                                >
                                  Cancel
                                </button>

                                <button
                                  onClick={onSend}
                                  type="button"
                                  className="w-full px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                                  disabled={buttonDisabled}
                                >
                                  Send
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  {/*model end */}

                  <div className="mt-6">
                    <button type="button" onClick={onLogin} disabled={buttonDisabled} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                      Sign in
                    </button>
                  </div>
                </form>

                <p className="mt-6 text-sm text-center text-gray-400">
                  Don&#x27;t have an account yet?{" "}
                  <Link
                    href="/signup"
                    className="text-blue-500 focus:outline-none focus:underline hover:underline"
                  >
                    Sign up
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
