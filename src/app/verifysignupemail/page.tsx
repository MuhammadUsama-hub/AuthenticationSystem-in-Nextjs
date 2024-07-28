'use client'
import axios from "axios";
import Link from "next/link";
// import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function Verifysignup(){
  // const router = useRouter()
const [token,setToken]=useState('')
const [buttonDisabled,setButtonDisabled]=useState(true)
const [verified,setVerified]=useState(false)
const [error,setError] = useState(false)

const onVerify = async()=>{
  try {
    await axios.post('/api/users/verifysignupemail',{token})
    console.log('successfully verify')
    setVerified(true)
  } catch (error:any) {
    setError(true)
    console.log('some this wrong'+ error.message)
  }

}

useEffect(()=>{
  const urlToken = window.location.search.split('=')[1]
  setToken(urlToken || "")
},[])

useEffect(()=>{
  if(token.length>0){
    setButtonDisabled(false)
  }
  else{
    setButtonDisabled(true)
  }
},[token])
    return <>
    <section className="flex text-gray-600 body-font min-h-screen items-center bg-no-repeat bg-cover" style={{backgroundImage:'url(/verifyuser.jpg)'}}>
  <div className="container px-5 py-24 mx-auto">
    <div className="lg:w-2/3 flex flex-col sm:flex-row sm:items-center items-start mx-auto">
      <h1 className="flex-grow sm:pr-16 text-4xl font-medium title-font text-indigo-50">Hit the verify button to complete the verification process.</h1>
      <button className="flex-shrink-0 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-10 sm:mt-0" onClick={onVerify} disabled={buttonDisabled}>Verify Now</button>
    </div>
    {verified && (<>
    <div>
      <h2 ><Link href={'/login'}>Login</Link></h2>
      </div></>)
      }
 {error && (<>
    <div>
    <h2>Error :Some This goes Wrong</h2></div></>)
      }

  </div>
</section>
    </>

}