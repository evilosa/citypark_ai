import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import Icon from '@material-ui/core/Icon'
import DeleteIcon from '@material-ui/icons/Delete'

import styles from './NewsManagerStyles'
import * as actions from '../../actions'
import * as links from '../../links'

const NewsManager = ({ classes, disabled, news, deleteNews }) => {

  return (
    <div>
      <Toolbar className={classes.toolbar}>
        <Link to={links.NEWS_NEW.PATH}>
          <Button
            mini variant="fab"
            color="primary"
            aria-label="Add"
            className={classes.button}
          >
            <AddIcon fontSize="small" />
          </Button>
        </Link>
        <Link to={news ? links.NEWS.PATH + '/' + news.id : ''}>
        <Button
          disabled={disabled}
          mini variant="fab"
          color="secondary"
          aria-label="Edit"
          className={classes.button}
        >
          <Icon style={{ color: "white" }} fontSize="small">edit_icon</Icon>
        </Button>
        </Link>
        <Button
          onClick={() => window.confirm(`Вы действительно хотите удалить новость "${news.title}"?`) && deleteNews(news.id)}
          disabled={disabled}
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

const mapStateToProps = state => {
  const { payload, selectedNews } = state.news
  return {
    disabled: selectedNews === null,
    news: payload[selectedNews] ? payload[selectedNews] : null
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  ...actions
}, dispatch)

const ReduxWrapper = connect(mapStateToProps, mapDispatchToProps)
const StylesWrapper = withStyles(styles)
const WrappedComponent = ReduxWrapper(StylesWrapper(NewsManager))
export default WrappedComponent