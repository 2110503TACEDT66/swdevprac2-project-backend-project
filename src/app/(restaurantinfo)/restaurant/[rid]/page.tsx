'use client'
import getRestaurant from "@/libs/getRestaurant"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"


export default function RestaurantDetailPage({params} : {params: {rid:string}}) {
    const [restaurant, setRestaurant] = useState<RestaurantItem>({
        _id: '',
        name: '',
        address: '',
        district: '',
        province: '',
        postalcode: '',
        tel: '',
        openingHours: {
          dayOfWeek: '',
          opens: '' ,
          closes: '' 
        },
        table: [],
        picture: '',
        __v: 0,
        id: ''
      });

    const session = useSession()
    useEffect(() => {
        const fetchData = async () => {
            const restaurName = await getRestaurant(params.rid);
            setRestaurant(restaurName.data);
        }
        fetchData();
    },[]);
    // try {
    //     var restaurant= await getRestaurant(params.rid)
    // } catch (err) {
    //     console.log(err)
    // }
    return (
        <main className="text-center p-5">
            {/* <h1 className="text-lg font-medium"> {params.hid} </h1> */}
                <div className="flex my-5 justify-center bg-white py-8 rounded-2xl shadow-lg">
                    <img src={ (restaurant).picture} alt='Restaurant Image' 
                    width={0} height={0} sizes="100vw"
                    className="rounded-lg w-[30%]"/>
                    <div className="text-left flex justify-center bg-[#F5F5F5] rounded-lg p-5 items-center m-10 shadow-lg">
                        <div className="flex flex-col gap-2 items-center justify-center">
                            <div className="text-2xl text-black mx-5 text-center">
                                {((restaurant).name)}
                            </div>
                            <div className="text-xl text-black mx-5">
                                Address : {((restaurant).address)}
                            </div>
                            <div className="text-xl text-black mx-5">
                                Tel. : {((restaurant).tel)}
                            </div>
                            {session?.data?.user ? (
                            <Link href={`/booking?id=${params.rid}&name=${(restaurant).name}`}>
                                <button className="block rounded-md hover:bg-[#d84d5b] transition duration-100
                                hover:scale-105 bg-[#b9424e] px-5 py-3 text-white shadow-lg m-auto"
                                onClick={()=>toast.success('pls login first')}>
                                    Make Reservations
                                </button>
                            </Link>
                                ) : (
                            <button className="block rounded-md bg-gray-400 px-5 py-3 text-white shadow-lg m-auto"
                            onClick={()=>toast.error('pls login first')}>
                                Make Reservations
                            </button>
                            )}
                        </div>
                    </div>
                </div>
            
        </main>
    )
}