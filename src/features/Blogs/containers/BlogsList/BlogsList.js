import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../../actions'
import { PublicManager, PublicList } from 'components'
import * as links from '../../links'

class BlogsList extends React.Component {

  componentDidMount = () => {
    const { fetching, payload, getBlogsList } = this.props
    !fetching && !payload.length && getBlogsList()
  }

  handleDoubleClick = () => {
    const { history, blog } = this.props
    blog && history.push(links.BLOGS.PATH + '/' + blog.id)
  }

  render = () => {
    const { payload, selectedBlog, selectBlog, deleteBlog, disableButtons, blog } = this.props
    return (
      <div className="height100">
        <PublicManager
          item={blog}
          disableButtons={disableButtons}
          handleDelete={deleteBlog}
          pathNew={links.BLOGS_NEW.PATH}
          pathEdit={blog ? links.BLOGS.PATH + '/' + blog.id : ''}
        />
        <PublicList
          payload={payload}
          selected={selectedBlog}
          handleSelect={selectBlog}
          handleDoubleClick={this.handleDoubleClick}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { fetching, selectedBlog, payload } = state.blogs
  return {
    fetching,
    selectedBlog,
    payload,
    disableButtons: selectedBlog === -1,
    blog: payload[selectedBlog] ? payload[selectedBlog] : null
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  ...actions
}, dispatch)

const ReduxWrapper = connect(mapStateToProps, mapDispatchToProps)
const WrappedComponent = ReduxWrapper(BlogsList)
export default WrappedComponent