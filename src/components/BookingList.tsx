'use client'
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { removeBooking } from "@/redux/features/bookSlice";
import { useAppSelector } from "@/redux/store";
import  deleteBooking  from "@/libs/deleteBooking";
import  getAllReserves  from "@/libs/getAllReserves";
import { useEffect,useState } from "react";
import Link from "next/link";
import { set } from "mongoose";


export default function BookingList() {
    // var reserves
    const bookingItems = useAppSelector((state) => state.booking.bookItems);
    const [tmp,settmp] = useState(0)
    const [start_Time,setStart_Time] = useState<Date>();
    const [end_Time,setEnd_Time] = useState<Date>();
    const [reservesResponse, setReservesResponse] = useState([]);
    const { data: session } = useSession();
    if (!session || !session.user) {
        throw new Error('Session not available');
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
        
                const reserves = await getAllReserves(session.user.token);
                setReservesResponse(reserves.data);
                console.log(reserves.data)
              } catch (e) { 
                return console.error("Cannot Fetch Reserves")
              }
        };
        fetchData();
    }, [tmp]);
   
    

    // Get the session data
   

    // Function to handle booking removal
    const removeBookingHandler = (id: string) => {
        
        
        // Call function to delete booking from the database
        deleteBooking(session?.user.token, id)
            .then(() => {
                console.log("Booking deleted successfully.");
                settmp(tmp + 1);
                window.location.reload();
            })
            .catch((error) => {
                console.error("Error deleting booking:", error);
            });
    };

    return (
        <main className="flex flex-col items-center">
            {reservesResponse.length === 0 ? (
                <div className="text-2xl text-black font-bold text-center bg-white max-w-max m-5 p-6 rounded-lg shadow-lg">
                    No Reservations Found
                </div>
            ) : (
                reservesResponse.map((item:BookingItem2) => (
                    <div
                        key={item._id}
                        className="text-xl text-center text-black font-bold bg-white rounded-2xl shadow-lg m-3 w-[50%] flex flex-col gap-2 py-3 items-center justify-center"
                    >
                        
                    
                        <div>Restaurant: {item.restaurant.name}</div>
                        <div className="">Table: {item.table}</div>
                        <div>Start At: {new Date(item.start).toLocaleString()}</div>
                        <div>End At: {new Date(item.end).toLocaleString()} </div>
                        
                        <button
                            onClick={() => {removeBookingHandler(item._id);settmp(tmp + 1)}}
                            className="w-fit  bg-[#e5fdff] text-xl text-black border border-[#CCECEE] font-semibold p-2 rounded-xl transition delay-75 hover:bg-[#CCECEE] hover:border-collapse hover:scale-[103%] m-3"
                        >
                            Remove Booking
                        </button>

                        <Link href={`/booking/edit?id=${item._id}&rid=${item.restaurant.id}&name=${item.restaurant.name}&table=${item.table}`}>
                            <button
                                className="bg-[#e5fdff] text-xl text-black border border-[#CCECEE] font-semibold p-2 rounded-xl transition delay-75 hover:bg-[#CCECEE] hover:border-collapse hover:scale-[103%] m-2"
                                >
                                Edit Booking
                            </button>
                        </Link>
                    </div>
                ))
            )}
        </main>
    );
}
