import React from 'react'
import { Button ,DatePicker, Typography, TimePicker } from 'antd'
import moment, { isMoment } from 'moment'
import 'moment/locale/ru'
import styles from './SelectionSettingsOne.module.scss'

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
  }
  

  render() {
    return (
      <div>
        <div className={styles.selectionPageContainer}>
          <div className={styles.dateField}>
            <Title level={4} type='secondary'>Период</Title>
            <DatePicker 
              size='default' 
              format='DD MMMM YYYY'
              placeholder='Выберите дату'
              defaultValue={this.state.selectedDate}
              onChange={(date, dateString) => this.changeSelectedDateHandler(date, dateString)}
            />
          </div>
          <div>
            <Button
              icon="save"
              size='default'
              onClick={e => this.props.getData(this.state.selectedDate)}
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

