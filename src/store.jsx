import { legacy_createStore as createStore } from 'redux'

const initialState = {
  sidebarShow: true,
  theme: 'light',
  administradorSeleccionado: null,
  docenteSeleccionado: null,
  estudianteSeleccionado: null,
  userConsult: null,
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    case 'limpiarSeleccionados':
      return {
        ...state,
        administradorSeleccionado: null,
        docenteSeleccionado: null,
        estudianteSeleccionado: null,
        userConsult: null,
      }
    default:
      return state
  }
}

export const set = (payload) => ({ type: 'set', ...payload })
export const limpiarSeleccionados = () => ({ type: 'limpiarSeleccionados' })


const store = createStore(changeState)
export default store
