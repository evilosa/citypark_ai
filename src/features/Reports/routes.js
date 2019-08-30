import * as containers from './containers'
import * as links from './links'

const routes = [
  {
    path: links.REPORTS.PATH,
    exact: true,
    component: containers.MainPageReportsContainer
  },
  //settings
  {
    path: links.REPORTS_SELECTION_SETTINGS_ONE.PATH,
    title: `${links.REPORTS.TITLE}, ${links.REPORTS_SELECTION_SETTINGS_ONE.TITLE}`,
    component: containers.SelectionSettingsOneContainer
  },
  {
    path: links.REPORTS_SELECTION_SETTINGS_TWO.PATH,
    title: `${links.REPORTS.TITLE}, ${links.REPORTS_SELECTION_SETTINGS_TWO.TITLE}`,
    component: containers.SelectionSettingsTwoContainer
  },
  {
    path: links.REPORTS_SELECTION_SETTINGS_TWO_FOR_HOTEL.PATH,
    title: `${links.REPORTS.TITLE}, ${links.REPORTS_SELECTION_SETTINGS_TWO_FOR_HOTEL.TITLE}`,
    component: containers.SelectionSettingsTwoForHotelContainer
  },
  //cash
  {
    path: links.REPORTS_CASH.PATH,
    title: `${links.REPORTS.TITLE}, ${links.REPORTS_CASH.TITLE}`,
    component: containers.CashContainer
  },
  //restaurant
  {
    path: links.REPORTS_RESTAURANT_SALES_COMBINED.PATH,
    title: `${links.REPORTS.TITLE}, ${links.REPORTS_RESTAURANT_SALES_COMBINED.TITLE}`,
    component: containers.SalesCombinedContainer
  },
  {
    path: links.REPORTS_RESTAURANT_SALES_TOTAL.PATH,
    title: `${links.REPORTS.TITLE}, ${links.REPORTS_RESTAURANT_SALES_TOTAL.TITLE}`,
    component: containers.SalesTotalContainer
  },
  {
    path: links.REPORTS_RESTAURANT_SALES_BY_COOKING_PLACE.PATH,
    title:  `${links.REPORTS.TITLE}, ${links.REPORTS_RESTAURANT_SALES_BY_COOKING_PLACE.TITLE}`,
    component: containers.SalesByCookingPlaceContainer
  },
  {
    path: links.REPORTS_RESTAURANT_SALES_BY_COOKING_TYPE.PATH,
    title: `${links.REPORTS.TITLE}, ${links.REPORTS_RESTAURANT_SALES_BY_COOKING_TYPE.TITLE}`,
    component: containers.SalesByCookingTypeContainer
  }, {
    path: links.REPORTS_RESTAURANT_AVERAGE_BILL.PATH,
    title: `${links.REPORTS.TITLE}, ${links.REPORTS_RESTAURANT_AVERAGE_BILL.TITLE}`,
    component: containers.AverageBillContainer
  },
  {
    path: links.REPORTS_RESTAURANT_MINIMAL_STORE.PATH,
    title: `${links.REPORTS.TITLE}, ${links.REPORTS_RESTAURANT_MINIMAL_STORE.TITLE}`,
    component: containers.MinimalStoreContainer
  },
  {
    path: links.REPORTS_RESTAURANT_CARD_DISCOUNT.PATH,
    title: `${links.REPORTS.TITLE}, ${links.REPORTS_RESTAURANT_CARD_DISCOUNT.TITLE}`,
    component: containers.CardDiscountContainer
  },
  //hotel
  {
    path: links.REPORTS_HOTEL_SALES.PATH,
    title: `${links.REPORTS.TITLE}, ${links.REPORTS_HOTEL_SALES.TITLE}`,
    component: containers.HotelSalesContainer
  },
  //other
  {
    path: links.REPORTS_MONTH_PROFIT.PATH,
    title: `${links.REPORTS.TITLE}, ${links.REPORTS_MONTH_PROFIT.TITLE}`,
    component: containers.MonthProfitContainer
  }
  
]

export default routes