
import Link from 'next/link'

export default function TopMenuItem( { titleText, pageRef }
    :{titleText: string, pageRef: string}) {
    return (
        <Link href={pageRef} className='w-[100px] text-center font-mono text-sm font-medium my-[auto] text-[#8B2A33] px-4 flex justify-center items-center'>
            {titleText}
        </Link>
    )
}