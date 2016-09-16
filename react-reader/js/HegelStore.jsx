const {applyMiddleware, createStore, combineReducers } = require('redux')
const { connect } = require('react-redux')
const thunk = require('redux-thunk').default
const promise = require('redux-promise')
const createLogger = require('redux-logger')
const { Map } = require('immutable')
const {
  DELTA,
  SET_HEGEL,
  SET_FINDLAY,
  SHOW_FINDLAY,
  SET_TABLE,
  GET_TABLE,
  SET_FLAT_TABLE,
  SET_CHAPTER,
  showFindlay,
  changeSection,
  getTable,
  getChapter,
  getFlatTable,
  setChapter
} = require('./Actions')

export const initialState = Map({
  nav: {
    sectionNumber: 1,
    showFindlay: true,
    chapter: ""
  },
  table: {
    full: [],
    flatTable: []
  },
  section: {
    hegel: [],
    findlay: ''
  }
})

const initTable = initialState.get('table')
export const table = (state = initTable, action) => {
  switch (action.type) {
    case SET_TABLE:
      return action.value
    case GET_TABLE:
      return action.value
    case SET_FLAT_TABLE:
      return action.value
    default:
      return state
  }
}

const initNav = initialState.get('nav')
export const nav = (state = initNav, action) => {
  switch (action.type) {
    case DELTA:
      return action.value
    case SHOW_FINDLAY:
      return action.value
    case SET_CHAPTER:
      return action.value
    default:
      return state
  }
}

const initSec = initialState.get('section')
export const section = (state = initSec, action) => {
  switch (action.type) {
    case SET_HEGEL:
      return action.value
    case SET_FINDLAY:
      return action.value
    default:
      return state
  }
}

const hegelApp = combineReducers({ nav, section, table })

export const store =
  createStore(hegelApp,
              applyMiddleware(thunk, promise, createLogger())
)

const mapStateToProps = state => ({
  nav: state.nav,
  section: state.section,
  table: state.table,
  flatTable: state.table.flatTable
})

const mapDispatchToProps = dispatch => ({
  changeSection: (state, action) => dispatch(changeSection(state, action)),
  showFindlay: (state, action) => dispatch(showFindlay(state.nav, action)),
  getTable: (state, action) => dispatch(getTable()),
  getChapter: (state, action) => dispatch(getChapter(state, action))
})

const connector = connect(mapStateToProps, mapDispatchToProps)

module.exports = { connector, store, hegelApp, initialState }
