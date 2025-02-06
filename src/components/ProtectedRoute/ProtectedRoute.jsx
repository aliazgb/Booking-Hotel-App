import React, { useEffect } from 'react'
import { useAuth } from '../../Context/AuthProvider'
import { useNavigate } from 'react-router-dom'

function ProtectedRoute({children}) {
   const{isAuthenticated ,createIsDone}= useAuth()
   const navigate =useNavigate()
   useEffect(()=>{
        if (!isAuthenticated) navigate("/login")
            
        
   },[isAuthenticated,navigate,createIsDone])
  return (
    isAuthenticated&&createIsDone?children:null
  )
}

export default ProtectedRoute