import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import { withStyles } from '@material-ui/core/styles'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

import styles from './NewsNewStyles'
import * as actions from '../../actions'
import * as types from '../../actionTypes'
import { createNews } from '../../models'
import { ErrorBox, FileFields } from 'components'
import { base64Loader } from 'utils'

class NewsNew extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      editorState: EditorState.createEmpty(),
      news: createNews()
    }
  }

  onEditorStateChange = editorState => this.setState({ editorState })

  handleChange = prop => {
    const { target } = prop
    this.setState(prev => ({
      ...prev,
      news: {
        ...prev.news,
        ...(() => target ? { [target.name]: target.value } : prop)()
      }
    }))
  }

  handleSubmit = () => {
    const { editorState } = this.state
    let news = {
      ...this.state.news,
      body: draftToHtml(convertToRaw(editorState.getCurrentContent()))
    } //так нужно для загрузки файлов
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
    const fetching = (nextProps.fetching === types.NEWS_CREATE) || (nextProps.fetching === types.NEWS_SHOW)
    if (!fetching && !errors.msg) {
      const contentBlock = htmlToDraft(news.body)
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
        const editorState = EditorState.createWithContent(contentState)
        this.setState(prev => ({
          ...prev,
          news: createNews(news),
          editorState
        }))
      }
      ErrorBox.clear()
      news && news.created && history.push('/news')
    } else {
      errors.msg && ErrorBox.create(errors.msg)
    }
  }

  render = () => {
    const { classes, fetching } = this.props
    const { editorState, news: { title, description, blobImageAttributes, id } } = this.state
    return (
      <Paper className={classes.root} elevation={1}>
        <Typography variant="headline" component="h3">
          {`${ id ? 'Изменение' : 'Добавление'} новости`}
        </Typography>
        <div className="news-new_fields">
          <TextField
            onChange={this.handleChange}
            required
            name="title"
            label="Заголовок"
            fullWidth
            value={title}
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
          <TextField
            onChange={this.handleChange}
            multiline
            rowsMax={5}
            fullWidth
            value={description}
            name="description"
            label="Описание"
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
        </div>
        <div className="content-wrapper">
          <Editor
            editorState={editorState}
            wrapperClassName="editor-wrapper"
            editorClassName="editor"
            onEditorStateChange={this.onEditorStateChange}
            localization={{
              locale: 'ru',
            }}
          />
          <div className="news-buttons">
            <input
              onChange={event => this.handleChange({ blobImageAttributes: [event.target.files[0]] })}
              name="image_attributes"
              value={blobImageAttributes.value}
              accept="image/*"
              style={{ display: 'none' }}
              id="outlined-button-file"
              type="file"
            />
            <label htmlFor="outlined-button-file">
              <Button variant="outlined" component="span" className={classes.button}>
                Загрузить фото
                </Button>
            </label>
            <h4 className="file-fields-label">Фотогаллерея</h4>
            <FileFields name="blobGalleriesAttributes" onChange={this.handleChange} />
              <Button onClick={this.handleSubmit} variant="outlined" component="span" className={classes.button} disabled={!!fetching === types.NEWS_CREATE}>
                {id ? 'Изменить' : 'Добавить'}
              </Button>
              {fetching === types.NEWS_CREATE && <CircularProgress size={24} className={classes.buttonProgress} />}
          </div>
        </div>
      </Paper >
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
const StylesWrapper = withStyles(styles)
const WrappedComponent = ReduxWrapper(StylesWrapper(withRouter(NewsNew)))
export default WrappedComponent