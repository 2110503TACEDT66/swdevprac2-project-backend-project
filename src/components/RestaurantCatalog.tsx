import getRestaurants from "@/libs/getRestaurants"
import Link from "next/link";
import Card from "./Card";

export default async function RestaurantCatalog({restaurantsJson}:{restaurantsJson:Promise<RestaurantJson>}) {
    const restaurantsJsonReady = await restaurantsJson

    return (
        <div className='m-5 flex flex-row flex-wrap justify-around items-center gap-3'>
                {
                    restaurantsJsonReady.data.map((restaurant:RestaurantItem) => (
                        <Link href={`/restaurant/${restaurant.id}`}>
                        <Card key={restaurant.id} restaurantName={restaurant.name} imgSrc={restaurant.picture}/>
                        </Link>
                    ))
                }
        </div>
    )
}