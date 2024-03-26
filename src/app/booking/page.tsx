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




export default function Bookings() { 
    const urlParams = useSearchParams();
    const idParam = urlParams.get('id');
    const rid = idParam !== null ? idParam.toString() : '';
    const restaurantName = urlParams.get('name');

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

      
      const [bookingDate, setBookingDate] = useState<Dayjs|null>(dayjs('2022-04-17T11:30'))
      const [startTime, setStartTime] = useState<Dayjs|null>(dayjs('2022-04-17T11:30'))
      const [testTime, setTestTime] = useState<Dayjs|null>(dayjs('2022-04-17T15:30'))
      const [endTime, setEndTime] = useState<Dayjs|null>(dayjs('2022-04-17T12:20'))
      const [restaurant, setRestaurant] = useState<string>('Chula')
      const [name, setName] = useState<string>('')
      const [surname, setSurName] = useState<string>('')
      const [id, setId] = useState<string>('')
      const [inputTable, setInputTable] = useState<string>('')


      useEffect(() => {
          const fetchData = async () => {
              const restaurName = await getRestaurant(rid);
              setRestaurantResponse(restaurName.data);
          }
          fetchData();
      },[startTime,endTime,bookingDate,restaurantName]);

    const dispatch = useDispatch<AppDispatch>()

    const makeAppointment = (booking:BookingItem) => {
        if(name && surname && inputTable && restaurant && startTime && endTime && id) {
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
        table: inputTable,
        restaurant: restaurantName ?? '',
        startBookTime: startTime?.format('YYYY-MM-DD HH:mm:ss') ?? '',
        endBookTime: endTime?.format('YYYY-MM-DD HH:mm:ss') ?? ''
    };
    return (

        <main className="px-auto py-5 ">

            <div className="text-xl font-medium">Car: {restaurantName}</div>
            <div className="m-20 flex flex-row flex-wrap justify-around items-center">
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
                    <p className="text-2xl my-2">Enter Your Start Time</p>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateTimePicker']}>
                        <DateTimePicker label="Basic date time picker" onChange={(value) => {setStartTime(value);console.log(startTime)}}/>
                    </DemoContainer>
                    </LocalizationProvider>
                </div>
                <div>
                    <p className="text-2xl my-2">Start Time: {startTime?.format('HH:mm')}</p>
                </div>

                <div>
                    <p className="text-2xl my-2">Enter Your End Time</p>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateTimePicker']}>
                        <DateTimePicker label="Basic date time picker" onChange={(value) => {setEndTime(value);console.log(endTime)}}/>
                    </DemoContainer>
                    </LocalizationProvider>
                </div>
                <div>
                    <p className="text-2xl my-2">End Time: {endTime?.format('HH:mm')}</p>
                </div>
                <div>table: {inputTable}</div>

                <div>
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
    
