import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAlldownloadResumesAPI } from '../services/allAPI'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


ChartJS.register(ArcElement, Tooltip, Legend);
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


function Downloads() {
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const[allDownloadList,setAllDownloadList]=useState([])
 
  //to store job roles
const[label,setLabel]=useState([])
//to store count of jobRoles
const[value,setValue]=useState([])
const colorPallete=['#044982','#24740b','#b421b7','#cf3d15','#4e1017','#d4d713'] 
const backgroundColor=label.map((value,index)=>colorPallete[index%colorPallete.length])
const data={
  labels:label,
  datasets:[
    {
      label:'downloads',
      data:value,
      backgroundColor
    }
  ]
}




  useEffect(()=>{getAllDownloads()},[])

  const getAllDownloads=async()=>{
    const result= await getAlldownloadResumesAPI()
    //console.log(result.data);
   setAllDownloadList(result.data)
    const output={}
    result.data.forEach(item=>{
      const currentJob=item.jobRole.job
      if(currentJob in output){
        output[currentJob]+=1
      }else{
        output[currentJob]=1
      }
    })
    setLabel(Object.keys(output))
    setValue(Object.values(output))
  }

//console.log(allDownloadList)
  return (
    <>
      <div className='container my-5'>
       <div className='d-flex justify-content-between align-items-center'>
        <h2>All Downloaded Resume Details</h2>
        <Button style={{backgroundColor:'#714a2f'}} onClick={handleOpen} className='btn text-light'>
          View in Chart
        </Button>
       </div>
       <p className='my-3 fw-bolder'>Total Downloaded resumes from our site is <span className='text-danger fs-4'>{allDownloadList.length}</span></p>
       <div className='row my-5'>
      {/* duplicate according to download resume count */}
      {allDownloadList.length>0?allDownloadList.map(resume=>(  <div className='col-lg-4 mb-3'>
        <div style={{height:'400px'}} className='shadow p-3 rounded'>
         <h6>Review at : {resume.timeStamp}</h6>
         <div className='mt-3 text-center'>
           <Link to={`/view/${resume.resumeId}`}> <img className='w-100' height={'300px'} src={resume.resumeIMG} alt="download cv"/>
           </Link>
         </div>
        </div>
      </div>)):<p>Nothing to display</p>}
    
       </div>
      </div>
       <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            CV Download Count by Job Role 
          </Typography>
          <Box id="modal-modal-description" sx={{mt:2}}>
             <div className='d-flex justify-content-center align-items-center m-5'>
               <Pie data={data}/>
             </div>
             <p style={{textAlign:'justify'}}>This chart provides an overview of the number of CV downloads associated with different job roles on the website. It helps visualize the demand and engagement for CVs across various career categories, making it easier to identify which job roles attract the highest number of downloads. By comparing download counts across roles, the chart can provide useful insights into user preferences and the popularity of different career opportunities on the platform.
             </p>
          </Box>
        </Box>
      </Modal>


    </>
  )
}

export default Downloads
