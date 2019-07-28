import React from 'react'
import { graphql } from 'gatsby'

import Footer from '../components/Footer'
import Layout from '../components/Layout'
import Meetup from '../components/Meetup'
import TextBlock from '../components/TextBlock'

let currentMeetupColor = '#F3DBD1'

let pastMeetupColors = ['#DDDEC4', '#E6BB91', '#EFCC74']

const IndexPage = ({ data }) => (
  <Layout>
    <h1>Le meetup bimestriel autour de la JAMstack</h1>
    {data.contentfulUpcomingMeetup && (
      <>
        <h2>Prochain Meetup</h2>
        <Meetup
          meetupInfo={data.contentfulUpcomingMeetup}
          meetupType="UPCOMING"
          backgroundColor={currentMeetupColor}
        />
      </>
    )}
    <TextBlock textBlockHTML={data.whatIsJAMstackTextBlock.html} />

    <h2>Meetups précédents</h2>
    {data.meetupGroup.events.map((pastMeetup, index) => {
      return (
        <Meetup
          key={pastMeetup.name}
          meetupInfo={pastMeetup}
          meetupType="PAST"
          backgroundColor={pastMeetupColors[index]}
        />
      )
    })}
    <TextBlock textBlockHTML={data.submitATalk.html} />
    <Footer />
  </Layout>
)

export const query = graphql`
  query {
    allContentfulTextBlock {
      edges {
        node {
          type
          title
          content {
            childContentfulRichText {
              html
            }
          }
          callToActionText
          isLinkInternal
          callToActionUrl
        }
      }
    }
    meetupGroup {
      events {
        name
        description
        local_date
        venue {
          name
          address_1
          city
        }
        link
      }
      name
    }
    whatIsJAMstackTextBlock: markdownRemark(
      frontmatter: { type: { eq: "what-is-jamstack" } }
    ) {
      html
    }
    submitATalk: markdownRemark(
      frontmatter: { type: { eq: "submit-a-talk" } }
    ) {
      html
    }
  }
`

export default IndexPage
