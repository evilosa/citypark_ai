import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import { CategoriesList, CategoryNew, CategoryManager, DishNew, DishesList } from '../../containers'
import styles from './MenuStyles'

function Menu(props) {
  const { classes } = props
  return (
    <div className="height100">
      <Grid className="height100" container spacing={24}>
        <Grid item xs={3}>
          <CategoryManager />
          <CategoriesList />
        </Grid>
      </Grid>
      <CategoryNew />
    </div>
  )
}

Menu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Menu);