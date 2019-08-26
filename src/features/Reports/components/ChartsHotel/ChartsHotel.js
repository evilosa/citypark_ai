import React from 'react'
import { Line } from 'react-chartjs-2'
import moment from 'moment'
import 'moment/locale/ru'
import numeral from 'numeral'
import * as _ from 'lodash'
import { AdminResource } from 'features/User/containers'

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
  },
  responsive: false,
  maintainAspectRatio: false
}
 
export class ChartsHotel extends React.Component {

  state = {
    startPeriod: moment().subtract(30, 'days').format('YYYYMMDDHHmmss'),
    endPeriod: moment().format('YYYYMMDDHHmmss'),
  }

  componentDidMount () {
    this.props.fetchHotelSalesForCharts(this.state.startPeriod, this.state.endPeriod)
  }

  separateSalesInHotel = () => {
    let rowDate
    let result = _.uniqBy(this.props.items, 'Date')
    let dateArray = result.map(currentItem => {
      return currentItem.Date
    })

    rowDate = this.props.items.map(currentRow => {
      return currentRow.Date
    })
    const tempRes = dateArray.map(currentDate => {
         
            const sum = this.props.items.reduce((accum, currentItem) => {
              return accum + (currentItem.Date == currentDate ? currentItem.Sum : 0)
            }, 0)
            return sum
        })
    return tempRes
  }

  separateDatesInHotel = () => {
    let result = _.uniqBy(this.props.items, 'Date')
    let anotherResult = result.map(currentItem => {
      return currentItem.Date
    })
    return anotherResult
  }
  
  getData = () => {
    return {
      labels: this.separateDatesInHotel(),
      datasets: [
        {
          label: "Выручка по гостинице",
          data: this.separateSalesInHotel(),
          fill: false,
          borderColor: 'lightseagreen'
        }]
    }
  }

  getYesterdayProfit = () => {
    const yesterday = moment().subtract(1, 'day').format('DD.MM.YYYY')
    let result = this.props.items.filter(currentItem => currentItem.Date === yesterday)
      let sum = result.reduce((accum, currentItem) => {
        return accum + currentItem.Sum
      }, 0)
    return numeral(sum).format()
  }

  getWeekProfit = () => {
    let result = this.separateSalesInHotel()
    let anotherResult = _.slice(result, [result.length - 7], [result.length])
      let sum = anotherResult.reduce((accum, currentItem) => {
        return accum + currentItem
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
    const today = moment().format('DD.MM.YYYY')
    let result = this.props.items.filter(currentItem => currentItem.Date === today)
      let sum = result.reduce((accum, currentItem) => {
        return accum + currentItem.Sum
      }, 0)
    return numeral(sum).format()
  }

  render () {
    return (
      <AdminResource>
        <div style={{ marginTop: '4rem', marginLeft: '2rem', maxWidth: '90%'}}>
          <div style={{ fontSize: '1rem', marginBottom: '1rem'}}>
            {this.getTodayProfit()}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center'}}>
            <Line data={this.getData()} options={chartOptions} width={window.innerWidth > 400 ? 550 : 330} height={window.innerWidth > 400 ? 300 : 270} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '2rem', marginBottom: '2rem'}}>
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
      </AdminResource>
    )
  }
}