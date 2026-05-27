import React from 'react'

const IconHeadingBlock = ({ icon, heading, bodyParagraphs }) => {
  const iconUrl = icon?.asset?.url
  return (
    <div className="content-block">
      {iconUrl && (
        <div className="content-block-icon">
          <img src={iconUrl} alt="" height="49" loading="lazy" />
        </div>
      )}
      {heading && <h2 className="content-block-heading type-display-small">{heading}</h2>}
      {bodyParagraphs?.length > 0 && (
        <div className="content-block-body">
          {bodyParagraphs.map((para, i) => (
            <p key={i} className="content-block-para type-body-small">{para}</p>
          ))}
        </div>
      )}
    </div>
  )
}

export default IconHeadingBlock
