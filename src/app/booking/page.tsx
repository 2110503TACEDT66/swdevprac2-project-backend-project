'use client'
import { TextField, Select, MenuItem, InputLabel, FormControl } from "@mui/material"
import dayjs,{ Dayjs } from "dayjs"
import { useState,useEffect } from "react"
import getRestaurant from "@/libs/getRestaurant"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/redux/store"
import { addBooking } from "@/redux/features/bookSlice"
import { useSearchParams } from "next/navigation";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import addReserve from "@/libs/addBooking"
import { useSession } from "next-auth/react"




export default function Bookings() { 
    const urlParams = useSearchParams();
    const idParam = urlParams.get('id');
    const rid = idParam !== null ? idParam.toString() : '';
    const restaurantName = urlParams.get('name');
    const { data: session, status } = useSession()

    const [restaurantResponse,setRestaurantResponse] = useState<RestaurantItem>({
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

      
      const [bookingDate, setBookingDate] = useState<Dayjs|null>()
      const [startTime, setStartTime] = useState<Dayjs|null>()
      const [endTime, setEndTime] = useState<Dayjs|null>()
      const [restaurant, setRestaurant] = useState<string>('Chula')
      const [name, setName] = useState<string>('')
      const [surname, setSurName] = useState<string>('')
      const [id, setId] = useState<string>('')
      const [inputTable, setInputTable] = useState<string>('')
      const [bookingId, setBookingId] = useState<string>('')


      useEffect(() => {
          const fetchData = async () => {
              const restaurName = await getRestaurant(rid);
              setRestaurantResponse(restaurName.data);
              
          }
          fetchData();
      },[startTime,endTime,bookingDate,restaurantName]);

    const dispatch = useDispatch<AppDispatch>()

    const makeAppointment = async (booking:BookingItem) => {
        try {
           
            if (name && surname && inputTable && restaurant && startTime && endTime && id) {
              
                dispatch(addBooking(booking));

                
                
                if (!session || !session.user) {
                    throw new Error('Session not available');
                }

                console.log('token', session?.user.token);
                const reserveResponse = await addReserve(
                    startTime?.format('YYYY-MM-DD HH:mm:ss'), 
                    endTime?.format('YYYY-MM-DD HH:mm:ss'), 
                    id,
                    rid, 
                    inputTable, 
                    session?.user.token
                )
                // setBookingId(reserveResponse.data._id);
                console.log('Reservation added successfully:', reserveResponse.data);
                if (reserveResponse && reserveResponse.status === 'success') {
                    setBookingId(reserveResponse.data._id);
                    console.log('Reservation added successfully:', reserveResponse.data);
                   
                } else {
                    throw new Error('Failed to add reservation');
                }
            } else {
                alert('Missing data for reservation');
                throw new Error('Missing data for reservation');
            }
        } catch (error) {
            console.error('Error making appointment:', error);
        }
    };
    
    const booking: BookingItem = {
        name: name,
        surname: surname,
        id: id,
        bookId: bookingId,
        table: inputTable,
        restaurant: restaurantName ?? '',
        startBookTime: startTime?.format('YYYY-MM-DD HH:mm:ss') ?? '',
        endBookTime: endTime?.format('YYYY-MM-DD HH:mm:ss') ?? ''
    };
    return (

        <main className="px-auto py-5 w-[100%]">

            <div className="text-xl font-medium bg-gray-200 w-[30%] h-8 p-1 rounded-lg mx-auto my-5 ">{restaurantName} Restaurant</div>
            {(startTime)?<div className="bg-[#FEFCFF] w-fit h-80 m-5 rounded-lg pt-2 items-center flex flex-col justify-center">
                <div className="bg-gray-200 w-[20%] h-8 p-1 rounded-lg">Click to choose the table</div>
                <div className="m-10 flex flex-row flex-wrap justify-around items-center ">
                {restaurantResponse.table.map((available: Table) => {
                    const InStartTime = dayjs(startTime, 'HH:mm');
                    const InEndTime = dayjs(endTime, 'HH:mm');
                    
                    const isTimeSlotAvailable = () => {
                        return available.timeSlots.some((time: { start: string, end: string }) => {
                            const start_Time = dayjs(time.start);
                            const end_Time = dayjs(time.end);
                            
                            console.log("Table num: ", available.tableNumber);
                            console.log("Start Time1:", InStartTime);
                            console.log("Start Time2:", start_Time);
                            console.log("compare Time2:", InEndTime.isAfter(start_Time));
                            return ((InStartTime.isAfter(start_Time) && InStartTime.isBefore(end_Time)) || (InEndTime.isAfter(start_Time) && InEndTime.isBefore(end_Time)));
                        });
                    };
                    
                    return (
                        isTimeSlotAvailable() ?
                        <div className={`p-4 m-2 rounded-lg w-40 bg-red-500`}>
                            <p className="text-white font-semibold">Table {available.tableNumber}</p>
                            <p className="text-white">{'Not Available' }</p>
                        </div>:<div className={`p-4 m-2 rounded-lg w-40 bg-green-500`} onClick={() => {setInputTable(available.tableNumber);}}>
                            <p className="text-white font-semibold">Table {available.tableNumber}</p>
                            <p className="text-white">{'Available'}</p>
                        </div>
                    );
                })}
                </div>
            </div>:''}
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
                    <p className="text-xl mt-5">Enter Your Start Time</p>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateTimePicker']}>
                        <DateTimePicker label=" Start Time" onChange={(value) => {setStartTime(value);setInputTable('')}}/>
                    </DemoContainer>
                    </LocalizationProvider>
                </div>

                <div>
                    <p className="text-xl mt-5">Enter Your End Time</p>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateTimePicker']}>
                        <DateTimePicker label="End Time" onChange={(value) => {setEndTime(value);setInputTable('')}}/>
                    </DemoContainer>
                    </LocalizationProvider>
                </div>
                <div className="text-md bg-gray-300 items-center rounded-lg">
                        <div className="m-1">Table: {inputTable}</div>
                        <div>
                            <p className="m-1">Start Time: {startTime?.format('HH:mm')}</p>
                        </div>
                        <div>
                            <p className="m-1">End Time: {endTime?.format('HH:mm')}</p>
                        </div>
                        
                </div>
                <div className="text-md flex flex-col p-1 ">
                    <button type='button' name="Book Vaccine"
                        onClick={() => {console.log(booking); makeAppointment(booking)}}
                        className="text-gray-900 bg-white border border-gray-300 text-lg font-semibold focus:outline-none 
                        hover:bg-gray-100 rounded-full px-5 py-2.5 me-2 mb-2 hover:scale-105"
                        >
                        Book Table
                    </button>
                </div>
            </form>

        </main>
    )
}
    
