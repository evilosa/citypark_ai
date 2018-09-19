import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper';

import { CategoriesList, CategoryNew, CategoryManager, DishNew, DishesList } from '../../containers'
import styles from './MenuStyles'

function Menu (props) {
  const { classes } = props
  return (
    <Grid style={{height: "100%"}} container spacing={24}>
      <Grid item xs={3}>
        <CategoriesList />
      </Grid>
    </Grid>
  )
}

Menu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Menu);