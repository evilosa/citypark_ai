import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'

import NewsManager from '../NewsManager'
import styles from './NewsListStyles'
import * as actions from '../../actions'

class NewsList extends React.Component {

  newsList = () => {
    const { news, selectedNews, selectNews } = this.props
    return news.length ? news.map((news, index) => {
      const { image, title, description, created_at } = news
      return (
        <ListItem
        className="list-item"
          button
          selected={index === selectedNews}
          onClick={() => selectNews(index)}
          key={news.id}
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

  componentDidMount = () => {
    const { fetching, news, getNewsList } = this.props
    !fetching && !news.length && getNewsList()
  }

  render = () => {
    const { classes } = this.props
    return (
      <div className="height100">
        <NewsManager />
        <List className={classes.root} component="nav">
          {this.newsList()}
        </List>
      </div>
    )
  }
}

NewsList.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  const { fetching, selectedNews, payload } = state.news
  return {
    fetching,
    selectedNews,
    news: payload
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  ...actions
}, dispatch)

const ReduxWrapper = connect(mapStateToProps, mapDispatchToProps)
const StylesWrapper = withStyles(styles)
const WrappedComponent = ReduxWrapper(StylesWrapper(NewsList))
export default WrappedComponent