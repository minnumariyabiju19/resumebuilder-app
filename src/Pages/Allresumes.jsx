import React, { useEffect, useMemo, useState } from 'react'
import { FaBackward, FaForward, FaSearch, FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { deleteResumeAPI, getAllResumeAPI } from '../services/allAPI'

function Allresumes() {

const[allResumes,setAllResumes]=useState([])
const[allDummyResumes,setAllDummyResumes]=useState([])
const[searchKey,setSearchKey]=useState("")
const[currentPage,setCurrentPage]=useState(1)
const rowsPerPage=4
const lastIndexofCurrentPage=currentPage*rowsPerPage
const firstIndexofCurrentPage=lastIndexofCurrentPage-rowsPerPage
const currentResumes=allResumes.slice( firstIndexofCurrentPage,lastIndexofCurrentPage)
const totalPages=Math.ceil(allResumes.length/rowsPerPage)

const getAllResumes=async()=>{
  const result=await getAllResumeAPI()
 // console.log(result)
 if(result.status==200){
   setAllResumes(result.data)
   setAllDummyResumes(result.data)
 }
}

const removeResume=async(id)=>{
  if(confirm("are you sure want to delete resume")) {
    const response = await deleteResumeAPI(id)
    if(response.status==200)
      getAllResumes()
  }
}

const searchOutput=useMemo(()=>{
  setAllResumes(allDummyResumes.filter(item=>item.job.toLowerCase().includes(searchKey.toLowerCase())))
},[searchKey])


useEffect(()=>{
  getAllResumes()
},[])


  return (
    <>
     <div className='my-5 container d-flex justify-content-center align-items-center flex-column'>
        <h1>All Saved Resumes</h1> 
        <p style={{textAlign:'justify'}}>  All resumes submitted to the platform in one place, allowing administrators or recruiters to efficiently view, search, filter, and manage candidate profiles. It provides a quick overview of available candidates and their key details, making the recruitment and candidate-selection process more organized and efficient.</p>
      <div className='d-flex justify-content-center align-items-center w-50'>
        <input onChange={e=>{setSearchKey(e.target.value);setCurrentPage(1)}}   type="text" placeholder='Search Candidate by their Job Roles' className='form-control'/>
        <FaSearch style={{marginLeft:'-30px'}}/>
      </div>
      <table className='my-5 table table-hover table-stripped'>
        <thead>
         <tr className='table-dark'>
           <th>#</th>
           <th>Resume</th>
           <th>Job Role</th>
           <th>...</th>
         </tr>
        </thead>
        <tbody>
          { currentResumes.length>0?currentResumes.map((resume,index)=>(
          <tr key={resume.id}>
            <td>{index+1}</td>
            <td><Link to={`/view/${resume.id}`}>{resume.fullName}</Link></td>
            <td>{resume.job}</td>
            <td><button onClick={()=>removeResume(resume.id)}  className='btn text-danger'><FaTrash/></button></td>
          </tr>)):<p>Nothing to display</p>}
        </tbody>
      </table>
      <div className='d-flex align-item-center'>
       <button className='btn' onClick={()=>setCurrentPage(currentPage-1)}>
       <FaBackward/>
       </button>
       <div className='mt-2'>
       {currentPage} of {totalPages}
       </div >
       <button className='btn' onClick={()=>setCurrentPage(currentPage+1)}>
        <FaForward/>
       </button>
      </div>
     </div>
    </>
  )
}

export default Allresumes
