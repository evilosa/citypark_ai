import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'

import * as actions from '../../actions'

class BlogsList extends React.Component {

  newsList = () => {
    /*const { blogs, deleteBlog } = this.props
    return blogs.length ? blogs.map(blog =>
      <ListItem deleteItem={deleteBlog} key={blog.id} link={'/blogs/' + blog.id} {...blog} />
    ) : null*/
  }

  componentDidMount = () => {
    const { fetching, blogs, getBlogsList } = this.props
    !fetching && !blogs.length && getBlogsList()
  }

  render = () =>
    <div>
      <div id="news-list-header">
        <h3>Блог шеф-повара</h3>
        <Link to="/blogs/create">
          <div className="btn">Добавить</div>
        </Link>
      </div>
      { this.newsList() }
    </div>
}

const mapStateToProps = state => ({
  fetching: state.blogs.fetching,
  blogs: state.blogs.payload
})

const mapDispatchToProps = dispatch => bindActionCreators({
  ...actions
}, dispatch)

const ReduxWrapper = connect(mapStateToProps, mapDispatchToProps)
const WrappedComponent = ReduxWrapper(BlogsList)
export default WrappedComponent
