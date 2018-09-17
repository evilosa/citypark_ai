import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

import * as actions from '../../actions'
import * as types from '../../actionTypes'
import { createNews } from '../../models'
import { SpinButton, ErrorBox, FileFields } from 'components'
import { base64Loader } from 'utils'

class CreateNews extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      news: createNews()
    }
  }

  handleChange = prop => {
    const { target } = prop
    this.setState(prev => ({
      ...prev,
      news: {
        ...prev.news,
        ...(() => target ? {[target.name]: target.value} : prop)()
      }
    }))
  }

  handleSubmit = () => {
    let news = { ...this.state.news } //так нужно для загрузки файлов
    const { createNews } = this.props
    base64Loader(news.blobImageAttributes)
      .then(images => {
        if (images) news.image_attributes = images[0]
        delete news.blobImageAttributes
        base64Loader(news.blobGalleriesAttributes)
          .then(galleries => {
            if (galleries) news.galleries_attributes = galleries
            delete news.blobGalleriesAttributes
            createNews(news)
          })
      })
  }

  componentDidMount = () => {
    const { id } = this.props.match.params
    const { getNewsItem } = this.props
    id && getNewsItem(id)
  }

  componentWillReceiveProps = nextProps => {
    const { news, history, errors } = nextProps
    const fetching = nextProps.fetching === types.NEWS_CREATE
    if (!fetching && !errors.msg) {
      this.setState(prev => ({
        ...prev,
        news: createNews(news)
      }))
      ErrorBox.clear()
      news && news.created && history.push('/news')
    } else {
      errors.msg && ErrorBox.create(errors.msg)
    }
  }

  render = () => {
    const { title, body, description, id } = this.state.news
    const { fetching } = this.props
    return (
      <div className="layout">
        <div className="layout-header">
          <h4>{ id ? "Изменить" : "Создать"} новость</h4>
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
            name="image_attributes"
          />
          <p className="file-fields-label">Фотогаллерея</p>
          <FileFields name="blobGalleriesAttributes" onChange={this.handleChange} />
          <SpinButton
            spin={ fetching === types.NEWS_CREATE }
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
  news: state.news.payload,
  fetching: state.news.fetching,
  errors: state.news.errors
})

const mapDispatchToProps = dispatch => bindActionCreators({
  ...actions
}, dispatch)

const ReduxWrapper = connect(mapStateToProps, mapDispatchToProps)
const WrappedComponent = ReduxWrapper(withRouter(CreateNews))
export default WrappedComponent
