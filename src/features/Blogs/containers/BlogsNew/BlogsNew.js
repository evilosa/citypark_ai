import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

import * as actions from '../../actions'
import * as types from '../../actionTypes'
import * as links from '../../links'
import { createWithProps } from '../../models'
import { PublicEditor } from 'components'

class BlogsNew extends React.Component {

  componentDidMount = () => {
    const { id } = this.props.match.params
    const { getBlogsItem } = this.props
    id && getBlogsItem(id)
  }

  render = () => {
    const { fetching, payload, errors, createBlogs } = this.props
    return (
      <PublicEditor
        handleInit={createWithProps}
        handleCreate={createBlogs}
        fetching={ fetching === types.BLOGS_CREATE || fetching === types.BLOGS_SHOW }
        item={payload}
        errors={errors}
        pathOnCreate={links.BLOGS.PATH}
      />
    )
  }
}

const mapStateToProps = state => ({
  ...state.blogs
})

const mapDispatchToProps = dispatch => bindActionCreators({
  ...actions
}, dispatch)

const ReduxWrapper = connect(mapStateToProps, mapDispatchToProps)
const WrappedComponent = ReduxWrapper(withRouter(BlogsNew))
export default WrappedComponent
