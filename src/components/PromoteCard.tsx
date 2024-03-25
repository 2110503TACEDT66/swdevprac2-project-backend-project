'use client'
import { useRef, useState } from "react"
import VideoPlayer from "./VideoPlayer"
import { Rating } from "@mui/material"
import { useWindowListener } from "@/hooks/useWindowListener"


export default function PromoteCard() {

    const [playing, setPlaying] = useState(true)
    useWindowListener('contextmenu', (e) => {
        e.preventDefault()
    })
    return (
        <div className="w-[80%] shadow-lg mx-[10%] my-10 p-2 
        rounded-lg bg-white flex text-black">

            <VideoPlayer vdoSrc="/vdo/getvaccine.mp4" isPlaying={playing}/>
            <div className="m-5 relative ">
                <p className="font-semibold text-xl">
                    Get Your Vaccine today.
                </p>
                <button  className="block absolute bottom-0 bg-[#e5fdff] text-black border border-[#CCECEE]
                font-semibold p-2 rounded-xl z-30 transition delay-75 hover:bg-[#CCECEE] hover:border-collapse  hover:scale-[103%]'"
                onClick={() => {setPlaying(!playing);}}>
                    {playing? "Pause" : "Play"}
                </button>
            </div>

        </div>
    )
    
}