const axios = require('axios')
const { Map } = require('immutable')
const _ = require('lodash')

export const CHANGE_SECTION = 'changeSection'
export const INIT = 'init'
export const DELTA = 'delta'
export const SET_HEGEL = 'setHegel'
export const SET_FINDLAY = 'setFindlay'
export const SHOW_FINDLAY = 'showFindlay'
export const GET_TABLE = 'getTable'
export const SET_TABLE = 'setTable'
export const SET_FLAT_TABLE = 'setFlatTable'
export const SET_CHAPTER = 'setChapter'

export const delta = (state, sectionNumber) => ({
  type: DELTA,
  value: {...state, sectionNumber}
})

export const changeHegel = (state, hegel) => ({
  type: SET_HEGEL,
  value: {...state, hegel }
})

export const changeFindlay = (state, findlay) => ({
  type: SET_FINDLAY,
  value: {...state, findlay }
})

export const showFindlay = (state, showFindlay) => ({
  type: SHOW_FINDLAY,
  value: {...state, showFindlay }
})
export const setTable = (state, full) => ({
  type: SET_TABLE,
  value: {...state, full}
})
export const setFlatTable = (state, flatTable) => ({
  type: SET_FLAT_TABLE,
  value: {...state, flatTable}
})

export const setChapter = (state, chapter) => ({
    type: SET_CHAPTER,
    value: {...state, chapter}
})

export const getTable = (state, action) => {
  return (dispatch, getState) => {
    if(getState().table.full.length !== 0 ){
        dispatch(getChapter())
    } else {
      requestTable().then((data) => {
        dispatch(setTable(getState().table, data.data))

        // Get a flattened version of our table object
        const arrTable = _((getState().table).full).flatten().value()

        // Helper function for creating our new data structure
        const getChapData = (chap) => ({
          title: chap.title,
          subsections: chap.subsections,
          topchapter:chap.title
        })

        //Flatten nested subchapters into array of chapters with only sections and title
        const flattenChap = (chap) => ([
          [getChapData(chap),
           chap.subchapters.map((subch)=> (
             [getChapData(subch),
              subch.subchapters.map((subsubch) =>(flattenChap(subsubch)))
             ]
           ))
          ]
        ])

        // Map over whole table and flatten each main chapter
        const deepFlattenTable = (table) =>(
          _(table)
            .map((chapter)=> (flattenChap(chapter)))
            .flattenDeep()
            .value()
        )
        const deepFlattenedTable = deepFlattenTable(arrTable)
          dispatch(setFlatTable(getState().table, deepFlattenedTable))
          dispatch(getChapter())
      })
    }
  }
}

export const getChapter = (state, action) => {
    return (dispatch, getState) => {
        const searchSection = (table, section) => (
            _(table)
                .map((chap) => {
                    if(chap.subsections.filter((subsec)=>(subsec == section)).length > 0 ){
                        return chap
                    }
                })
                .remove(undefined)
                .flattenDeep()
                .value()
        )
        const sectionChap = searchSection(
            getState().table.flatTable,
            getState().nav.sectionNumber)
              .pop().title

        dispatch(setChapter(getState().nav , sectionChap))
  }
}

export const changeSection = (state, action) => {
  return function (dispatch, getState) {
    const navState = () => getState().nav
    const secState = () => getState().section
    const newSection = checkSectionInput(navState(), action)

    dispatch(delta(navState(), newSection))
    requestSection(newSection).then((data) => {
      dispatch(changeHegel({...secState()}, data.get('hegel')))
        dispatch(changeFindlay({...secState()}, data.get('findlay')))
        dispatch(getTable())
    })
  }
}
const requestTable = () => (
  axios.get(`http://localhost:3030/api/toc`)
    .then((data) => {
      return data
    })
    .catch((error) => {
      console.log(`Error on getting Table : `, error)
    })
)
const requestSection = sectionNumber => (
    axios.get(`http://localhost:3030/api/all/${sectionNumber}`)
         .then((data) => {
             /* Need to check if there is actually data and handle */
           data.data.hegel.shift()
           return Map({hegel: data.data.hegel, findlay: data.data.findlay})
         })
         .catch((error) => {
           console.log(`Error on getting section ${sectionNumber} : `, error)
         })
)

const checkSectionInput = (state, delta) => {
  switch (delta.type) {
    case 'inc':
      return checkBounds(state.sectionNumber + 1)
    case 'dec':
      return checkBounds(state.sectionNumber - 1)
    case 'num':
      return checkBounds(delta.num)
  }
}

const checkBounds = (num) => {
  const bounds = {lower: 1, upper: 800}

  if (num > bounds.upper) { return bounds.upper }
  else if (num < bounds.lower) { return bounds.lower }
    else { return num }
}
