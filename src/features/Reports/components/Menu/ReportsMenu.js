import React from 'react'
import { Menu, Icon, Button } from 'antd'
import './ReportsMenu.css'

const { SubMenu } = Menu



class ReportsMenu extends React.Component {
  
  state = {
    collapsed: false,
  }

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }

  render() {
    return (
      <div style={{ display: 'flex', width: 300, height: '100vh' }}>
        <Menu
          // defaultSelectedKeys={['1']}
          // defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          inlineCollapsed={this.state.collapsed}
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
            <Menu.Item key="5">Ресторан</Menu.Item>
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
            <Menu.Item key="9">Сводно</Menu.Item>
            <Menu.Item key="10">Продажи</Menu.Item>
            <Menu.Item key="11">По местам</Menu.Item>
            <Menu.Item key="12">По видам</Menu.Item>
            <Menu.Item key="13">Средний чек</Menu.Item>
            <Menu.Item key="14">Остатки товаров</Menu.Item>
            <Menu.Item key="15">Накопления по картам</Menu.Item>
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
            <Menu.Item key="16">Выручка</Menu.Item>
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
            <Menu.Item key="17">Прибыль</Menu.Item>
          </SubMenu>

        </Menu>
        <Button type="primary" onClick={this.toggleCollapsed} style={{ margin: 10 }}>
          <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
        </Button>
      </div>
    )
  }
}

export default ReportsMenu
