'use client'
import { useSession } from "next-auth/react";
import  deleteBooking  from "@/libs/deleteBooking";
import  getAllReserves  from "@/libs/getAllReserves";
import { useEffect,useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";
import { revalidateTag } from "next/cache";
import getUserProfile from "@/libs/getUserProfile";



export default function BookingList() {
    const router = useRouter()
    // var reserves
    // const bookingItems = useAppSelector((state) => state.booking.bookItems);
    const [start_Time,setStart_Time] = useState<Date>();
    const [end_Time,setEnd_Time] = useState<Date>();
    const [reservesResponse, setReservesResponse] = useState([]);
    const { data: session } = useSession();
    const [userArray, setUserArray] = useState([''])
    const [isLoading, setIsLoading] = useState(true)
    if (!session || !session.user) {
        router.replace('/')
        return null
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const reserves = await getAllReserves(session.user.token);
                setReservesResponse(reserves.data);
                console.log(reserves.data, "eiei");
            } catch (error) {
                console.error("Cannot Fetch Reserves:", error);
                return []; // Return an empty array as a fallback value
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [session]);

    // Function to handle booking removal
    const removeBookingHandler = (id: string) => {
        // Call function to delete booking from the database
        deleteBooking(session?.user.token, id)
            .then(() => {
                console.log("Booking deleted successfully.");
                window.location.reload();
            })
            .catch((error) => {
                console.error("Error deleting booking:", error);
            });
    };
    if(isLoading) {
        return <LinearProgress/>
    }

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
                        className="text-xl text-center text-black font-bold bg-white 
                        rounded-2xl shadow-lg m-3 w-[50%] 
                        flex flex-col gap-2 py-6 items-center justify-center"
                    >
                        <div>Restaurant: {item.restaurant.name}</div>
                        <div className="">Name: {item.userName}</div> 
                        <div className="">Table: {item.table}</div>
                        <div>Start At: {new Date(item.start).toLocaleString()}</div>
                        <div>End At: {new Date(item.end).toLocaleString()} </div>
                        <div>
                            <button
                                onClick={() => {removeBookingHandler(item._id);}}
                                className="w-fit  bg-[#e5fdff] text-xl text-black border border-[#CCECEE] font-semibold p-2 rounded-xl transition delay-75 hover:bg-[#CCECEE] hover:border-collapse hover:scale-105 m-3"
                            >
                                Remove Reservation
                            </button>

                            <Link href={`/booking/edit?id=${item._id}&rid=${item.restaurant.id}&name=${item.restaurant.name}&table=${item.table}`}>
                                <button
                                    className="bg-[#e5fdff] text-xl text-black border border-[#CCECEE] font-semibold p-2 rounded-xl transition delay-75 hover:bg-[#CCECEE] hover:border-collapse hover:scale-105 m-2"
                                    >
                                    Edit Reservation
                                </button>
                            </Link>
                        </div>
                    </div>
                ))
            )}
        </main>
    );
}
