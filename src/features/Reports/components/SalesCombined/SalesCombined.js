import React from 'react'
import './SalesCombined.css'
import { Table } from 'antd'
import { Spin } from 'antd'
import moment from 'moment'
import numeral from 'numeral'

import Breadcrumbs from '../BreadCrumb'
import { SelectionSettingsTwo } from '../SelectionSettingsTwo'
import { groupBy } from '../../../../utils'

numeral.locale('ru');
numeral.defaultFormat('0,0.00')

const keyName = 'Product'

const columns = [
  {
    title: 'Показатель',
    dataIndex: keyName,
    key: keyName,
    width: ''
  },
  {
    title: 'Ед.',
    dataIndex: 'ProductUnit',
    key: 'ProductUnit',
    width: '10%'
  },
  {
    title: 'К-во',
    dataIndex: 'Count',
    key: 'Count',
    width: '10%'
  },
  {
    title: 'Сумма',
    dataIndex: 'Sum',
    key: 'Sum',
    width: '11%'
  },
];

export class SalesCombined extends React.Component {

  state = {
    isSettingsVisible: true,
    items: []
  }
   
  componentWillReceiveProps(nextProps) {
    if (nextProps.items && this.props.items !== nextProps.items) {
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
          {this.state.isSettingsVisible === false && 
          <div>
            <Table
            defaultExpandedRowKeys={['Organization', 'Restaurant', 'TradePlace']}
            rowKey={record => record.rowKey}
            columns={columns} 
            dataSource={this.state.items}
            bordered={true} 
            pagination={false}
            size='small'
          />
        </div>}
      </div>
    )
  }  
}
