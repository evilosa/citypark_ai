import feedback from 'feedback'
import * as api from './apiConst'
import * as types from './actionTypes'

export const getRooms = () =>
  feedback.get(api.ROOMS, types.ROOMS_INDEX)

export const updateRooms = rooms =>
  feedback.patch(api.ROOMS, types.ROOMS_UPDATE, { rooms })  