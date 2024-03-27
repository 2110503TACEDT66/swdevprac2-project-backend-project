'use client'
import Banner from '@/components/Banner'
import PromoteCard from '@/components/PromoteCard'
import Image from 'next/image'
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  return (
    <main>
       <Banner/>
       {/* <PromoteCard/> */}
       
        {/* <Image
          src={`/img/banner1.png`}
          alt='cover'
          width={1500}
          height={200}
          className='mt-14'
          /> */}
        <div>
          <h1 className="mt-10 text-2xl text-center font-bold text-gray-800">More Than 50++ Tops Restaurant </h1>
        </div>
        <div className='m-10 flex flex-wrap justify-center'>
          
            <Image
              src={`/img/sample1.png`}
              alt='cover'
              width={100}
              height={20}
              className='mx-10'
              />
          
          
            <Image
              src={`/img/sample1.png`}
              alt='cover'
              width={100}
              height={20}
              className='mx-10'
              />
        
            <Image
              src={`/img/sample1.png`}
              alt='cover'
              width={100}
              height={20}
              className='mx-10'
              />
            <Image
              src={`/img/sample1.png`}
              alt='cover'
              width={100}
              height={20}
              className='mx-10'
              />
            <Image
              src={`/img/sample2.png`}
              alt='cover'
              width={100}
              height={20}
              className='mx-10 '
              />
        </div>
        <div className='w-full bg-gray-100 flex'>
         
            <div className='bg-gray-100 items-center my-auto ml-auto text-center w-100'>
              <div className='font-semibold m-auto text-2xl text-red-800'>Reserve your table</div>
              <div className='font-semibold m-auto text-2xl mb-4 text-red-800'>While seats last</div>

              <button onClick={(e)=> { router.push('/restaurant'); e.stopPropagation()}} className='text-white bg-white border bg-red-800 text-lg font-semibold focus:outline-none 
                        hoverbg-red-900 rounded-lg px-5 py-2.5 me-2 mb-2 hover:scale-105 my-5'>Reserve Now!</button>
            </div>
            <Image
              src={`/img/side.png`}
              alt='cover'
              width={700}
              height={800}
              className='ml-auto'
              />
          
        </div>
    </main>
  )
}
