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

const keyName = 'Kassa'

const columns = [
  {
    title: 'Показатель',
    dataIndex: keyName,
    key: keyName,
  },
  {
    title: 'Сумма',
    dataIndex: 'Sum',
    width: '20%',
    key: 'Sum',
  }
];

export class Cash extends React.Component {

  state = {
    isSettingsVisible: true,
    items: []
  }
   
  componentWillReceiveProps(nextProps) {
    if (nextProps.items && this.props.items !== nextProps.items) {
      const result = groupBy(nextProps.items, keyName, ['Organization'], ['Sum'])
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
    this.props.fetchCash(finishFormatted)
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
        {this.state.isSettingsVisible && <SelectionSettingsOne getData={this.getData} />}
          {this.state.isSettingsVisible === false && <Table 
          columns={columns} 
          dataSource={this.state.items}
          bordered={true} 
          pagination={false}
          size='small'
        />}
      </div>
    )
  }  
}