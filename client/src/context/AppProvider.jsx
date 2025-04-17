import React, { useState } from 'react'
import AppContext from './AppContext'
import { useNavigate } from 'react-router-dom'

function AppProvider({ children}) {
    const navigate = useNavigate()
    const baseUrl = ''
    const [ user, setUser ] = useState(null)
    const [ token, setToken ] = useState(null)

    const values ={
        baseUrl,
        navigate,
        user, setUser,
        token, setToken

    }
  return (
    <AppContext.Provider value={values}>
      { children}
    </AppContext.Provider>
  )
}

export default AppProvider
