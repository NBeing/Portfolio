const React = require('react')

const Section = (props) => (
  <div className='section'>
      <h1 className="chapter-title"> {props.chapter} </h1>
    <div className='section-text hegel'>
      <p>
        {props.hegel.map((word, index) =>
          (<span className='word' key={index}> {word}</span>))
        }
      </p>
      <span className='hegel-text'>
        <span className='section-number'>{props.sectionNumber}</span>
        Hegel Text </span>
    </div>
    <div className={props.showFindlay ? 'section-text' : 'section-text hidden'}>
        <p> {props.findlay} </p>
        <span className='findlay-analysis'>
            <span className='section-number'>{props.sectionNumber}</span>
            Findlay Analysis </span>
    </div>
  </div>
)

Section.propTypes = {
  hegel: React.PropTypes.array,
  sectionTitle: React.PropTypes.number,
  showFindlay: React.PropTypes.bool,
  findlay: React.PropTypes.string
}

module.exports = Section
