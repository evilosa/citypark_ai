import React from 'react'
import Grid from '@material-ui/core/Grid'
import { CategoriesList, CategoryDialog, CategoryManager, DishManager, DishDialog, DishesList } from '../../containers'

function Menu() {
  return (
    <div className="height100">
      <Grid className="height100" container spacing={8}>
        <Grid item xs={4}>
          <CategoryManager />
          <CategoriesList />
        </Grid>
        <Grid item xs={8}>
          <DishManager />
          <DishesList />
        </Grid>
      </Grid>
      <CategoryDialog />
      <DishDialog />
    </div>
  )
}

export default Menu