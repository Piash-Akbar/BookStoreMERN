import { useState,useEffect } from "react"
import React from 'react'
import { useNavigate,useParams } from "react-router-dom"
import BackButton from "../comp/BackButton"
import Spinner from "../comp/Spinner"
import axios from "axios"
import { useSnackbar } from "notistack"

const EditBook = () => {
  const [title,setTitle] = useState('')
  const [author,setAuthor] = useState('')
  const [publishYear,setPublishYear] = useState('')
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()
  const {id} = useParams();
  const { enqueueSnackbar } = useSnackbar()
  useEffect(()=>{
    setLoading(true)
    axios.get(`http://localhost:5555/books/${id}`)
    .then((response)=>{
      setTitle(response.data.title)
      setAuthor(response.data.author)
      setPublishYear(response.data.publishYear)
      setLoading(false)
    })
    .catch((error)=>{
      setLoading(false)
      alert('Something is Wrong. Please Check Console')
      console.log(error)

    });
  },[id])


  const handleEditBook = ()=>{
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios.put(`http://localhost:5555/books/${id}`,data)
    .then(() => {
      setLoading(false)
      enqueueSnackbar('Edited Book Successfully',{variant:'success'})
      navigate('/')
    })
    .catch((error)=>{
      setLoading(false)
      // alert('An error happend.Please check console')
      enqueueSnackbar('Error',{variant:'error'})
      console.log(error)
    })
  }
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Book</h1>
      {loading ? <Spinner/> : ''}
      <div className="flex flex-col border-2 border-sky-600 rounded-3xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input 
            type="text"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full rounded-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input 
            type="text"
            value={author}
            onChange={(e)=>setAuthor(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full rounded-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input 
            type="text"
            value={publishYear}
            onChange={(e)=>setPublishYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full rounded-full"
          />
        </div>
        <button className="p-2 bg-sky-300 m-8 rounded-full" onClick={handleEditBook}>
          Save
        </button>
      </div>

    </div>
  )
}

export default EditBook