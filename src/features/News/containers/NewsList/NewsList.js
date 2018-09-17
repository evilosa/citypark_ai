import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'

import * as actions from '../../actions'
import { ListItem } from 'components'

class NewsList extends React.Component {

  newsList = () => {
    const { news, deleteNews } = this.props
    return news.length ? news.map(news =>
      <ListItem deleteItem={deleteNews} key={news.id} link={'/news/' + news.id} {...news} />
    ) : null
  }

  componentDidMount = () => {
    const { fetching, news, getNewsList } = this.props
    !fetching && !news.length && getNewsList()
  }

  render = () =>
    <div>
      <div id="news-list-header">
        <h3>Новости</h3>
        <Link to="/news/create">
          <div className="btn">Добавить новость</div>
        </Link>
      </div>
      { this.newsList() }
    </div>
}

const mapStateToProps = state => ({
  fetching: state.news.fetching,
  news: state.news.payload
})

const mapDispatchToProps = dispatch => bindActionCreators({
  ...actions
}, dispatch)

const ReduxWrapper = connect(mapStateToProps, mapDispatchToProps)
const WrappedComponent = ReduxWrapper(NewsList)
export default WrappedComponent
