import React from 'react'
import './SalesCombined.css'
import { Table } from 'antd'
import { Spin } from 'antd'
import uuid from 'uuid'
import moment from 'moment'
import numeral from 'numeral'
import locales from 'numeral/locales'

import Breadcrumbs from '../BreadCrumb'
import { SelectionSettingsTwo } from '../SelectionSettingsTwo'
import { groupBy } from '../../../../utils'

numeral.locale('ru');
numeral.defaultFormat('0,0.00')


const fakeData = [
  {
    number: 1,
    organization: 'ООО "Олимп"',
    restaurantСomplex: '"Сити Парк"',
    hall: 'Летнее кафе',
    placeOfPreparation: 'Шашлычная',
    name: 'Шашлык',
    unit: 'Кг',
    count: 1,
    sum: 1400
  },
  {
    number: 2,
    organization: 'ООО "Олимп"',
    restaurantСomplex: '"Сити Парк"',
    hall: 'Летнее кафе',
    placeOfPreparation: 'Шашлычная',
    name: 'Шашлык',
    unit: 'Кг',
    count: 1,
    sum: 1400
  },
  {
    number: 3,
    organization: 'ООО "Олимп"',
    restaurantСomplex: '"Сити Парк"',
    hall: 'Летнее кафе',
    placeOfPreparation: 'Кухня',
    name: 'Суп Поло',
    unit: 'Порция',
    count: 1,
    sum: 300
  },
  {
    number: 4,
    organization: 'ООО "Олимп"',
    restaurantСomplex: '"Сити Парк"',
    hall: 'Ресторан',
    placeOfPreparation: 'Шашлычная',
    name: 'Шашлык',
    unit: 'Кг',
    count: 1,
    sum: 1400
  },
  {
    number: 5,
    organization: 'ООО "Олимп"',
    restaurantСomplex: '"Сити Парк"',
    hall: 'Летнее кафе',
    placeOfPreparation: 'Шашлычная',
    name: 'Шашлык',
    unit: 'Кг',
    count: 1,
    sum: 1400
  },
  {
    number: 6,
    organization: 'ООО "Олимп"',
    restaurantСomplex: '"Сити Парк"',
    hall: 'Ресторан',
    placeOfPreparation: 'Кухня',
    name: 'Суп Поло',
    unit: 'Порция',
    count: 1,
    sum: 300
  },
  {
    number: 7,
    organization: 'ООО "Олимп"',
    restaurantСomplex: '"Сити Парк"',
    hall: 'Ресторан',
    placeOfPreparation: 'Шашлычная',
    name: 'Шашлык',
    unit: 'Кг',
    count: 1,
    sum: 1400
  },
  {
    number: 8,
    organization: 'ООО "Олимп"',
    restaurantСomplex: '"Сити Парк"',
    hall: 'Летнее кафе',
    placeOfPreparation: 'Кухня',
    name: 'Суп Поло',
    unit: 'Порция',
    count: 1,
    sum: 300
  },
  {
    number: 9,
    organization: 'ООО "Олимп"',
    restaurantСomplex: '"Сити Парк"',
    hall: 'Летнее кафе',
    placeOfPreparation: 'Шашлычная',
    name: 'Шашлык',
    unit: 'Кг',
    count: 1,
    sum: 1400
  },
  {
    number: 10,
    organization: 'ООО "Олимп"',
    restaurantСomplex: '"Сити Парк"',
    hall: 'Ресторан',
    placeOfPreparation: 'Кухня',
    name: 'Суп Поло',
    unit: 'Порция',
    count: 1,
    sum: 300
  },
  {
    number: 11,
    organization: 'ООО "Олимп"',
    restaurantСomplex: '"Сити Парк"',
    hall: 'Летнее кафе',
    placeOfPreparation: 'Шашлычная',
    name: 'Шашлык',
    unit: 'Кг',
    count: 1,
    sum: 1400
  },
  {
    number: 12,
    organization: 'ООО "Олимп"',
    restaurantСomplex: '"Сити Парк"',
    hall: 'Ресторан',
    placeOfPreparation: 'Шашлычная',
    name: 'Шашлык',
    unit: 'Кг',
    count: 1,
    sum: 1400
  },
  {
    number: 13,
    organization: 'ООО "Олимп"',
    restaurantСomplex: '"Сити Парк"',
    hall: 'Ресторан',
    placeOfPreparation: 'Кухня',
    name: 'Суп Поло',
    unit: 'Порция',
    count: 1,
    sum: 300
  },
  {
    number: 14,
    organization: 'ООО "Олимп"',
    restaurantСomplex: '"Сити Парк"',
    hall: 'Летнее кафе',
    placeOfPreparation: 'Шашлычная',
    name: 'Шашлык',
    unit: 'Кг',
    count: 1,
    sum: 1400
  }
]

const keyName = 'Product'

const columns = [
  {
    title: 'Показатель',
    dataIndex: keyName,
    key: keyName,
  },
  {
    title: 'Единица измерения',
    dataIndex: 'ProductUnit',
    key: 'ProductUnit',
    width: '12%'
  },
  {
    title: 'Количество',
    dataIndex: 'Count',
    key: 'Count',
    width: '12%',
  },
  {
    title: 'Сумма',
    dataIndex: 'Sum',
    width: '28%',
    key: 'Sum',
  },
];

export class SalesCombined extends React.Component {

  state = {
    isSettingsVisible: true,
    items: []
  }
   
  componentWillReceiveProps(nextProps) {
    if (nextProps.items && this.props.items != nextProps.items) {
      const result = groupBy(nextProps.items, keyName, ['Organization', 'Restaurant', 'TradePlace', 'CookingPlace'], ['Sum', 'Count'])
      this.setState({
        items: result
      })
    }
  }
  

  getData = async (start, finish) => {
    this.setState({
      isSettingsVisible: false
    })

    // convert to 1c dates
    const startFormatted=moment(start).format('YYYYMMDDHHmmss')
    const finishFormatted=moment(finish).format('YYYYMMDDHHmmss')
    this.props.fetchSalesCombined(startFormatted, finishFormatted)
  }

  render() {
    if (this.props.isLoading) {
      return <div className='spinnerContainer'><Spin size="large" tip='Loading...' /></div>
    }
    if (this.props.error) {
      return <div>{this.props.error}</div>
    }
    return (
      <div style={{margin: '2rem'}}>
        <Breadcrumbs title={this.props.route.title} path={this.props.route.path} />
        {this.state.isSettingsVisible && <SelectionSettingsTwo getData={this.getData} />}
          {this.state.isSettingsVisible === false && <Table 
          columns={columns} 
          dataSource={this.state.items}
          bordered={true} 
          pagination={false}
          scroll={{ y: 500 }}
        />}
      </div>
    )
  }  
}
