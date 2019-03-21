import React from 'react'
import Grid from '@material-ui/core/Grid'
import { CategoriesList, CategoryDialog, CategoryManager, DishManager, DishDialog, DishesList } from '../../containers'

export default () =>
  <div className="height100">
    <Grid className="height100" container spacing={8}>
      <Grid className="height100" item xs={4}>
        <CategoryManager />
        <CategoriesList />
      </Grid>
      <Grid className="height100" item xs={8}>
        <DishManager />
        <DishesList />
      </Grid>
    </Grid>
    <CategoryDialog />
    <DishDialog />
  </div>