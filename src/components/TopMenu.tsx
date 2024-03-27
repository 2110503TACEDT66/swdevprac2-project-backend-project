'use client'
import Image from 'next/image'
import TopMenuItem from './TopMenuItem'
import Link from 'next/link'
import { useSession } from 'next-auth/react';

export default function TopMenu() {
    
    const {data:session} = useSession();
    const profile = session?.user
    
    return (
        <div className='h-[75px] z-30 flex bg-slate-50 w-[100vw] inset-x-[0%] top-0 flex-row-reverse fixed gap-2' >
                <div className='absolute left-0 h-full'>
                    <Link href={'/'}>
                        <Image src={'/img/hungy-high-resolution-logo-transparent.png'} priority className='w-full h-full scale-95' alt="Logo" width={0} height={0} sizes='100vh'/>
                    </Link>
                </div>
                    {
                        session?
                        <TopMenuItem titleText='Sign-out' pageRef='/api/auth/signout' />
                        :<TopMenuItem titleText='Sign-in' pageRef='/api/auth/signin' />
                    }
                    {
                        session? null :<TopMenuItem titleText='Sign-Up' pageRef='/register'/>
                    }

                <TopMenuItem titleText='About' pageRef='/about'/>
                <TopMenuItem titleText='Reservation' pageRef='/booking' />
                <TopMenuItem titleText='Restaurant' pageRef='/restaurant' />
                <TopMenuItem titleText='Manage' pageRef='/manage' />
                <TopMenuItem titleText='Home' pageRef='/' />
        </div>
    )
}