const React = require('react')
const Subchapter = require('./Subchapter')
const Sections = require('./Sections')

const Chapter = (props) => {
  let sections
  let subchapters
  if (props.chapter.subsections && props.chapter.subsections.length > 0) {
    sections = (<Sections className="section" sections={props.chapter.subsections} />)
  }

  if (props.chapter.subchapters && props.chapter.subchapters.length > 0) {
    subchapters = (
      props.chapter.subchapters.map((row, index) => (
        <Subchapter chapter={row} key={index}>
          {row.subchapters.map((subch, subchindex) => (
            <Subchapter chapter={subch} key={subchindex}>
                {subch.subchapters.map((subsubch, subsubchindex) => (
                   <Subchapter chapter={subsubch} key={subsubchindex} />
                 ))}
            </Subchapter>
           ))}
        </Subchapter>
      )
      ))
  }

  return (
    <div className="chapter">
        <div className="top-chapter">
            <h1>{props.chapter.title}</h1>
            {sections}
        </div>
      {subchapters}
  </div>
  )
}

Chapter.propTypes = {
  chapter: React.PropTypes.object
}

module.exports = Chapter
