import React from 'react'
import { Button ,DatePicker, Typography, TimePicker } from 'antd'
import moment, { isMoment } from 'moment'
import 'moment/locale/ru'
import './SelectionSettingsOne.css'

const { Title } = Typography

const today = moment()


export class SelectionSettingsOne extends React.Component {

  state = {
    selectedDate: today,
    selectedTime: today
  }

  changeSelectedDateHandler = (newValue) => {
    this.setState({
      selectedDate: newValue
    })
  }

  changeSelectedTimeHandler = (newValue) => {
    this.setState({
      selectedTime: newValue
    })
  }

  changeDateForComponent = () => {
    console.log('data', this.state.selectedDate._d)
  }
  

  render() {
    console.log('state', this.state)
    return (
      <div>
        <div className='selectionPageContainer'>
          <div className='dateField'>
            <Title level={4} type='secondary'>Период</Title>
            <DatePicker 
              size='large' 
              format='DD MMMM YYYY'
              placeholder='Выберите дату'
              defaultValue={this.state.selectedDate}
              onChange={(date, dateString) => this.changeSelectedDateHandler(date, dateString)}
            />
          </div>
          <div className='buttonContainer'>
            <Button
              type="primary"
              icon="save"
              size='large'
              onClick={e => this.props.getData(this.state.selectedDate)}

            >
              Сформировать
            </Button>
          </div>
        </div>  
      </div>
    )
  }
}

