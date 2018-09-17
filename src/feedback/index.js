import * as actions from './actions'
import * as statuses from './actionStatuses'
import reducer, { getStatus, getAction } from './reducer'

export {
  statuses,
  getStatus,
  getAction
}

export default {
  ...actions,
  getStatus,
  getAction,
  statuses,
  reducer
}
