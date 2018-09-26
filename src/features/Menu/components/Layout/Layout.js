import React from 'react'
import Grid from '@material-ui/core/Grid'
import { CategoriesList, CategoryDialog, CategoryManager, DishManager, DishDialog, DishesList } from '../../containers'

export default () =>
  <div id="menu-layout">
    <div id="menu-left">
      <CategoryManager />
      <CategoriesList />
    </div>
    <div style={{ width: '15px' }} />
    <div id="menu-right">
      <DishManager />
      <DishesList />
    </div>
    <CategoryDialog />
    <DishDialog />
  </div>