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
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

import styles from './PublicEditorStyles'
import { Snackbars, FileFields } from 'components'
import { base64Loader } from 'utils'

const htmlToEditorState = html => {
  const contentBlock = htmlToDraft(html)
  if (contentBlock) {
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
    return EditorState.createWithContent(contentState)
  }
}

const colors = ['rgba(0,0,0,0)', '#ffc0d2', '#f6dfc4', '#f9b89c', '#45312b', '#bba080', '#d4b58e',
    'rgba(69, 49, 43, 0.7)', 'rgb(26,188,156)', 'rgb(84,172,210)', 'rgb(44,130,201)', 'rgb(97,189,109)',
    'rgb(147,101,184)', 'rgb(71,85,119)', 'rgb(204,204,204)', 'rgb(65,168,95)', 'rgb(0,168,133)',
    'rgb(61,142,185)', 'rgb(41,105,176)', 'rgb(85,57,130)', 'rgb(40,50,78)', 'rgb(0,0,0)',
    'rgb(247,218,100)', 'rgb(251,160,38)', 'rgb(235,107,86)', 'rgb(226,80,65)', 'rgb(163,143,132)',
    'rgb(239,239,239)', 'rgb(255,255,255)', 'rgb(250,197,28)', 'rgb(243,121,52)', 'rgb(209,72,65)',
    'rgb(184,49,47)', 'rgb(124,112,107)', 'rgb(209,213,216)']

class PublicEditor extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      editorState: EditorState.createEmpty(),
      item: props.handleInit(),
      codeView: false
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
    const { editorState, codeView } = this.state
    let item = {
      ...this.state.item,
      body: codeView ? this.state.item.body : draftToHtml(convertToRaw(editorState.getCurrentContent()))
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
      this.setState(prev => ({
        ...prev,
        item: handleInit(item),
        editorState: htmlToEditorState(item.body)
      }))
    } else {
      errors.msg && Snackbars.error(errors.msg)
    }
  }

  handleChangeView = () => {
    const { codeView, editorState, item: { body } } = this.state
    if (codeView) {
      this.setState({
        codeView: !codeView,
        editorState: htmlToEditorState(body)
      })
    } else {
      this.setState(prev => ({
        ...prev,
        codeView: !codeView,
        item: {
          ...prev.item,
          body: draftToHtml(convertToRaw(editorState.getCurrentContent()))
        }
      }))
    }
  }

  render = () => {
    const { classes, fetching } = this.props
    const { editorState, codeView, item: { title, description, blobImageAttributes, hidden, body, id } } = this.state
    return (
      <Paper className={classes.root} elevation={1}>
        <Typography variant="headline" component="h3">
          {`${id ? 'Изменение' : 'Добавление'} записи`}
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
          {
            codeView ?
              <textarea
                style={{ margin: "0 8px" }}
                onChange={this.handleChange}
                rows="20"
                name="body"
                value={body}
              /> :
              <Editor
                editorState={editorState}
                wrapperClassName="editor-wrapper"
                editorClassName="editor"
                toolbarClassName="toolbar-class"
                onEditorStateChange={this.onEditorStateChange}
                toolbar={{
                  colorPicker: { colors } 
                }}
                localization={{
                  locale: 'ru',
                }}
              />
          }
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
                {blobImageAttributes.length ? blobImageAttributes[0].name : "Загрузить фото"}
              </Button>
            </label>
            <FormControlLabel
              control={
                <Switch
                  onChange={this.handleChangeView}
                  checked={codeView}
                  name="html"
                  color="primary"
                />
              }
              label="HTML"
            />
            <h4 className="file-fields-label">Фотогаллерея</h4>
            <FileFields name="blobGalleriesAttributes" onChange={this.handleChange} />
            <div style={{ display: 'flex' }}>
              <div style={{ position: 'relative' }}>
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
              <FormControlLabel
                control={
                  <Switch
                    onChange={() => this.handleChange({ hidden: !hidden })}
                    checked={hidden}
                    name="hidden"
                    color="primary"
                  />
                }
                label="Скрыть"
              />
            </div>
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
  handleInit: PropTypes.func,
  handleCreate: PropTypes.func,
  fetching: PropTypes.bool,
  errors: PropTypes.object,
  pathOnCreate: PropTypes.string.isRequired,
  item: PropTypes.any.isRequired
}

const StylesWrapper = withStyles(styles)
const WrappedComponent = withRouter(StylesWrapper(PublicEditor))
export default WrappedComponent