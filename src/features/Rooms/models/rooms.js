const rooms = {
  single_rooms: 0,
  double_rooms: 0,
  vip_room: 0
}

export const createRooms = props => ({
  ...rooms,
  ...props
})
