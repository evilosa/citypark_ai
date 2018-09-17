import React from 'react'

import { CategoriesList, CategoryNew, CategoryManager, DishNew, DishesList } from '../../containers'

export default () =>
  <div id="menu-layout">
    <div id="menu-left">
      <CategoryNew />
      <CategoryManager />
      <CategoriesList />
    </div>
    <div style={{width: '15px'}} />
    <div id="menu-right">
      <DishNew />
      <DishesList />
    </div>
  </div>
