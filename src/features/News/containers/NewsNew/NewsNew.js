import React from 'react'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import { withStyles } from '@material-ui/core/styles'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
//import htmlToDraft from 'html-to-draftjs'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%'
  },
})


class NewsNew extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      editorState: EditorState.createEmpty()
    }
  }

  onEditorStateChange = editorState => this.setState({ editorState });

  render = () => {
    const { classes } = this.props
    const { editorState } = this.state
    return (
      <div>
        <Grid className="height100" container spacing={24}>
          <Grid item xs={6}>
            <TextField
              required
              id="outlined-name"
              label="Заголовок"
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-name"
              label="Описание"
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <Editor
              editorState={editorState}
              wrapperClassName="demo-wrapper"
              editorClassName="editor"
              onEditorStateChange={this.onEditorStateChange}
              localization={{
                locale: 'ru',
              }}
            />
            <textarea
              disabled
              value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(NewsNew)