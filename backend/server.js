import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import photoRoutes from './routes/photo.routes.js';
import cors from 'cors';
import path from 'path';

dotenv.config();

const app = express();
const __dirname = path.resolve();
app.use(express.json());
app.use(cors(
  {
  origin: 'http://localhost:5173'
}
));
app.use("/api/photos",photoRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, "/fronted/dist")))
  app.get("*" , (req,res) => {
    res.sendFile(path.resolve(__dirname,"fronted","dist","index.html"))
  })
}
  




app.listen(process.env.PORT, () => {
  connectDB();  
  console.log(`Server is running on port localhost:${process.env.PORT}`);
});




