import React from 'react'
import Menu from '../Menu'
import { ChartsContainer } from '../Charts'
import { ChartsHotelContainer } from '../ChartsHotel'

export const MainPageReports = () => {
  return (
    <div style={{ display: 'flex', backgroundColor: 'F3F3F4' }}>
      <Menu />
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <div ><ChartsContainer /></div>
        <div><ChartsHotelContainer /></div>
      </div>
      
    </div>
  )
} 

