const InstagramAPI = require('instagram-private-api').generate();

async function login(username, password) {
  const api = new InstagramAPI();
  const state = await api.state();

  if (!state.logins.length) {
    await api.login(username, password);
  }

  return api;
}

async function getFeed(api) {
  const feed = await api.feed();
  console.log(feed);
}

async function run() {
  const api = await login('username', 'password');
  await getFeed(api);
}

run();