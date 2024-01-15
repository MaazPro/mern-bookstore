import express, { request, response } from "express";
import {PORT, mongoDBURL}  from "./config.js";
import mongoose from "mongoose";
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';
// import { Book } from "./models/bookModel.js";

const app = express();

app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
// app.use(cors());

// Option 2: Allow custom origins
app.use(cors({
    origin:["http://localhost:3000"],
    // origin: ["https://mern-bookstore.vercel.app"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}));

app.get('/', (request, response)=>{
    console.log(request);
    return response.status(234).send('MERN Stack');
});

app.use('/books', booksRoute);

// // Route for Save a new Book
// app.post('/books',async (request, response)=>{
//     try {
//         if(
//             !request.body.title ||
//             !request.body.author ||
//             !request.body.publishYear
//             ){
//                 return response.status(400).send({
//                     message: 'Send all the required fields: title, author, publishYear',
//                 });
//             }
//             const newBook = {
//                 title: request.body.title,
//                 author: request.body.author,
//                 publishYear: request.body.publishYear,
//             };
//             const book = await Book.create(newBook);
//             return response.status(201).send(book);
//     } catch (error) {
//         console.log(error.message);
//         response.status(500).send({message: error.message});
//     }
// } )

// // Route to get the all the books from the database
// app.get('/books', async (request, response)=>{
//     try {
//         const books = await Book.find({});

//         return response.status(200).json(
//             {
//                 count: books.length,
//                 data: books
//             });
//     } catch (error) {
//         console.log(error.message);
//         response.status(500).send({message: error.message});
//     }
// });


// // Route to get the the book from the database by id
// app.get('/books/:id', async (request, response)=>{
//     try {
//         const { id } = request.params;
//         const book = await Book.findById(id);
//         if(!book){
//             return response.status(404).send({message: 'Book does not exist'});
//         }
//         return response.status(200).json(book);

//     } catch (error) {
//         console.log(error.message);
//         response.status(500).send({message: error.message});
//     }
// });

// // Route to update a book
// app.put('/books/:id', async (request, response)=>{
//     try {
//         if(
//             !request.body.title ||
//             !request.body.author ||
//             !request.body.publishYear
//         ){
//             return response.status(400).send({
//                 message: 'Send all required fields: title, author, publishYear'
//             });
//         }

//         const { id } = request.params;
//         const result = await Book.findByIdAndUpdate(id, request.body);

//         if(!result){
//             return response.status(404).json({message: 'Book not found'});
//         }

//         return response.status(200).send({message: 'Book updated successfully' });

//     } catch (error) {
//         console.log(error.message);
//         response.status(500).send({message: error.message});
//     }
// })

// // Route to Delete a book
// app.delete('/books/:id', async (request, response)=>{
//     try {
//         const { id } = request.params;

//         const result = await Book.findByIdAndDelete(id);
        
//         if(!result){
//             return response.status(404).send({message: 'Book not found'});
//         }

//         return response.status(200).send({message: 'Book deleted successfully'});

//     } catch (error) {
//         console.log(error.message);
//         response.status(500).send({ message: error.message });
//     }
// })

mongoose.connect(mongoDBURL)
.then(()=>{
    console.log("App connected to database");
    app.listen(PORT, ()=>{
        console.log(`App is listeinig to port: ${PORT}`);
    })
})
.catch((error)=>{
    console.log(error);
});