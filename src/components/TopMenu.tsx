
import Image from 'next/image'
import TopMenuItem from './TopMenuItem'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import getUserProfile from '@/libs/getUserProfile'
export default async function TopMenu() {
    
    const session = await getServerSession(authOptions)
    
    return (
        <div className='h-[75px] z-30 fixed flex flex-row-reverse bg-slate-50 w-[100vw] inset-x-[0%] top-0'>
            <Link href={'/'}>
                <Image src={'/img/logo.png'} priority className='h-[100%] w-auto right-0' alt="Logo" width={0} height={0} sizes='100vh'/>
            </Link>
            <TopMenuItem titleText='Vaccine Booking' pageRef='/booking' />
            {/* <TopMenuItem titleText='About' pageRef='/about' /> */}
            <div className='absolute left-0 h-full flex gap-4'>
                {
                    session? <Link href={'/api/auth/signout'}>
                                <div className='w-28 flex justify-center items-center px-2 text-[#595c5b] text-sm text-center font-mono font-medium h-full'>
                                    Sign-Out
                                </div>
                            </Link> 
                        :  <Link href={'/api/auth/signin'} > 
                            <div className='w-28 flex px-2 text-[#595c5b] text-sm text-center font-mono font-medium justify-center items-center h-full'>
                                Sign-In
                            </div>  
                        </Link> 
                }
                <Link href="/mybooking">
                    <div className='w-28 flex justify-center items-center px-2 text-[#595c5b] text-sm text-center font-mono font-medium h-full'>
                        My Booking
                    </div>
                </Link>
            </div>
        </div>
    )
}