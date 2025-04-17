import React, { useEffect, useState } from 'react'
import AppContext from './AppContext'
import { useNavigate } from 'react-router-dom'
import { todos } from '../assets/assets'

function AppProvider({ children}) {
    const navigate = useNavigate()
    const baseUrl = ''
    const [ user, setUser ] = useState(null)
    const [ token, setToken ] = useState(null)
    const [ tasks, setTasks ] = useState(null)

    const values ={
        baseUrl,
        navigate,
        user, setUser,
        token, setToken,
        tasks, setTasks

    }
    useEffect(() =>{
      setTasks(todos)
    },[])
  return (
    <AppContext.Provider value={values}>
      { children}
    </AppContext.Provider>
  )
}

export default AppProvider
