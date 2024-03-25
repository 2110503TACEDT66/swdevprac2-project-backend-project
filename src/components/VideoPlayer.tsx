'use client'
import { useWindowListener } from "@/hooks/useWindowListener"
import { useEffect, useRef, useState } from "react"

export default function VideoPlayer({vdoSrc, isPlaying} 
    : {vdoSrc: string, isPlaying: boolean}) {

    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        console.log(videoRef.current?.videoWidth)
        if(isPlaying) {
            videoRef.current?.play()
        } else {
            videoRef.current?.pause()
        }    
    }, [isPlaying])

    return (
        <div className="w-[40%] ">
            <video className="rounded-md" ref={videoRef} src={vdoSrc} controls muted loop/>
        </div>
    )
    
}