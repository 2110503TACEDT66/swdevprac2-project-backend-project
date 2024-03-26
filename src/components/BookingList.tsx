'use client'
import { store } from "@/redux/store";
import { useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/redux/store"
import { removeBooking } from "@/redux/features/bookSlice"


export default function BookingList() {
    const bookingItems = useAppSelector((state)=>state.booking.bookItems)
    const dispatch = useDispatch<AppDispatch>()
    const removeBookingHandler = (item:string) => {
        dispatch(removeBooking(item))
    }
    return (
        <main className="flex flex-col items-center">
            {
                bookingItems.length === 0 ? 
                <div className="text-2xl text-black font-bold text-center bg-white max-w-max m-5 p-6 rounded-lg shadow-lg">
                    No Vaccine Booking
                </div> :
                bookingItems.map((item) => (
                    <div key={item.id}
                    className="text-2xl text-center text-black font-bold bg-white rounded-2xl shadow-lg m-3 w-[50%] flex flex-col gap-2 py-3">
                        <div>
                        Name: {item.name}
                        </div>
                        <div>
                        Surname: {item.surname}
                        </div>
                        <div>
                        Citizen ID: {item.id}
                        </div>
                        <div>
                        Restaurant: {item.restaurant}
                        </div>
                        <div>
                        Start At: {item.startBookTime}
                        </div>
                        <div>
                        End At: {item.endBookTime}
                        </div>
                        <button onClick={() => {removeBookingHandler(item.id)}}
                        className="bg-[#e5fdff] text-xl text-black border border-[#CCECEE]
                        font-semibold p-2 rounded-xl transition delay-75 hover:bg-[#CCECEE] 
                        hover:border-collapse  hover:scale-[103%]' m-3">
                                Remove Booking
                        </button>
                    </div>
                ))
            }
        </main>
    )
}