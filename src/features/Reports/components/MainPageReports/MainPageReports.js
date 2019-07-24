import React from 'react'
import Menu from '../Menu'
import { ChartsContainer } from '../Charts'

export const MainPageReports = () => {
  return (
    <div style={{ display: 'flex', backgroundColor: 'F3F3F4' }}>
      <Menu />
      <div><ChartsContainer /></div>
    </div>
  )
} 

