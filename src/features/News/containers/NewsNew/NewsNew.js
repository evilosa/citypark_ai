import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../../actions'
import * as types from '../../actionTypes'
import * as links from '../../links'
import { createWithProps } from '../../models'
import { PublicEditor } from 'components'

class NewsNew extends React.Component {

  componentDidMount = () => {
    const { id } = this.props.match.params
    const { getNewsItem } = this.props
    id && getNewsItem(id)
  }

  render = () => {
    const { fetching, payload, errors, createNews } = this.props
    return (
      <PublicEditor
        handleInit={createWithProps}
        handleCreate={createNews}
        fetching={ fetching === types.NEWS_CREATE || fetching === types.NEWS_SHOW }
        item={payload}
        errors={errors}
        pathOnCreate={ links.NEWS.PATH }
      />
    )
  }
}

const mapStateToProps = state => ({
  ...state.news
})

const mapDispatchToProps = dispatch => bindActionCreators({
  ...actions
}, dispatch)

const ReduxWrapper = connect(mapStateToProps, mapDispatchToProps)
const WrappedComponent = ReduxWrapper(NewsNew)
export default WrappedComponent