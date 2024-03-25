'use client'

import Image from 'next/image'
import InteractiveCard from './InteractiveCard'
import { Rating } from "@mui/material";
import { useState } from 'react';


export default function Card( {restaurantName, imgSrc, onRating} : 
    {restaurantName: string, imgSrc: string, onRating?: Function}) {
    const restaurantRating = `${restaurantName} Rating`

    const [rating, setRating] = useState(5);
    return (
        <InteractiveCard restaurantName={restaurantName}>
                <div className='w-full h-[70%] relative rounded-t-lg flex'>
                    <Image src={imgSrc} alt='Product Picture'
                    className='object-cover rounded-t-lg' width={300} height={100}>
                    </Image>
                </div>
                <div className='w-full h-[20%] text-black flex items-center justify-center font-semibold'>{restaurantName}</div>
                <div className='flex items-center justify-center'>
                    {
                        onRating? 
                        <Rating defaultValue={rating} 
                        name={restaurantRating} 
                        id={restaurantRating} 
                        data-testid={restaurantRating}
                        onChange={(e, rating)=>{e.stopPropagation(); onRating(restaurantName, rating);}}/>
                        : ''
                    }
                </div> 
        </InteractiveCard>
    )
}