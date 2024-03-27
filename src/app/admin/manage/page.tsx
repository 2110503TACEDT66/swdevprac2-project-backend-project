'use client'
import { useSession } from 'next-auth/react';
import { authOptions } from "../../api/auth/[...nextauth]/route"
import getUserProfile from "@/libs/getUserProfile"



export default function Manage() {

  const {data:session}= useSession()


    return (

      <main >
         <div className="text-xl font-semibold text-black">
            <span className="text-xl font-semibold">Hi! {session?.user.name}</span>
         </div>
        {
          (session?.user?.role === 'admin')?
         <div className="bg-white text-black text-xl ">
            <p className="text-2xl text-black">Create Restaurant</p>
            <form className="flex flex-col" >
                <label htmlFor="name">Restaurant Name</label>
                <input type="text" name="name" placeholder="Restaurant name"
                className="rounded-lg "/>

                <label htmlFor="picture">Picture</label>
                <input type="text" name='picture' placeholder="Picture URL"/>

                <label htmlFor="address">Address</label>
                <input type="text" name='address' placeholder="District"/>

                <label htmlFor="district">District</label>
                <input type="text" name='district' placeholder="Province"/>

                <label htmlFor="province">Province</label>
                <input type="text" name='province' placeholder="Province"/>

                <label htmlFor="postalcode">Postal Code</label>
                <input type="text" name='postalcode' placeholder="Postal Code"/>

                <label htmlFor="tel">Tel. </label>
                <input type="text" name='tel' placeholder="Tel. "/>

                <label htmlFor="region">Region</label>
                <input type="text" name='region' placeholder="Region"/>
               

                <label htmlFor="table">Table</label>
                <input type="text" name='table' placeholder="Table"/>
            </form>
         </div> 
         :
         <div>
          <div className="bg-white text-black text-xl ">eiei</div>
         </div>
        }
         
      </main>
    )
  }