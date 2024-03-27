'use client'
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Banner() {

    const covers = ['cover.png', 'cover2.jpeg', 'cover3.jpeg', 'cover4.jpeg']

    const [index, setIndex] = useState(0)
    const router = useRouter();

    const {data:session} = useSession();

    return (
        <div onClick={() => {setIndex(index+1);}}
        className='flex m-0 w-[100vw] h-[80vh] relative'>
            <Image src={`/img/${covers[index%covers.length]}`}
            alt='cover'
            fill={true}
            priority
            className='object-cover'
            ></Image>
            <div className='text-2xl w-full  mt-[20%] h-36 p-24 z-20 text-white bg-[#8b2a34c6] flex flex-col items-center justify-center gap-4'> 
                <p className='text-7xl'>Restaurant Reservation</p>
                <p>As you Craved😋</p>
            </div>

            {
                session?
                <div onClick={(e) => e.stopPropagation()}
                className='absolute top-5 right-5 font-semibold shadow-lg shadow-white bg-white p-5 rounded-xl 
                text-black transition delay-200 hover:scale-105 hover:shadow-xl hover:shadow-[#e5fdff]' >
                    Hello {session.user?.name} ({session.user?.role})
                </div>
                : null
            }

            <button onClick={(e)=> { router.push('/restaurant'); e.stopPropagation()}}
            className='bg-white text-black border
            font-semibold p-3 m-2 rounded-xl z-30 absolute bottom-0 right-0
            transition delay-75 hover:border-collapse  hover:scale-[103%]'>
                Make your Reservation!
            </button>

        </div>
    );
}