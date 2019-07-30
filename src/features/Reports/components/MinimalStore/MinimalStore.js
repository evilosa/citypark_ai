import React from 'react'
import { Table } from 'antd'
import { Spin } from 'antd'
import moment from 'moment'
import numeral from 'numeral'

import Breadcrumbs from '../BreadCrumb'
import { SelectionSettingsOne } from '../SelectionSettingsOne'
import { groupBy } from '../../../../utils'

numeral.locale('ru');
numeral.defaultFormat('0,0.00')

const keyName = 'Product'

const columns = [
  {
    title: 'Показатель',
    dataIndex: keyName,
    key: keyName,
  },
  {
    title: 'Остаток',
    dataIndex: 'Count',
    width: '15%',
    key: 'Count',
  },
  {
    title: 'Минимум',
    dataIndex: 'MinimalBalance',
    width: '15%',
    key: 'MinimalBalance',
  },
  {
    title: 'Закупить',
    dataIndex: 'ToBuy',
    width: '15%',
    key: 'ToBuy',
  }
];

export class MinimalStore extends React.Component {

  state = {
    isSettingsVisible: true,
    items: []
  }
   
  componentWillReceiveProps(nextProps) {
    if (nextProps.items && this.props.items !== nextProps.items) {
      const result = groupBy(nextProps.items, keyName, ['Organization', 'Stock'], ['Count',  'MinimalBalance', 'ToBuy'])
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
    const finishFormatted=moment(finish).format('YYYYMMDDHHmmss')
    this.props.fetchMinimalStore(finishFormatted)
  }

  render() {
    console.log('props',this.props)
    if (this.props.isLoading) {
      return <div className='spinnerContainer'><Spin size="large" tip='Loading...' /></div>
    }
    if (this.props.error) {
      return <div>{this.props.error}</div>
    }
    return (
      <div style={{margin: '2rem'}}>
        <Breadcrumbs title={this.props.route.title} path={this.props.route.path} />
        {this.state.isSettingsVisible && <SelectionSettingsOne getData={this.getData} />}
          {this.state.isSettingsVisible === false && <Table 
          columns={columns} 
          dataSource={this.state.items}
          bordered={true} 
          pagination={false}
          scroll={{ y: 500 }}
          size='small'
        />}
      </div>
    )
  }  
}