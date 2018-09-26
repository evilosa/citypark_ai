import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'

import styles from './PublicListStyles'

const PublicList = ({ payload, selected, handleSelect, classes }) => {

  const publicList = () => {
    return payload.length ? payload.map((item, index) => {
      const { image, title, description, created_at } = item
      return (
        <ListItem
          className="list-item"
          button
          selected={index === selected}
          onClick={() => handleSelect(index)}
          key={item.id}
        >
          <img height="100" width="100" src={image} alt="pic" />
          <div>
            <h2>{title}</h2>
            <p style={{ color: "gray" }}>{description}</p>
            <p>{created_at}</p>
          </div>
        </ListItem>
      )
    }) : null
  }

  return (
    <List className={classes.root} component="nav">
      { publicList()} 
    </List>
  )
}

PublicList.propTypes = {
  classes: PropTypes.object.isRequired,
  payload: PropTypes.array.isRequired,
  selected: PropTypes.number.isRequired,
  handleSelect: PropTypes.func.isRequired
}


const StylesWrapper = withStyles(styles)
const WrappedComponent = StylesWrapper(PublicList)
export default WrappedComponent