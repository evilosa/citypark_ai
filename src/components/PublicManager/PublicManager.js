import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import Icon from '@material-ui/core/Icon'
import DeleteIcon from '@material-ui/icons/Delete'

import styles from './PublicManagerStyles'

const PublicManager = ({ pathNew, pathEdit, classes, disableButtons, item, handleDelete }) => {

  return (
    <div>
      <Toolbar className={classes.toolbar}>
        <Link to={pathNew}>
          <Button
            mini variant="fab"
            color="primary"
            aria-label="Add"
            className={classes.button}
          >
            <AddIcon fontSize="small" />
          </Button>
        </Link>
        <Link to={pathEdit}>
          <Button
            disabled={disableButtons}
            mini variant="fab"
            color="secondary"
            aria-label="Edit"
            className={classes.button}
          >
            <Icon style={{ color: "white" }} fontSize="small">edit_icon</Icon>
          </Button>
        </Link>
        <Button
          onClick={() => window.confirm(`Вы действительно хотите удалить "${item.title}"?`) && handleDelete(item.id)}
          disabled={disableButtons}
          mini variant="fab"
          aria-label="Delete"
          className={classes.button}
        >
          <DeleteIcon />
        </Button>
      </Toolbar>
    </div>
  )
}

PublicManager.propTypes = {
  classes: PropTypes.object.isRequired,
  pathEdit: PropTypes.string.isRequired,
  pathNew: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
  disableButtons: PropTypes.bool,
  item: PropTypes.object.isRequired
}

const StylesWrapper = withStyles(styles)
const WrappedComponent = StylesWrapper(PublicManager)
export default WrappedComponent