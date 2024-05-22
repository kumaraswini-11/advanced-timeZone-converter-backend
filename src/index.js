import connectDB from "./db/index.js";
import { app } from "./app.js";

// Connect to the MongoDB database
connectDB()
  .then(() => {
    // Start the Express server
    app.listen(process.env.PORT, () => {
      console.log(`Server is running at port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    // Log an error message if MongoDB connection fails
    console.error("MONGO db connection failed !!! ", err);
  });
