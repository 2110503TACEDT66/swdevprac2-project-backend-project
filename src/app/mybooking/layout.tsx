'use client'
import ReduxProvider from "@/redux/ReduxProvider"

export default function MyBookingLayout( 
    { children }: { children: React.ReactNode }

) {
    return (
        <ReduxProvider>
            <div>
                {children}
            </div>
        </ReduxProvider>
    )
}