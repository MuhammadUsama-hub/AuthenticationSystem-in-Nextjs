"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";
export default function(){
    const [user,setUser]= useState({
        password:'',
        confirmPassword:''
    })
    const [isReset,setReset]=useState(false)
    
    const [buttonDisabled,setResetButtonDisabled]=useState(true)

    const onReset = async()=>{
        try {

            await axios.post('/api/users/verifyresetpasswordmail',user)
            console.log('Password Reset successfully')
            setReset(true)
        } catch (error:any) {
            console.log('Some thing went wrong'+ error.message)
            
        }
    }
useEffect(()=>{
    if(user.password.length>0 && user.confirmPassword.length>0 && user.password === user.confirmPassword){
        setResetButtonDisabled(false)
    }
    else{
        setResetButtonDisabled(true)
    }
},[user])

    return <>
    <section className="bg-purple-100 dark:bg-gray-900">
    <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
        <form className="w-full max-w-md">
            <div className="flex justify-center mx-auto">
                <img className="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt=""/>
            </div>

            <div className="relative flex items-center mt-4">
                <span className="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </span>

                <input type="password" value={user.password} onChange={e=>{setUser({...user,password:e.target.value})}} className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Password"/>
            </div>

            <div className="relative flex items-center mt-4">
                <span className="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </span>

                <input type="password" value={user.confirmPassword} onChange={e=>{setUser({...user,confirmPassword:e.target.value})}} className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Confirm Password"/>
            </div>

            <div className="mt-6">
                <button onClick ={onReset} disabled={buttonDisabled} className="w-full px-6 py-3 text-md font-medium tracking-wide text-white  capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                    Reset
                </button>

                {isReset && (
                    <>
                    <p className="text-2xl text-gray-900"><Link href={'/login'}></Link></p>
                    </>

                )}
            </div>
        </form>
    </div>
</section>
    </>
}