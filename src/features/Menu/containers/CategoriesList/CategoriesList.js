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

  categoriesList = () => {
    const { categories, selectedCategory } = this.props
    return categories ? categories.map((category, index) =>
      <ListItem
        button
        selected={index === selectedCategory}
        onClick={() => this.handleSelect(index)}
        key={category.id}
      >
        <ListItemText primary={category.title} />
      </ListItem>
    ) : null
  }

  handleSelect = index => {
    const { getCategory, fetching, categories, selectCategory } = this.props
    categories[index].dishes ? selectCategory(index) : !fetching && getCategory(categories[index].id)
  }

  componentDidMount = () => {
    const { fetching, categories, getCategories } = this.props
    !fetching && !categories.length && getCategories()
  }

  render = () => {
    const { classes } = this.props
    return (
      <List className={classes.root} component="nav">
        {this.categoriesList()}
      </List>
    )
  }
}

CategoriesList.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  const { payload, fetching, selectedCategory } = state.menu
  return {
    selectedCategory,
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