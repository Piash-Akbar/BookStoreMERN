import express, { request, response } from "express";
import { PORT,mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from './routes/booksRoute.js'
import cors from 'cors'

const app = express();
app.use(express.json());
// Middleware to handle cors policy
//Option:1 allow all origins with default of cors(*)
app.use(cors());
// Option2: Allow Custom Origins
// app.use(cors({
//     origin:"http://localhost:3000/",
//     methods: ['GET','POST','PUT','DELETE'],
//     allowedHeaders: ['Content-Type'],
// }))



//Middleware for parsing request body
app.get('/',(request,response)=>{
    console.log(request)
    return response.status(234).send('Welcome to MERN stack tutorial')
})

//Route for saving a new book
app.use('/books',booksRoute);





mongoose.connect(mongoDBURL)
.then(()=>{
    console.log('App connected to database');
    app.listen(PORT, ()=>{
        console.log(`App is Listening to PORT:${PORT}`)
    })
})
.catch((error)=>{
    console.log(error)
})
