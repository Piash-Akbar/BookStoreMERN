import React from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import BackButton from '../comp/BackButton'
import Spinner from '../comp/Spinner'
import axios from 'axios'
import { useSnackbar } from 'notistack'

const DeleteBook = () => {
  const[loading,setLoading] = useState(false)
  const {id} = useParams()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const handleDeleteBook = ()=>{
    setLoading(true)
    axios.delete(`http://localhost:5555/books/${id}`)
    .then((response)=>{
      setLoading(false)
      enqueueSnackbar('Book Delete Successfully', {variant:'success'})
      navigate('/')
    })
    .catch((error)=>{
      setLoading(false);
      // alert('An error happend please check console')
      enqueueSnackbar('Error',{variant:'error'})
      console.log(error)
    })
  }


  return (
    <div className="p-4">
      <BackButton/>
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading ? <Spinner/>:''}
      <div className="flex flex-col items-center border-2 border-sky-500 rounded-3xl w-[600px] p-8 mx-auto">
      <h3 className="text-2xl ">Are you sure,You want to delete the book?</h3>
      <button
        className="p-4 bg-red-600 text-white m-8 w-full"
        onClick={handleDeleteBook}
      >
        Yes Delete it

      </button>
      </div>

    </div>
  )
}

export default DeleteBook