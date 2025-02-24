"use client"
import React from 'react'
import  ThemeProvider, { ThemeType }  from './theme-provider'

type Props = {
    children : React.ReactNode
    initialTheme : ThemeType
}

const ClientProvider = ({children, initialTheme}: Props) => {
  return (
    <ThemeProvider initialTheme={initialTheme} >
        {children}
    </ThemeProvider>
  )
}

export default ClientProvider