import * as containers from './containers'
import * as links from './links'

const routes = [
  {
    path: links.REPORTS.PATH,
    exact: true,
    component: containers.MainPageReportsContainer
  },
  {
    path: links.REPORTS_RESTAURANT_SALES_COMBINED.PATH,
    title: `${links.REPORTS.TITLE}, ${links.REPORTS_RESTAURANT_SALES_COMBINED.TITLE}`,
    component: containers.SalesCombinedContainer
  },
  {
    path: links.REPORTS_SELECTION_SETTINGS_ONE.PATH,
    title: `${links.REPORTS.TITLE}, ${links.REPORTS_SELECTION_SETTINGS_ONE.TITLE}`,
    component: containers.SelectionSettingsOneContainer
  },
  {
    path: links.REPORTS_SELECTION_SETTINGS_TWO.PATH,
    title: `${links.REPORTS.TITLE}, ${links.REPORTS_SELECTION_SETTINGS_TWO.TITLE}`,
    component: containers.SelectionSettingsTwoContainer
  }
]

export default routes