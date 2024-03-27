interface RestaurantItem {
  _id: string,
  name: string,
  address: string,
  district: string,
  province: string,
  postalcode: string,
  tel: string,
  openingHours: {
    dayOfWeek: string,
    opens: String,
    closes: String
  },
  table: Table[],
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
  bookId: string,
  table: string,
  restaurant: string,
  startBookTime: string,
  endBookTime: string
}
interface BookingItem2 {
  _id: string,
  start: string,
  end: string,
  user: string,
  restaurant: RestaurantItem,
  table: string,
  createAt: string
}

interface Table{
  tableNumber: string,
  capacity: number,
  timeSlots: [{
    start: string,
    end: string
  }]
}

interface user{
  name: string,
  email: string,
  role: string,
  tel: string,
  password: string,
  token: string
}