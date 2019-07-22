import React from 'react'
import { Button ,DatePicker, Typography } from 'antd'
import moment from 'moment'
import 'moment/locale/ru'
import './SelectionSettingsOne.css'

const { Title } = Typography

const today = moment()


export class SelectionSettingsOne extends React.Component {

  state = {
    selectedDate: today
  }

  changeSelectedDateHandler = (newValue) => {
    this.setState({
      selectedDate: newValue
    })
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
              format='DD MMMM YYYY, hh:mm' 
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

