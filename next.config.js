const { spawn } = require('child_process');
const { ApolloClient, HttpLink, InMemoryCache } = require('apollo-boost');
const gql = require('graphql-tag');
const fetch = require('isomorphic-fetch');

module.exports = {
  exportPathMap: async () => {
    const client = new ApolloClient({
      link: new HttpLink({ uri: 'http://localhost:3000/graphql', useGETForQueries: true, fetch }),
      cache: new InMemoryCache(),
    });

    const server = spawn('node', ['./server.js']);
    await new Promise((resolve, reject) => {
      server.stdout.on('data', (data) => String(data).match(/info bootstrap finished/) && resolve());
      server.stderr.on('data', reject);
    });
    process.on('exit', server.kill);

    const res = await client.query({
      query: gql`{
        allMediumPost {
          edges {
            node {
              id
              slug
            }
          }
        }
      }`
    });
    
    const posts = [].concat(res.data && res.data.allMediumPost.edges || []).reduce((acc, { node }) => {
      acc[`/post/${node.slug}`] = { page: '/post', query: { id: node.slug } };
      return acc;
    }, {})

    return {
      '/': { page: '/' },
      ...posts
    }
  }
}
