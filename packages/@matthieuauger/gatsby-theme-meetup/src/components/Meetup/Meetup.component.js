import React from 'react'
import dayjs from 'dayjs'
import StyledMeetup from './Meetup.style'

import Button from '../Button'

import PropTypes from 'prop-types'

const Meetup = ({
  meetupInfo,
  meetupType,
  displayVideosLink,
  displayVideosTranslation,
  meetupVideosUrl,
  registerOnMeetupTranslation,
  backgroundColor,
  dateFormat,
}) => (
  <div className="meetup-container" id="{meetupInfo.id}">
    <StyledMeetup backgroundColor={backgroundColor}>
      <div className="meetup-name">
        <h2>{meetupInfo.name}</h2>
      </div>
      <div className="meetup-informations">
        <div className="meetup-informations-basic">
          <div className="meetup-informations-basic-date">
            <div className="meetup-informations-basic-highlight">
              {dayjs(meetupInfo.local_date).format(dateFormat)}
            </div>
          </div>
        </div>
        <div
          className="meetup-informations-talks"
          dangerouslySetInnerHTML={{
            __html: meetupInfo.description,
          }}
        />
      </div>
      {meetupType === 'UPCOMING' && (
        <div className="meetup-subscribe">
          <Button
            url={meetupInfo.link}
            text={registerOnMeetupTranslation}
            type="primary"
          />
        </div>
      )}
      {displayVideosLink && meetupType === 'PAST' && (
        <div className="meetup-subscribe">
          <Button
            url={meetupVideosUrl}
            text={displayVideosTranslation}
            type="neutral"
          />
        </div>
      )}
    </StyledMeetup>
  </div>
)

Meetup.propTypes = {
  meetupInfo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    local_date: PropTypes.string.isRequired,
  }).isRequired,
}

export default Meetup
