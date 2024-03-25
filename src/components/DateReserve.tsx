'use client'
import { DatePicker } from "@mui/x-date-pickers"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { Select, MenuItem } from "@mui/material"
import { useState } from "react"
import { Dayjs } from "dayjs"



export default function DateReserve({onDateChange, onRestaurantChange} 
    :{onDateChange:Function, onRestaurantChange:Function}) {
    const [date, setDate] = useState<Dayjs|null>(null)
    const [restaurant, setRestaurant] = useState('Chula')
    
    return (
        <div className="bg-slate-100 rounded-lg space-x-5 space-y-2 w-fit px-10 py-5 flex flex-row justify-center">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                value={date}
                onChange={(value) => {setDate(value); onDateChange(value);}}
                className='bg-white'/>
            </LocalizationProvider>

            <Select variant="standard" name='restaurant' id='restaurant' className="h-[2em] w-[200px]" value={restaurant}
                onChange={(e) => {setRestaurant(e.target.value); onRestaurantChange(e.target.value);}}
                >
                <MenuItem value="Chula">Chulalongkorn Hospital</MenuItem>
                <MenuItem value="Rajavithi">Rajavithi Hospital</MenuItem>
                <MenuItem value="Thammasat">Thammasat University Hospital</MenuItem>
            </Select>
        </div>

    )
}