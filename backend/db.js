const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://foodspeed:w69feOBaf43hsRsZ@cluster0.oylzjuj.mongodb.net/foodspeeddb?retryWrites=true&w=majority'
const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected Successfully");
        fetchData();
    } catch (error) {
        console.error("Error connecting to MongoDB: ", error);
    }
};
async function fetchData() {
    try {
        const fetched_data = await mongoose.connection.db.collection("food_items"); // Can write this only after execting above lines and establishing connection.
        const data = await fetched_data.find({}).toArray();
        const foodCategory = await mongoose.connection.db.collection("foodCategory");
        const categoryData = await foodCategory.find({}).toArray();
        global.food_items = data;
        global.foodCategory = categoryData;
    } catch (error) {
        console.error("Error Fetching Data: ", error);
    }
}

module.exports = mongoDB;   