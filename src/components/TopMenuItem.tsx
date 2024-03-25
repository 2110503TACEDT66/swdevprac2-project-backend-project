
import Link from 'next/link'

export default function TopMenuItem( { titleText, pageRef }
    :{titleText: string, pageRef: string}) {
    return (
        <Link href={pageRef} className='w-[100px] text-center font-mono text-sm font-medium my-[auto] text-[#595c5b] '>
            {titleText}
        </Link>
    )
}