const RestaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please add a name'],
        unique: true,
        trim:true,
        maxlength:[50,'Name can not be more than 50 characters']
    },
    address:{
        type: String,
        required: [true,'Please add an address']
    },
    district:{
        type: String,
        required: [true,'Please add an address']
    },
    province:{
        type: String,
        required: [true,'Please add a province']
    },
    postalcode:{
        type: String,
        required: [true,'Please add a postalcode'],
        maxlength: [5,'Postal Code can not be more than 5 digits']
    },
    tel:{
        type: String,
        required: [true,'Please add a region']
    },
    region:{
        type: String,
        required: [true,'Please add region'],
    },
    openingHours: [ {
            type: Map,
            enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            of: {
                opens: { type: String, required: true },
                closes: { type: String, required: true }
            }
        
    }
    ],
    table: [{
        type: String,
        require: true
    }]
});

const Restaurant = mongoose.model('Restaurant', RestaurantSchema) || mongoose.model.Restaurant;
export default Restaurant;