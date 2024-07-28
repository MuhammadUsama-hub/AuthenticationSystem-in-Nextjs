'use client'
import Link from "next/link";
import React, { useEffect ,useState} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
export default function Signup(){
    const router = useRouter();
    const [buttonDisabled,setButtonDisabled]=useState(true)
    const [user,setUser]=useState({
        userName:"",
        email:"",
        password:"",

    })
    const onSignup = async()=>{
        try {
            const response = await axios.post('/api/users/signup',user)
            console.log('signup success',response.status)
            router.push('/login')
        } catch (error:any) {
            console.log('SignupFalied',error.message)
            toast.error(error.message)
            
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.userName.length >= 6) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return <>
    <div className="bg-gray-900"> 
    <div className="flex justify-center h-screen">
        <div className="hidden bg-cover lg:block lg:w-2/3" style={{ backgroundImage: 'url(/signupcover.jpg)' }}>
            <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
                <div>
                    <h2 className="text-2xl font-bold text-white sm:text-3xl">Get Registered YourSelf!</h2>
                    <p className="max-w-xl mt-3 text-gray-300 font-bold text-2xl">
                    Become a member and enjoy an amazing shopping experience.
                    </p>
                </div>
            </div>
        </div>

        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
            <div className="flex-1">
                <div className="text-left">
                    <div className="flex justify-center mx-auto">
                        <img className="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt="" />
                    </div>
                    <p className="mt-3 text-gray-300">Sign up to get full account access</p> {/* Changed text-gray-500 to text-gray-300 */}
                </div>

                <div className="mt-8">
                    <form>
                    <div>
                            <label htmlFor="userName" className="block mb-2 text-sm text-gray-200">User Name</label> {/* Changed text-gray-600 to text-gray-200 */}
                            <input type="text" name="userName" id="userName" placeholder="Muhammad khan" value={user.userName} onChange={e=>{setUser({...user,userName:e.target.value})}} className="block w-full px-4 py-2 mt-2 text-gray-300 placeholder-gray-600 bg-gray-900 border border-gray-700 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" /> {/* Updated all classes to dark mode */}
                        </div>



                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm text-gray-200">Email Address</label> {/* Changed text-gray-600 to text-gray-200 */}
                            <input type="email" name="email" id="email" placeholder="example@example.com" value={user.email} onChange={e=>{setUser({...user,email:e.target.value})}} className="block w-full px-4 py-2 mt-2 text-gray-300 placeholder-gray-600 bg-gray-900 border border-gray-700 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" /> {/* Updated all classes to dark mode */}
                        </div>

                        <div className="mt-6">
                            <div className="flex justify-between mb-2">
                                <label htmlFor="password" className="text-sm text-gray-200">Password</label> {/* Changed text-gray-600 to text-gray-200 */}
                                {/* <a href="#" className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline">Forgot password?</a> */}
                            </div>

                            <input type="password" name="password" id="password" value={user.password} onChange={e=>{setUser({...user,password:e.target.value})}} placeholder="Your Password" className="block w-full px-4 py-2 mt-2 text-gray-300 placeholder-gray-600 bg-gray-900 border border-gray-700 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" /> {/* Updated all classes to dark mode */}
                        </div>

                        <div className="mt-6">
                            <button onClick={onSignup} disabled={buttonDisabled} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                Sign up
                            </button>
                        </div>
                    </form>

                    <p className="mt-6 text-sm text-center text-gray-400">Already have an account? <Link href="/login" className="text-blue-500 focus:outline-none focus:underline hover:underline">Sign in</Link>.</p>
                </div>
            </div>
        </div>
    </div>
</div>

    </>
}