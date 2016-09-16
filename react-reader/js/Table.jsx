const React = require('react')
const { connector } = require('./HegelStore')
const Chapter = require('./Chapter')

const Table = React.createClass({
  propTypes: {
    getTable: React.PropTypes.func,
    table: React.PropTypes.any
  },
  getInitialState () {
    this.props.getTable()
    return {}
  },
  render () {
    let table
    if (this.props.table.full && this.props.table.full.length !== 0) {
      const tabledata = this.props.table.full
      table = (
        <div id='toc'>
        <h2 className="toc"> Table of Contents </h2>
            {tabledata.map((row, index) => (
              <Chapter chapter={row} key={index} />
            ))}
        </div>
      )
    }
    return (<div>{table}</div>)
  }
})

module.exports = connector(Table)
