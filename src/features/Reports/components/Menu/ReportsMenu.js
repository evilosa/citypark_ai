import React from 'react'
import { Menu, Icon, Button } from 'antd'
import { withRouter } from 'react-router-dom'
import './ReportsMenu.css'

const { SubMenu } = Menu



class ReportsMenu extends React.Component {
  
  state = {
    isCollapsed: false,
    width: 300,
  }

  toggleCollapsed = () => {
    this.setState({
      isCollapsed: !this.state.isCollapsed,
      width: !this.state.isCollapsed ? 0 : 300,
    })
  }

  menuClickHandler = (path) => {
    console.log('call onclick func')
    this.setState({
      width: 0,
    },
    () => {
      this.props.history.push(path)
    })
  }

  render() {
    const { isCollapsed, width } = this.state
    return (
      <div style={{ display: 'flex', width, height: '100vh' }}>
        {!isCollapsed && <Menu
          mode="inline"
          theme="dark"
          selectable={false}
        >
          <Menu.Item key="1">
            <Icon type="appstore" theme="filled" />
            <span>Главная</span>
          </Menu.Item>

          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="dollar-circle" theme="filled" />
                <span>Касса</span>
              </span>
            }
          >
            <Menu.Item key="5" onClick={e => this.menuClickHandler('/reports/cash')}>Ресторан</Menu.Item>
          </SubMenu>

          <SubMenu 
            key="sub2"
            title={
              <span>
                <Icon type="bank" theme="filled" />
                <span>Ресторан</span>
              </span>
            }
          >
            <Menu.Item key="9"  onClick={e => this.menuClickHandler('/reports/salesTotal')}>Сводно</Menu.Item>
            <Menu.Item key="10" onClick={e => this.menuClickHandler('/reports/salesCombined')}>Продажи</Menu.Item>
            <Menu.Item key="11" onClick={e => this.menuClickHandler('/reports/salesByCookingPlace')}>По местам</Menu.Item>
            <Menu.Item key="12" onClick={e => this.menuClickHandler('/reports/salesByCookingType')}>По видам</Menu.Item>
            <Menu.Item key="13" onClick={e => this.menuClickHandler('/reports/averageBill')}>Средний чек</Menu.Item>
            <Menu.Item key="14" onClick={e => this.menuClickHandler('/reports/minimalStore')}>Остатки товаров</Menu.Item>
            <Menu.Item key="15" onClick={e => this.menuClickHandler('/reports/cardDiscount')}>Накопления по картам</Menu.Item>
          </SubMenu>

          <SubMenu
            key="sub3"
            title={
              <span>
                <Icon type="shop" theme="filled" />
                <span>Гостиница</span>
              </span>
            }
          >
            <Menu.Item key="16" onClick={e => this.menuClickHandler('/reports/hotelSales')}>Выручка</Menu.Item>
          </SubMenu>

          <SubMenu
            key="sub4"
            title={
              <span>
                <Icon type="snippets" theme="filled" />
                <span>Отчёты</span>
              </span>
            }
          >
            <Menu.Item key="17" onClick={e => this.menuClickHandler('/reports/monthProfit')}>Прибыль</Menu.Item>
          </SubMenu>

        </Menu>}
        <Button onClick={this.toggleCollapsed} style={{ margin: 10, "background-color": "lightseagreen" }} >
          <Icon type={this.state.isCollapsed ? 'menu-unfold' : 'menu-fold'} style={{ color: 'white' }} />
        </Button>
      </div>
    )
  }
}

export default withRouter(ReportsMenu)
