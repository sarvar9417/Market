import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { ReseptionRouter } from './ReseptionRouter'

export const Reseption = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <ReseptionRouter/>
      </Router>
    </div>
  )
}
