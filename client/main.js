import { Meteor } from 'meteor/meteor'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import gql from 'graphql-tag'

import './main.html'

const apolloClient = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'https://www.graphqlhub.com/graphql',
    transportBatching: true,
  }),
})

Meteor.startup(() => {
  const query = apolloClient.query({
    query: gql`
{
  giphy {
    search(query: "fun") {
      url
      images {
        fixed_width {
          url
        }
      }
    }
  }
}
`
  })

  query.then(res => {
    const images = res.data.giphy.search.map(gif => `
      <div><img src="${gif.images.fixed_width.url}"><a href="${gif.url}">Go to giphy</a></div>
    `)

    document.getElementById('root').innerHTML = `
      ${images.join(' ')}
    `
  })
})
