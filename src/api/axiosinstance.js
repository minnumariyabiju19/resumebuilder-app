import axios from 'axios'

const axiosInstance=axios.create({
    baseURL:"https://rb-server-1qui.onrender.com",
   // baseURL:"http://localhost:3000",
    timeout:5000
})
  //global error handling
  axiosInstance.interceptors.response.use(
    (response)=>{
        console.log("Response Received")
        return response
    },
    (error)=>{
        if(error.response){
            const status=error.response.status
            if(status==401){
                console.log("Unauthorised Access-Redirect to Login Page")
            }else if(status==400){
                console.log("API not found")
            }else if(status==500){
                console.log('Something went wrong...Try again later!!!')
            }else if(error.request){
                console.log("No response from Server")}
                else{
                   console.log("Error" +error.message)
                }
                return Promise.reject(error)
        
            }
        }
    
  )




 export default axiosInstance