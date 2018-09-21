import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import styles from './CategoriesListStyles'
import * as actions from '../../actions'

class CategoriesList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedIndex: 1,
    }
  }

  categoriesList = () => {
    const { categories } = this.props
    const { selectedIndex } = this.state
    return categories ? categories.map(category =>
      <ListItem
        button
        selected={selectedIndex === category.id}
        onClick={() => this.handleSelect(category.id)}
        key={category.id}
      >
        <ListItemText primary={category.title} />
      </ListItem>
    ) : null
  }

  handleSelect = id => {
    const { getCategory, fetching, categories, selectCategory } = this.props
    this.setState({
      selectedIndex: id
    })
    categories.find(categ => categ.id === id).dishes ? selectCategory(id) : !fetching && getCategory(id)
  }

  componentDidMount = () => {
    const { fetching, categories, getCategories } = this.props
    !fetching && !categories.length && getCategories()
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <List component="nav">
          {this.categoriesList()}
        </List>
      </div>
    )
  }
}

CategoriesList.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  const { payload, fetching } = state.categories
  return {
    categories: payload,
    fetching,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  ...actions.categories
}, dispatch)

const ReduxWrapper = connect(mapStateToProps, mapDispatchToProps)
const StylesWrapper = withStyles(styles)
const WrappedComponent = ReduxWrapper(StylesWrapper(CategoriesList))
export default WrappedComponent