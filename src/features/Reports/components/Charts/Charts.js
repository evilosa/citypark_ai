import React from 'react'
import { Line } from 'react-chartjs-2'
import moment from 'moment'
import 'moment/locale/ru'
import numeral from 'numeral'
import { fetchCardDiscount } from '../../actions/restaurant/fetchCardDiscount'

numeral.locale('ru');
numeral.defaultFormat('0,0.00')

const chartOptions = {
  legend: {
    display: true,
    position: 'bottom',
    labels: {
      fontColor: 'black'
    }
  },
  scales: {
    xAxes: [{
      gridLines: {
        display: false,
        color: "black"
      }
    }]
  }
}
 
export class Charts extends React.Component {

  state = {
    startPeriod: moment().subtract(30, 'days').format('YYYYMMDDHHmmss'),
    endPeriod: moment().format('YYYYMMDDHHmmss')
  }

  componentDidMount () {
    this.props.fetchDataForCharts(this.state.startPeriod, this.state.endPeriod)
  }

  separateSalesInSummerCafe = (value) => {
      let result = this.props.items.filter(currentItem => currentItem.TradePlace === value)
      let anotherResult = result.map(currentItem => {
        return currentItem.Sum
      })
    return anotherResult
  }

  separateDatesInSummerCafe = () => {
    let result = this.props.items.filter(currentItem => currentItem.TradePlace === "Летнее кафе")
      let anotherResult = result.map(currentItem => {
        return currentItem.Date
      })
    return anotherResult
  }
  
  getData = () => {
    return {
      labels: this.separateDatesInSummerCafe(),
      datasets: [
        {
          label: "Выручка по летнему кафе",
          data: this.separateSalesInSummerCafe('Летнее кафе'),
          fill: false,
          borderColor: 'lightseagreen'
        },
        {
          label: "Выручка по ресторану",
          data: this.separateSalesInSummerCafe('Ресторан'),
          fill: false,
          borderColor: 'orange'
        }
      ]
    }
  }

  getYesterdayProfit = () => {
    const yesterday = moment().subtract(20, 'day').format('DD.MM.YYYY')
    let result = this.props.items.filter(currentItem => currentItem.Date === yesterday)
      let sum = result.reduce((accum, currentItem) => {
        return accum + currentItem.Sum
      }, 0)
      return numeral(sum).format()
  }

  getWeekProfit = () => {
    let result = this.props.items.slice(0, 14)
      let sum = result.reduce((accum, currentItem) => {
        return accum + currentItem.Sum
      }, 0)
    return numeral(sum).format()
  }

  getMonthProfit = () => {
    let result = this.props.items.reduce((accum, currentItem) => {
      return accum + currentItem.Sum
    }, 0)
    return numeral(result).format()
  }

  getTodayProfit = () => {
    const today = moment().subtract(30, 'day').format('DD.MM.YYYY')
    let result = this.props.items.filter(currentItem => currentItem.Date === today)
      let sum = result.reduce((accum, currentItem) => {
        return accum + currentItem.Sum
      }, 0)
    return numeral(sum).format()
    console.log('today', result)
  }

  render () {
    return (
      <div style={{ marginTop: '5rem'}}>
        <div style={{ fontSize: '2rem', marginBottom: '2rem'}}>
          {this.getTodayProfit()}
        </div>
        <Line data={this.getData()} options={chartOptions} width={700} height={300} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem'}}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h3>Вчера</h3>
            {this.getYesterdayProfit()}
          </div>
          <div>
            <h3>7 дней</h3>
            {this.getWeekProfit()}
          </div>
          <div>
            <h3>Месяц</h3>
            {this.getMonthProfit()}
          </div>
        </div>
      </div>
    )
  }
}

