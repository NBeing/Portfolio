const React = require('react')
const { connector } = require('./HegelStore')

const Section = require('./Section')

const Hegel = React.createClass({
  propTypes: {
    delta: React.PropTypes.func,
    changeSection: React.PropTypes.func,
    params: React.PropTypes.object,
    showFindlay: React.PropTypes.func,
    nav: React.PropTypes.object,
    section: React.PropTypes.shape({
      sectionTitle: React.PropTypes.number,
      hegel: React.PropTypes.array
    })
  },
  getInitialState () {
    this.props.changeSection({...this.props}, {type: 'num', num: Number(this.props.params.id)})
    return {}
  },
  componentWillMount(){
    this.props.getTable()
  },
  componentDidMount () {
    document.body.addEventListener('keyup', this.handleKeys)
  },
  handleKeys (e) {
    switch (e.keyCode) {
      case 39:
        this.props.changeSection({...this.props}, {type: 'inc'})
        break
      case 37:
        this.props.changeSection({...this.props}, {type: 'dec'})
        break
      case 70:
        this.props.showFindlay({...this.props}, (!this.props.nav.showFindlay))
        break
    }
  },
  changeSection (e) {
    const eventData = {
      type: e.target.getAttribute('data-delta'),
      num: Number(e.target.value)
    }
    this.props.changeSection({...this.props}, eventData)

  },
  render () {
    let section
    if (this.props.section && this.props.section.length !== 0) {
      section = <Section className='section'
        hegel={this.props.section.hegel}
        findlay={this.props.section.findlay}
        showFindlay={this.props.nav.showFindlay}
        chapter={this.props.nav.chapter}
        sectionNumber={this.props.nav.sectionNumber} />
    }
    return (
      <div>
          {section}
          <div className='ctrl-container'  tabIndex='0'>
              <form className='go-to'>
                  <button onClick={this.changeSection}
                          data-delta='dec'
                          className='delta decrement'>&lt;&lt;</button>
          <label className='label'> <span className="goto" >Go To Section</span>
              <input className='go-to-section'
                     data-delta='num'
                     type='number'
                     defaultValue='1'
                     min='1'
                     max='800'
                     onChange={this.changeSection}
              />
          </label>
          <button onClick={this.changeSection}
                  data-delta='inc'
                  className='delta increment'>&gt;&gt;</button>
              </form>
          </div>
      </div>
    )
  }
})

module.exports = { Hegel: connector(Hegel), HegelTest: Hegel }
