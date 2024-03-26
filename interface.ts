interface RestaurantItem {
  _id: string,
  name: string,
  address: string,
  district: string,
  province: string,
  postalcode: string,
  tel: string,
  openingHours: {
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: { type: String},
    closes: { type: String}
  },
  table: {
    tableNumber: { type: String },
    capacity: { type: Number },
    timeSlots: {
      start: { type: String },
      end: { type: String }
    }
  },
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

interface table{
  tableNumber: string,
  capacity: number,
  timeSlots: {
    start: string,
    end: string
  }
}