import React from 'react'
import Menu from '../Menu'
import { ChartsContainer } from '../Charts'
import { ChartsHotelContainer } from '../ChartsHotel'

export class MainPageReports extends React.Component {

  state = {
    width: window.innerWidth
  }

  componentDidMount() {
    // Additionally I could have just used an arrow function for the binding `this` to the component...
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions)
  }

  updateDimensions = () => {
    if (this.state.width !== window.innerWidth) {
      document.location.reload()
    }
    this.setState({
      width: window.innerWidth
    });
  }

  render() {
    return (
      <div style={{ display: 'flex', height: '100%', backgroundColor: 'F3F3F4' }}>
        <Menu />
        <div style={{display: 'flex',  overflowX: 'auto', flexDirection: 'column'}}>
          <div><ChartsContainer /></div>
          <div><ChartsHotelContainer /></div>
        </div>
      </div>
    )
  }
} 

