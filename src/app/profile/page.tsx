import { cookies } from 'next/headers'
import * as Icon from 'react-bootstrap-icons'
export default function Profile(){
  const token = cookies().get("token");
  console.log("profile token", token)
    return (
<div className="grid grid-rows-2 grid-flow-col gap-8 bg-gray-500 w-screen ">
  <div className=" flex flex-col justify-center items-center bg-red-300  rounded-b-md">< Icon.Wallet2 className='text-4xl md:text-8xl'/> 
  <h2 className='text-xl font-bold text-gray-500 md:text-3xl'> 0 Rs</h2>
 </div>
  
  <div className="flex flex-col justify-center items-center bg-yellow-300 text-center content-center rounded-r-md">< Icon.Basket2 className='text-4xl md:text-8xl'/><h2 className='text-xl font-bold text-gray-500 md:text-3xl'> 0 </h2></div>
  <div className="flex flex-col justify-center items-center bg-blue-300 text-center content-center rounded-l-md"><Icon.HourglassBottom className='text-4xl md:text-8xl'/><h2 className='text-xl font-bold text-gray-500 md:text-3xl'>5 years old</h2></div>
  <div className="flex flex-col justify-center items-center bg-orange-300 text-center content-center rounded-s-md"><Icon.StarFill className='text-4xl md:text-8xl'/><h2 className='text-xl font-bold text-gray-500 md:text-3xl'>3.5 / 5</h2></div>

</div>

    )
}