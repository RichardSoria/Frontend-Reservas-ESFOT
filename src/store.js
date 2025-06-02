import { legacy_createStore as createStore } from 'redux'

const initialState = {
  sidebarShow: true,
  theme: 'light',
  user: null,
  administradores: [],
  administradorSeleccionado: null
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    default:
      return state
  }
}

export const set = (payload) => ({ type: 'set', ...payload })

const store = createStore(changeState)
export default store
