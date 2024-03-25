import getRestaurant from "@/libs/getRestaurant"
import Image from "next/image"
import Link from "next/link"

export default async function RestaurantDetailPage({params} : {params: {rid:string}}) {
    
    try {
        var restaurant= await getRestaurant(params.rid)
    } catch (err) {
        console.log(err)
    }
    return (
        <main className="text-center p-5">
            {/* <h1 className="text-lg font-medium"> {params.hid} </h1> */}
            
                <div className="flex my-5 justify-center bg-white py-8 rounded-2xl shadow-inner">
                    <Image src={ (restaurant).data.picture} alt='Restaurant Image' 
                    width={0} height={0} sizes="100vw"
                    className="rounded-lg w-[30%]"/>
                    <div className="text-left flex justify-center items-center">
                        <div className="flex flex-col gap-2">
                            <div className="text-2xl text-black mx-5">
                                {((restaurant).data.name)}
                            </div>
                            <div className="text-2xl text-black mx-5">
                                {((restaurant).data.address)}
                            </div>
                            <div className="text-2xl text-black mx-5">
                                {((restaurant).data.tel)}
                            </div>
                        </div>
                    </div>
                    <Link href={`/booking?id=${params.rid}&name=${(restaurant).data.name}`}>
                        <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm">Make Reservations</button>
                    </Link>
                </div>
            
        </main>
    )
}