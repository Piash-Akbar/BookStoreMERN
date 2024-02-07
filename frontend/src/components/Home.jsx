import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Spinner from '../comp/Spinner';
import { Link } from 'react-router-dom';
import {AiOutlineEdit} from 'react-icons/ai'
import {BsInfoCircle} from 'react-icons/bs'
import {MdOutlineAddBox,MdOutlineDelete} from 'react-icons/md'
import BooksTable from '../comp/home/BooksTable';
import BooksCard from '../comp/home/BooksCard';


const Home = () => {

  const [books, setBooks] = useState([]);
  const [loading,setLoading] = useState(false);
  const[show,setShow] = useState('table');

  useEffect(()=>{
    setLoading(true);
    axios.get('http://localhost:5555/books')
    .then((response)=>{
      setBooks(response.data.data);
      setLoading(false);
    })
    .catch((error)=>{
      console.log(error);
    });
    },[])

  return (
    <dev className="p-4 ">
      <div className="flex justify-center items-center gap-x-4">
        <button className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
                onClick={()=> setShow('table')}
        >
          List View
        </button>

        <button className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
                onClick={()=> setShow('card')}
        >
          Grid View
        </button>
      </div>
      <dev className="flex justify-between items-center bg-white">
        <h1 className="text-3xl my-8 pl-[45%]">Book List</h1>
        <Link to='/books/create'>
          <MdOutlineAddBox className="text-sky-800 text-4xl mr-3" />
        
        </Link>
      </dev>
      {loading ? (
            <Spinner />
          ):(
              show=='table'? <BooksTable books={books} /> : <BooksCard books={books}/>
          )}
    </dev>
  )
}

export default Home