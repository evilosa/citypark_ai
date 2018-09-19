import React from 'react'
import { AppBar } from 'components'
import { renderRoutes } from 'react-router-config'

function MainLayout ({ route }) {
  return (
    <div id="container">
      <AppBar />
      <div id="content">
        { route && renderRoutes(route.routes) }
      </div>
    </div>    
  )
}

export default MainLayout