'use client' //if you use reducers, you have to use client side caching
import { useReducer } from "react";
import Card from "@/components/Card";
import Link from "next/link";

export default function CarPanel() {

    let count = 0;
    
    const hosRatingReducer = (hosRatingList: Map<string,number> , 
        action:{type:string, restaurantName:string, rating:number}) => {
        switch(action.type) {
            case "set": {
                return new Map(hosRatingList.set(action.restaurantName, action.rating));
            }
            case "delete": {
                hosRatingList.delete(action.restaurantName)
                return new Map(hosRatingList)
            }
            default: {
                return hosRatingList
            }
        }
    }

    let restaurantMap = new Map([
        ['Chulalongkorn Hospital', 5],
        ['Rajavithi Hospital', 5],
        ['Thammasat University Hospital', 5],
        ])

    const[hosRatingList, dispatchRating] = useReducer(hosRatingReducer, restaurantMap)

    const mockHospitalRepo = [
        {
            hid:'001',
            name: 'Chulalongkorn Hospital',
            image:'/img/chula.jpg'
        },
        {
            hid:'002',
            name: 'Rajavithi Hospital',
            image:'/img/rajavithi.jpg'

        },
        {
            hid:'003',
            name: 'Thammasat University Hospital',
            image:'/img/thammasat.jpg'

        },
    ]
    return (
        <div>
            <div className='m-5 flex flex-row flex-wrap justify-around items-center gap-3'>
               
                {
                    mockHospitalRepo.map((restaurant) => (
                        <Link href={`/restaurant/${restaurant.hid}`}>
                        <Card key={restaurant.hid} restaurantName={restaurant.name} imgSrc={restaurant.image}
                        onRating={ (restaurant:string, hosRating:number) => 
                            dispatchRating({type:'set', restaurantName:restaurant, rating:hosRating})}
                        />
                        </Link>
                    ))
                }
                

            </div>
                <div className="text-black bg-white w-[50vw] shadow-lg text-center p-5 text-lg mx-[25%] my-[50px] rounded-2xl" >
                    {Array.from(hosRatingList).map(([restaurant,hosRating]) => 
                    <div data-testid={restaurant} onClick={() => 
                    dispatchRating({type:'delete', restaurantName:restaurant, rating:hosRating})}>
                        {restaurant} Rating : {hosRating}
                    </div> )}
                </div>
        </div>
    )
}