import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const ListItem = ({ id, link, title, image, description, created_at, deleteItem }) =>
  <div className="news-list-item">
    <img height="100" width="100" src={image} alt="pic" />
    <div>
      <p style={{fontWeight: "bold"}}>{created_at}</p>
      <Link to={link}>{title}</Link>
      <p style={{color: "gray"}}>{description}</p>
    </div>
    <i className="material-icons" onClick={() => deleteItem(id)}>delete</i>
  </div>

ListItem.propTypes = {
  id: PropTypes.number.isRequired,
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string,
  created_at: PropTypes.string.isRequired,
  deleteItem: PropTypes.func.isRequired
}

export default ListItem
