'use client'
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Banner() {

    const covers = ['cover.jpg', 'cover2.jpg', 'cover3.jpg', 'cover4.jpg']

    const [index, setIndex] = useState(0)
    const router = useRouter();

    const {data:session} = useSession();

    return (
        <div onClick={() => {setIndex(index+1);}}
        className='block m-0 w-[100vw] h-[80vh] relative'>
            <Image src={`/img/${covers[index%covers.length]}`}
            alt='cover'
            fill={true}
            priority
            className='object-cover'
            ></Image>
            <div className='text-lg relative top-[100px] w-[100vw] z-20 text-center text-black h-[100px] bg-[#d7f5fa80] flex flex-col items-center justify-center'> 
                <h1 className='text-4xl'>Vaccine Service Center</h1>
                <h3>Because We Cared About You</h3>
            </div>

            {
                session?
                <div onClick={(e) => e.stopPropagation()}
                className='absolute top-5 right-5 font-semibold shadow-lg shadow-white bg-white p-5 rounded-xl 
                text-black transition delay-200 hover:scale-105 hover:shadow-xl hover:shadow-[#e5fdff]' >
                    Hello {session.user?.name}
                </div>
                : null
            }

            <button onClick={(e)=> { router.push('/restaurant'); e.stopPropagation()}}
            className='bg-[#e5fdff] text-black border border-[#CCECEE]
            font-semibold p-2 m-2 rounded-xl z-30 absolute bottom-0 right-0
            transition delay-75 hover:contrast-125 hover:border-collapse  hover:scale-[103%]'>
                Select Hospital
            </button>
        </div>
    );
}