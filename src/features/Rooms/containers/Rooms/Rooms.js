import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../../actions'
import { createRooms } from '../../models'

const MAX_VALUES = {
  single_rooms: 2,
  double_rooms: 9,
  vip_room: 1
}

class Room extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rooms: createRooms()
    }
  }

  componentDidMount = () => {
    this.props.getRooms()
  }

  componentWillReceiveProps = nextProps => {
    this.setState({
      rooms: {
        ...nextProps.rooms
      }  
    })
  }

  handleChange = (name, to) => {
    const { rooms } = this.state
    if (rooms[name] + to >= 0 && rooms[name] + to <= MAX_VALUES[name])
      this.setState(prev => ({
        rooms: {
          ...prev.rooms,
          [name]: prev.rooms[name] + to
        }
      }))
  }

  handleSubmit = () => {
    const { updateRooms } = this.props
    const { rooms } = this.state
    updateRooms(rooms)
  }

  render = () => {
    const { single_rooms, double_rooms, vip_room } = this.state.rooms
    return (
      <div id="hotel_rooms">
        <h2>Одноместные номера</h2>
        <div className="number-input">
          <button onClick={ () => this.handleChange("single_rooms", -1) }></button>
          <input 
            ref="single_rooms" 
            readOnly="true"
            name="single_rooms" 
            value={single_rooms} 
            type="number" 
          />
          <button onClick={ () => this.handleChange("single_rooms", 1) } className="plus"></button>
        </div>
        <h2>Двухместные номера</h2>
        <div className="number-input">
          <button onClick={ () => this.handleChange("double_rooms", -1) }></button>
          <input 
            ref="double_rooms" 
            readOnly="true"
            name="double_rooms" 
            value={double_rooms} 
            type="number" 
          />
          <button onClick={ () => this.handleChange("double_rooms", 1)  } className="plus"></button>
        </div>
        <h2>Vip номер</h2>
        <div className="number-input">
          <button onClick={ () => this.handleChange("vip_room", -1) }></button>
          <input 
            ref="vip_room" 
            readOnly="true"
            name="vip_room" 
            value={vip_room} 
            type="number" 
          />
          <button onClick={ () => this.handleChange("vip_room", 1) } className="plus"></button>
        </div>
        <button className="btn" onClick={this.handleSubmit}>Сохранить</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  rooms: state.rooms.payload
})

const mapDispatchToProps = dispatch => bindActionCreators({
  ...actions
}, dispatch)

const ReduxWrapper = connect(mapStateToProps, mapDispatchToProps)
const WrappedComponent = ReduxWrapper(Room)
export default WrappedComponent