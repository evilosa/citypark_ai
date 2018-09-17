import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

import * as actions from '../../actions'
import * as types from '../../actionTypes'
import { createBlogs } from '../../models'
import { SpinButton, ErrorBox, FileFields } from 'components'
import { base64Loader } from 'utils'

class CreateBlogs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: createBlogs()
    }
  }

  handleChange = prop => {
    const { target } = prop
    this.setState(prev => ({
      ...prev,
      blogs: {
        ...prev.blogs,
        ...(() => target ? {[target.name]: target.value} : prop)()
      }
    }))
  }

  handleSubmit = () => {
    let blogs = { ...this.state.blogs } //так нужно для загрузки файлов
    const { createBlogs } = this.props
    base64Loader(blogs.blobImageAttributes)
      .then(images => {
        if (images) blogs.image_attributes = images[0]
        delete blogs.blobImageAttributes
        base64Loader(blogs.blobGalleriesAttributes)
          .then(galleries => {
            if (galleries) blogs.galleries_attributes = galleries
            delete blogs.blobGalleriesAttributes
            createBlogs(blogs)
          })
      })
  }

  componentDidMount = () => {
    const { id } = this.props.match.params
    const { getBlogsItem } = this.props
    id && getBlogsItem(id)
  }

  componentWillReceiveProps = nextProps => {
    const { blogs, history, errors } = nextProps
    const fetching = nextProps.fetching === types.BLOGS_CREATE
    if (!fetching && !errors.msg) {
      this.setState(prev => ({
        ...prev,
        blogs: createBlogs(blogs)
      }))
      ErrorBox.clear()
      blogs && blogs.created && history.push('/blogs')
    } else {
      errors.msg && ErrorBox.create(errors.msg)
    }
  }

  render = () => {
    const { title, body, description, id } = this.state.blogs
    const { fetching } = this.props
    return (
      <div className="layout">
        <div className="layout-header">
          <h4>{ id ? "Изменить" : "Создать"}</h4>
        </div>
        <div>
          <p>Заголовок</p>
          <input
            onChange={this.handleChange}
            className="inpt"
            type="text"
            name="title"
            value={title}
          />
          <p>Описание</p>
          <textarea
            onChange={this.handleChange}
            rows="1"
            name="description"
            value={description}
          />
          <p>Содержание</p>
          <textarea
            onChange={this.handleChange}
            rows="20"
            name="body"
            value={body}
          />
          <p className="file-fields-label">Фото</p>
          <input
            onChange={event => this.handleChange({ blobImageAttributes: [event.target.files[0]] })}
            type="file"
            name="blobImageAttributes"
          />
          <p className="file-fields-label">Фотогаллерея</p>
          <FileFields name="blobGalleriesAttributes" onChange={this.handleChange} />
          <SpinButton
            spin={ fetching === types.BLOGS_CREATE }
            className="btn"
            onClick={this.handleSubmit}
          >Отправить
          </SpinButton>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  blogs: state.blogs.payload,
  fetching: state.blogs.fetching,
  errors: state.blogs.errors
})

const mapDispatchToProps = dispatch => bindActionCreators({
  ...actions
}, dispatch)

const ReduxWrapper = connect(mapStateToProps, mapDispatchToProps)
const WrappedComponent = ReduxWrapper(withRouter(CreateBlogs))
export default WrappedComponent
