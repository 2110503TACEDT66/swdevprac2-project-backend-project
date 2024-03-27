'use client'
import { TextField, Select, MenuItem, InputLabel, FormControl } from "@mui/material"
import DateReserve from "@/components/DateReserve"
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
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { useSession } from "next-auth/react"
import updateReserve from "@/libs/updateBooking"


export default function Edit() {
    const [bookingDate, setBookingDate] = useState<Dayjs|null>(dayjs('2022-04-17T11:30'))
      const [startTime, setStartTime] = useState<Dayjs|null>(dayjs('2022-04-17T11:30'))
      const [testTime, setTestTime] = useState<Dayjs|null>(dayjs('2022-04-17T15:30'))
      const [endTime, setEndTime] = useState<Dayjs|null>(dayjs('2022-04-17T12:20'))
      const [restaurant, setRestaurant] = useState<string>('Chula')
      const [name, setName] = useState<string>('')
      const [surname, setSurName] = useState<string>('')
      const [id, setId] = useState<string>('')
      
      const [bookingId, setBookingId] = useState<string>('')
      const { data: session, status } = useSession()

      const urlParams = useSearchParams();
      const idParam = urlParams.get('id');
      const restaurantId = urlParams.get('rid');
      const rid = restaurantId  !== null ? restaurantId .toString() : '';
      const restaurantName = urlParams.get('name');
      const tableNum = urlParams.get('table');
      const [inputTable, setInputTable] = useState<string>(tableNum ?? '');
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

      useEffect(() => {
        const fetchData = async () => {
            const restaurName = await getRestaurant(rid);
            setRestaurantResponse(restaurName.data);
            
        }
        fetchData();
    },[startTime,endTime,bookingDate,restaurantName]);
     

    const dispatch = useDispatch<AppDispatch>()

    const makeAppointment = async () => {
        try {
           
            if (startTime && endTime) {
        
                if (!session || !session.user) {
                    throw new Error('Session not available');
                }

              
                const reserveResponse = await updateReserve(
                    startTime?.format('YYYY-MM-DD HH:mm:ss'), 
                    endTime?.format('YYYY-MM-DD HH:mm:ss'),
                    inputTable,
                    session.user.token,
                    idParam ?? ''
                )
                // setBookingId(reserveResponse.data._id);
                console.log('Reservation update successfully:', reserveResponse.data);
                if (reserveResponse && reserveResponse.status === 'success') {
                    setBookingId(reserveResponse.data._id);
                    console.log('Reservation added successfully:', reserveResponse.data);
                   
                } else {
                    throw new Error('Failed to update reservation');
                }
            } else {
                throw new Error('Missing data for reservation');
            }
        } catch (error) {
            console.error('Error making appointment:', error);
        }
    };
    
    return (

        <main className="px-auto py-5">
            <div className="text-xl font-medium">{restaurantName} Restaurant</div>
            <div className="h-fit bg-[#FEFCFF] w-full h-80 m-5 rounded-lg pt-2 items-center flex flex-col justify-center">
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
            </div>

            
            <form className="flex flex-col items-center space-y-5 bg-[#FEFCFF] p-5 rounded-xl ">
                <p className="text-2xl">Enter Your Information</p>
                <div>
                    <p className="text-xl mt-5">Enter Your Start Time</p>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateTimePicker']}>
                        <DateTimePicker label="Basic date time picker" onChange={(value) => {setStartTime(value);console.log(startTime)}}/>
                    </DemoContainer>
                    </LocalizationProvider>
                </div>

                <div>
                    <p className="text-xl mt-5">Enter Your End Time</p>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateTimePicker']}>
                        <DateTimePicker label="Basic date time picker" onChange={(value) => {setEndTime(value);console.log(endTime)}}/>
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
                    <button type='button' name="Book Vaccine"
                        onClick={() => { makeAppointment()}}
                        className="text-gray-900 bg-white border border-gray-300 text-lg font-semibold focus:outline-none 
                        hover:bg-gray-100 rounded-full px-5 py-2.5 me-2 mb-2 hover:scale-105"
                        >
                        Update Booking
                    </button>
               
            </form>

        </main>
    )
    
}