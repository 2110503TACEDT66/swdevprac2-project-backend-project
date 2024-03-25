interface RestaurantItem {
  _id: string,
  name: string,
  address: string,
  district: string,
  province: string,
  postalcode: string,
  tel: string,
  picture: string,
  __v: number,
  id: string
}

interface RestaurantJson {
  success: boolean,
  count: number,
  pagination: Object,
  data: RestaurantItem[]
}

interface BookingItem {
  name: string,
  surname: string,
  id: string,
  restaurant: string,
  bookDate: string
}