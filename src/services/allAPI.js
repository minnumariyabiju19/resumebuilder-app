import axiosService from "../api/axiosService";

// saveResumeAPI-called by component userinput when finish button clicked

export const saveResumeAPI=async(resumeDetails)=>{
    return await axiosService('POST','/resumes',resumeDetails)
}

//viewResume -called by view component when resume added
export const viewResumeAPI=async(resumeId)=>{
    return await axiosService('GET',`/resumes/${resumeId}`,{})
}

//getAllResumeAPI-called by allResumes when resume added
export const getAllResumeAPI=async()=>{
    return await axiosService('GET',`/resumes/`,{})
}

//deleteresumeAPI-called by allResumes Component when delete button clicked
export const deleteResumeAPI=async(resumeId)=>{
     return await axiosService('DELETE',`/resumes/${resumeId}`,{})
}

//downloadResumeAPI=-called by component view when download button clicked
export const downloadResumeAPI=async(resumeDetails)=>{
    return await axiosService('POST','/downloads', resumeDetails)
}
//getalldownloadResumeAPI=-called by component all downloads component when component loading
export const getAlldownloadResumesAPI=async()=>{
    return await axiosService('GET','/downloads', {})
}

//updateResumeAPI-called by component edit when update button click
export const updateResumeAPI=async(resumeId,resumeDetails)=>{
    return await axiosService('Put',`/resumes/${resumeId}`, resumeDetails)
}