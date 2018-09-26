import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { PublicManager, PublicList } from 'components'
import * as actions from '../../actions'
import * as links from '../../links'

class NewsList extends React.Component {

  componentDidMount = () => {
    const { fetching, payload, getNewsList } = this.props
    !fetching && !payload.length && getNewsList()
  }

  render = () => {
    const { payload, selectedNews, selectNews, deleteNews, disableButtons, news } = this.props
    return (
      <div className="height100">
        <PublicManager
          item={news}
          disableButtons={disableButtons}
          handleDelete={deleteNews}
          pathNew={links.NEWS_NEW.PATH}
          pathEdit={news ? links.NEWS.PATH + '/' + news.id : ''}
        />
        <PublicList
          payload={payload}
          selected={selectedNews}
          handleSelect={selectNews}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { fetching, selectedNews, payload } = state.news
  return {
    fetching,
    selectedNews,
    payload,
    disableButtons: selectedNews === -1,
    news: payload[selectedNews] ? payload[selectedNews] : null
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  ...actions
}, dispatch)

const ReduxWrapper = connect(mapStateToProps, mapDispatchToProps)
const WrappedComponent = ReduxWrapper(NewsList)
export default WrappedComponent