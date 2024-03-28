import BookingMenu from "@/components/BookingMenu"
import ReduxProvider from "@/redux/ReduxProvider"

export default function BookingLayout( 
    { children }: { children: React.ReactNode }

) {
    return (
        // <ReduxProvider>
            <div className='flex p-2.5 text-black text-center gap-20'>
                {children}
            </div>
        // </ReduxProvider>
    )
}