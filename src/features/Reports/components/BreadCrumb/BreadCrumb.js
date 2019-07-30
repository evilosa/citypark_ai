import React from 'react'
import { Breadcrumb, Typography } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import styles from './BreadCrumb.module.scss'

const { Title } = Typography

const Breadcrumbs = (props) => {

  let titles = props.title.split(', ');
  
  const renderItem = () => {
    let pathes = props.path.split('/')
    pathes.shift()
    let resultPath = ''
    pathes = pathes.map(currentItem => {
      return resultPath += `/${currentItem}`
    })

    let result = [];
    for (let i=0; i < titles.length; i++) {
      result.push(
        <Breadcrumb.Item>
          <Link to={pathes[i]}>{titles[i]}</Link>
        </Breadcrumb.Item>
      )
    }

    return result;
  }
 
  return (
    <div className={styles.breadCrumbContainer}>
      <div className={styles.breadCrumb}>
        <Title level={4}>{titles[titles.length-1]}</Title>
        <Breadcrumb>
          {renderItem()}
        </Breadcrumb>
      </div>
    </div>
  )
}

export default withRouter(Breadcrumbs)
  
