import React from 'react'
import BreadCrumb from '../BreadCrumb'
import { Button ,DatePicker, Typography } from 'antd'
import moment from 'moment'
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

  render() {
    console.log('state', this.state)
    return (
      <div>
        <BreadCrumb title={this.props.route.title} path={this.props.route.path} />
        <div className='selectionPageContainer'>
          <div className='startField'>
            <Title level={4} type='secondary'>Начало периода</Title>
            <DatePicker 
              size='large' 
              format='DD MMMM YYYY' 
              defaultValue={this.state.startValue}
              onChange={(date, dateString) => this.changeStartDateHandler(date, dateString)}
            />
          </div>
          <div className='finishField'>
            <Title level={4} type='secondary'>Конец периода</Title>
            <DatePicker 
              size='large'
              format='DD MMMM YYYY'
              defaultValue={this.state.finishValue}
              onChange={e => this.changeDateHandler('finishValue', e.target.value)}
            />
          </div>
          <div className='buttonContainer'>
            <Button type="primary" icon="save" size='large'>
              Сформировать
            </Button>
          </div>
        </div>  
      </div>
    )
  }
}

