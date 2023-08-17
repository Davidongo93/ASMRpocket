const { Client } = require('podcast-api');

// If apiKey is null, then we will connect to a mock server
// that returns fake data for testing purposes.
const client = Client({ apiKey: '9f0968d155c142648b979852e4a7f741' });
client
  .fetchPodcastById({
    id: '87aa06cd982b4a54b05a01b3ab3ea54b',
    next_episode_pub_date: 0,
    sort: 'recent_first',
  })
  .then((response) => {
    // Get response json data here
    console.log(response.data);
  })
  .catch((error) => {
    console.log(error);
  });
