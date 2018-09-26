import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import { withStyles } from '@material-ui/core/styles'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

import styles from './PublicEditorStyles'
import { ErrorBox, FileFields } from 'components'
import { base64Loader } from 'utils'

class PublicEditor extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      editorState: EditorState.createEmpty(),
      item: props.handleInit()
    }
  }

  onEditorStateChange = editorState => this.setState({ editorState })

  handleChange = prop => {
    const { target } = prop
    this.setState(prev => ({
      ...prev,
      item: {
        ...prev.item,
        ...(() => target ? { [target.name]: target.value } : prop)()
      }
    }))
  }

  handleSubmit = () => {
    const { editorState } = this.state
    let item = {
      ...this.state.item,
      body: draftToHtml(convertToRaw(editorState.getCurrentContent()))
    } //так нужно для загрузки файлов
    const { handleCreate } = this.props
    base64Loader(item.blobImageAttributes)
      .then(images => {
        if (images) item.image_attributes = images[0]
        delete item.blobImageAttributes
        base64Loader(item.blobGalleriesAttributes)
          .then(galleries => {
            if (galleries) item.galleries_attributes = galleries
            delete item.blobGalleriesAttributes
            handleCreate(item)
          })
      })
  }

  componentWillReceiveProps = nextProps => {
    const { item, history, errors, fetching } = nextProps
    const { handleInit, pathOnCreate } = this.props
    if (item.created) { 
      history.push(pathOnCreate)
      return
    }
    if (!fetching && !errors.msg) {
      const contentBlock = htmlToDraft(item.body)
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
        const editorState = EditorState.createWithContent(contentState)
        this.setState(prev => ({
          ...prev,
          item: handleInit(item),
          editorState
        }))
      }
      ErrorBox.clear()
    } else {
      errors.msg && ErrorBox.create(errors.msg)
    }
  }

  render = () => {
    const { classes, fetching } = this.props
    const { editorState, item: { title, description, blobImageAttributes, id } } = this.state
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
              //value={blobImageAttributes.value}
              accept="image/*"
              style={{ display: 'none' }}
              id="outlined-button-file"
              type="file"
            />
            <label htmlFor="outlined-button-file">
              <Button 
              variant="outlined" 
              component="span" 
              className={classes.button}
              >
                Загрузить фото
                </Button>
            </label>
            <h4 className="file-fields-label">Фотогаллерея</h4>
            <FileFields name="blobGalleriesAttributes" onChange={this.handleChange} />
              <Button 
              onClick={this.handleSubmit} 
              variant="outlined" 
              component="span" 
              className={classes.button} 
              disabled={fetching}>
                {id ? 'Изменить' : 'Добавить'}
              </Button>
              {fetching && <CircularProgress size={24} className={classes.buttonProgress} />}
          </div>
        </div>
      </Paper >
    )
  }
}

PublicEditor.defaultProps = {
  item: {}
}

PublicEditor.propTypes = {
  classes: PropTypes.object.isRequired,
  /*handleInit: PropTypes.func.isRequred,
  handleCreate: PropTypes.func.isRequred,
  fetching: PropTypes.string,
  errors: PropTypes.object,
  pathOnCreate: PropTypes.string.isRequired,
  item: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string, 
    description: PropTypes.string,
    body: PropTypes.string
  })*/
}

const StylesWrapper = withStyles(styles)
const WrappedComponent = withRouter(StylesWrapper(PublicEditor))
export default WrappedComponent