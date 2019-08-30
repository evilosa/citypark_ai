import React from 'react'
import { Button ,DatePicker, Typography } from 'antd'
import moment from 'moment'
import 'moment/locale/ru'
import './SelectionSettingsTwo.css'

const { Title } = Typography
const today = moment().hour(12).minute(0).second(0)
const tomorrow = moment().add(1, 'day').hour(12).minute(0).second(0)


export class SelectionSettingsTwoForHotel extends React.Component {

  state = {
    startValue: today,
    finishValue: tomorrow
  }

  changeStartDateHandler = (newValue) => {
    this.setState({
      startValue: newValue
    })
  }

  changeFinishDateHandler = (newValue) => {
    this.setState({
      finishValue: newValue
    })
  }

  render() {
    return (
      <div>
        <div className='selectionPageContainer'>
          <div className='startField'>
            <Title level={4} type='secondary'>Начало периода</Title>
            <DatePicker 
              size='large' 
              format='DD MMMM YYYY HH:mm' 
              placeholder='Выберите дату начала периода'
              showTime={{ format: 'HH:mm' }}
              defaultValue={this.state.startValue}
              onChange={(date, dateString) => this.changeStartDateHandler(date, dateString)}
            />
          </div>
          <div className='finishField'>
            <Title level={4} type='secondary'>Конец периода</Title>
            <DatePicker 
              size='large'
              format='DD MMMM YYYY HH:mm' 
              placeholder='Выберите дату окончания периода'
              showTime={{ format: 'HH:mm' }}
              defaultValue={this.state.finishValue}
              onChange={(date, dateString) => this.changeFinishDateHandler(date, dateString)}
            />
          </div>
          <div className='buttonContainer'>
            <Button 
              icon="save"
              size='large'
              onClick={e => this.props.getData(this.state.startValue, this.state.finishValue)}
              style={{ "background-color": "lightseagreen", 'color': 'white' }}
            >
              Сформировать
            </Button>
          </div>
        </div>  
      </div>
    )
  }
}

