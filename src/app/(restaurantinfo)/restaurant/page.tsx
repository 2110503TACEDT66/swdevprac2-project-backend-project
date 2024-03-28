import RestaurantCatalog from "@/components/RestaurantCatalog";
import getRestaurants from "@/libs/getRestaurants";
import { LinearProgress } from "@mui/material";
import { Suspense } from "react";

export default function Restaurant() {
  try {
    var restaurants = getRestaurants()
  } catch (e) { 
    return console.error("Cannot Fetch Restaurants")
  }
    return (
      <main >
        <Suspense fallback= {
          <p className="text-black text-xl text-center p-5">Loading ... <LinearProgress/></p>
        }>
        <div>
            <h1 className="text-black py-6 my-6 text-center font-semibold text-2xl">
                Restaurant Information
            </h1>
        </div>
         <RestaurantCatalog restaurantsJson={restaurants} /> 
        </Suspense>
      </main>
    )
  }