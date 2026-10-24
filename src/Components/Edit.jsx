import React, { useRef } from 'react'
import {MdEditSquare} from "react-icons/md"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import jobRole from '../assets/jobRole.json'
import {FaXmark} from 'react-icons/fa6'
import { toast } from 'react-toastify';
import { updateResumeAPI } from '../services/allAPI';


  const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  maxHeight:'80vh',
  overflow:"auto",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



function Edit({resumeData,setResumeData}) {

 const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
   const skillRef=useRef()
  const addSkill=(skill)=>{
   
    if(skill){
      if(resumeData.skills?.map(item=>item.toLowerCase()).includes(skill.toLowerCase())){
       toast.warn("given skill already added")
      }
      else{
        setResumeData({...resumeData,skills:[...resumeData?.skills,skill]})
      }
      skillRef.current.value=""
    }else{
      toast.info("please enter a valid skill !!!")
    }
  }
  const removeSkill=(skill)=>{
    setResumeData({...resumeData,skills:resumeData.skills.filter(item=>item!=skill)})
  }

  const handleUpdateResume=async()=>{
     const{fullName,location,job,email,phone,linkedin,github,degree,college,year,skills,summary}
        =resumeData
        if(fullName&&location&&job&&email&&phone&&linkedin&&github&&degree&&college&&year&&skills.length>0 &&summary){
         const response=await updateResumeAPI(resumeData.id,resumeData)
       // console.log(response)
       if(response.status==200){
        toast.success("resume updated")
        handleClose()
       }
      }else{
        toast.info("pleade add valid details")
      }
  }


  return (
    <div>
      <button onClick={handleOpen}  style={{color:'#714a2f'}} className='btn'><MdEditSquare className='fs-3'/>Edit Cv

      </button>
       <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          Edit Resume
          </Typography>
         <Box id="modal-modal-description" sx={{mt:2}}>
           <div>
         <h3>Person Details</h3>
         <div className='p-3 row'>
          <TextField id="standard-basic-name" label="FullName" variant="standard" value={resumeData.fullName} onChange={e=>setResumeData({...resumeData,fullName:e.target.value})} />
          
          <TextField id="standard-basic-loc" label="Location" variant="standard" value={resumeData.location}  onChange={e=>setResumeData({...resumeData,location:e.target.value})}  />
           <FormControl variant='standard'>
  <InputLabel id="demo-simple-select-label">Choose Job Title</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
     value={resumeData.job || ''}
    label="job"
   onChange={e=>setResumeData({...resumeData,job:e.target.value})}
  >
    {jobRole.jobRoles.map(job=>(<MenuItem key={job} value={job} >{job}</MenuItem>))}
    
   
  </Select>
</FormControl>
         </div>
        </div>
         <div>
          {/* contact detail */}
                 <h3>Contact Details</h3>
                 <div className='p-3 row'>
                  <TextField id="standard-basic-email" label="Email" variant="standard" value={resumeData.email} onChange={e=>setResumeData({...resumeData,email:e.target.value})} />
                  <TextField id="standard-basic-num" label="Contact Number" variant="standard" value={resumeData.phone} onChange={e=>setResumeData({...resumeData,phone:e.target.value})} />
                  <TextField id="standard-basic-linkedin" label="Linkedin Link" variant="standard" value={resumeData.linkedin} onChange={e=>setResumeData({...resumeData,linkedin:e.target.value})} />
                  <TextField id="standard-basic-github" label="Github Link" variant="standard" value={resumeData.github} onChange={e=>setResumeData({...resumeData,github:e.target.value})}/>
                
                 </div>
                </div>
                 <div>
                  {/* education detail */}
                         <h3>Education Details</h3>
                         <div className='p-3 row'>
                          <TextField id="standard-basic-degree" label="Bachelor's Degree" variant="standard" value={resumeData.degree} onChange={e=>setResumeData({...resumeData,degree:e.target.value})} />
                          <TextField id="standard-basic-college" label="College/University" variant="standard" value={resumeData.college} onChange={e=>setResumeData({...resumeData,college:e.target.value})}/>
                          <TextField id="standard-basic-year" label="LYear of Graduation" variant="standard" value={resumeData.year} onChange={e=>setResumeData({...resumeData,year:e.target.value})} />
                        
                         </div>
                        </div>
                        {/* skilld */}
                          <div>
                         <h3>Skills</h3>
                         <div className='p-3 d-flex'>
                          <input ref={skillRef} type="text" placeholder='Add New Skill' className='form-control' />
                          <Button onClick={()=>addSkill(skillRef.current.value)} style={{color:'#714a2f'}}>Add</Button>
                         </div>
                        </div>
                        <h6>Added Skills:</h6>
                        <div className='p-3 d-flex justify-content-between flex-wrap'>
                          {/* all skills-duplicate */}
                          {
                            resumeData?.skills?.map(skill=>(
                              <Button onClick={()=>removeSkill(skill)} key={skill} variant='contained' sx={{backgroundColor:'#b19596'}} className='my-1'>{skill}<FaXmark className='ms-2'/></Button>
                            ))
                          }

                        </div>
                        {/* summary */}
                        <div>
                         <h3>Summary</h3>
                         <div className='p-3 row'>
                          <TextField id="standard-basic-degree" label="Bachelor's Degree" multiline variant="standard" value={resumeData.summary} onChange={e=>setResumeData({...resumeData,summary:e.target.value})} />
                        
                        
                         </div>
                        </div>
                          {/* update resume */}
                          <div>
                            <Button onClick={handleUpdateResume} className='btn btn-light' style={{color:'#714a2f'}}>Update</Button>
                          </div>
         </Box>
        </Box>
      </Modal>

    </div>
  )
}

export default Edit
