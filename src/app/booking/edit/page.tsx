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
      const [inputTable, setInputTable] = useState<string>('')
      const [bookingId, setBookingId] = useState<string>('')
      const { data: session, status } = useSession()

      const urlParams = useSearchParams();
      const idParam = urlParams.get('id');


     

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

        <main className="px-auto py-5 w-full">

            
            <form className="flex flex-col items-center space-y-5 bg-[#FEFCFF] p-5 rounded-xl ">
                <p className="text-2xl">Enter Your Information</p>
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
                        onClick={() => { makeAppointment()}}
                        className="text-gray-900 bg-white border border-gray-300 text-lg font-semibold focus:outline-none 
                        hover:bg-gray-100 rounded-full px-5 py-2.5 me-2 mb-2 hover:scale-105"
                        >
                        Update Booking
                    </button>
                </div>
            </form>

        </main>
    )
    
}