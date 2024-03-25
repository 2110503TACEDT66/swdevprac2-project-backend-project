'use client'
import { TextField, Select, MenuItem, InputLabel, FormControl } from "@mui/material"
import DateReserve from "@/components/DateReserve"
import { Dayjs } from "dayjs"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/redux/store"
import { addBooking } from "@/redux/features/bookSlice"



export default function Bookings() { 
    const [bookingDate, setBookingDate] = useState<Dayjs|null>(null)
    const [restaurant, setRestaurant] = useState<string>('Chula')
    const [name, setName] = useState<string>('')
    const [surname, setSurName] = useState<string>('')
    const [id, setId] = useState<string>('')

    const dispatch = useDispatch<AppDispatch>()

    const makeAppointment = (booking:BookingItem) => {
        if(name && surname && id && restaurant && bookingDate) {
            dispatch(addBooking(booking));
        }
    };
    // if (bookingDate) {
    //     bookDate: bookingDate.format('YYYY-MM-DD') // Format date as string
    // }
    const booking: BookingItem = {
        name: name,
        surname: surname,
        id: id,
        restaurant: restaurant,
        bookDate: bookingDate?.format('YYYY-MM-DD') as string // Format date as string
    };
    return (

        <main className="px-auto py-5 ">
            
            
            <form className="w-[100%] flex flex-col items-center space-y-5 bg-[#FEFCFF] p-5 rounded-xl">
                <p className="text-2xl">Enter Your Information</p>

                <div className="flex text-black flex-col justify-center items-center w-[70%] gap-6">
                    <TextField id="name" name="Name" label="Name" variant="standard" className="w-[100%]"
                    value={name} onChange={(e)=> setName(e.target.value)} />
                    <TextField id="lastname" name="Lastname" label="Lastname" variant="standard" className="w-[100%]" 
                    value={surname} onChange={(e)=> setSurName(e.target.value)}/>
                    <TextField id="citizenID" name="Citizen ID" label="Citizen ID" variant="standard" className="w-[100%]" 
                    value={id} onChange={(e)=> setId(e.target.value)}/>
                </div>
                
                <div>
                    <p className="text-2xl my-2">Enter Your Booking Date</p>
                    <DateReserve onDateChange={(value:Dayjs) => {setBookingDate(value)}} 
                    onRestaurantChange={(value:string) => {setRestaurant(value)}}/>
                </div>

                <div>
                    <button type='button' name="Book Vaccine"
                        onClick={() => {console.log(booking); makeAppointment(booking)}}
                        className="text-gray-900 bg-white border border-gray-300 text-lg font-semibold focus:outline-none 
                        hover:bg-gray-100 rounded-full px-5 py-2.5 me-2 mb-2 hover:scale-105"
                        >
                        Book Vaccine
                    </button>
                </div>
            </form>

        </main>
    )
}
    
