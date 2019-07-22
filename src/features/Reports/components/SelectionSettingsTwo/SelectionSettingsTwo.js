import React from 'react'
import BreadCrumb from '../BreadCrumb'
import { Button ,DatePicker, Typography } from 'antd'
import moment from 'moment'
import 'moment/locale/ru'
import './SelectionSettingsTwo.css'

const { Title } = Typography
const today = moment()
const yesterday = moment().subtract('day', 1)

export class SelectionSettingsTwo extends React.Component {

  state = {
    startValue: yesterday,
    finishValue: today
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
    console.log('props', this.props)
    return (
      <div>
        {/* <BreadCrumb title={this.props.route.title} path={this.props.route.path} /> */}
        <div className='selectionPageContainer'>
          <div className='startField'>
            <Title level={4} type='secondary'>Начало периода</Title>
            <DatePicker 
              size='large' 
              format='DD MMMM YYYY, hh:mm' 
              placeholder='Выберите дату начала периода'
              defaultValue={this.state.startValue}
              onChange={(date, dateString) => this.changeStartDateHandler(date, dateString)}
            />
          </div>
          <div className='finishField'>
            <Title level={4} type='secondary'>Конец периода</Title>
            <DatePicker 
              size='large'
              format='DD MMMM YYYY, hh:mm' 
              placeholder='Выберите дату окончания периода'
              defaultValue={this.state.finishValue}
              onChange={(date, dateString) => this.changeFinishDateHandler(date, dateString)}
            />
          </div>
          <div className='buttonContainer'>
            <Button 
              type="primary"
              icon="save"
              size='large'
              onClick={e => this.props.getData(this.state.startValue, this.state.finishValue)}
            >
              Сформировать
            </Button>
          </div>
        </div>  
      </div>
    )
  }
}

