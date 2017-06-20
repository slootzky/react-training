import axios from 'axios';
let id = 'YOUR_CLIENT_ID';
let sec = 'YOUR_SECRET_REQUEST';
let params = `?client_id=${id}&client_secret=${sec}`;
const githubBaseUrl = `https://api.github.com/`;

const getProfile = username => {
  return axios.get(`${githubBaseUrl}users/${username}${params}`);
};

const getRepos = username => {
  return axios.get(`${githubBaseUrl}users/${username}/repos${params}&per_page=100`);
};

const getStarCount = repos => {
  return repos.data.reduce((count, item) => {
    return count + item.stargazers_count;
  }, 0);
};

const handleError = error => {
  console.warn(error);
  return null;
};

const getUserData = player => {
  axios.all([getProfile(player), getRepos(player)]).then(result => {
    let profile = result[0];
    let repos = result[1];

    return {
      profile,
      score: calculateScore(profile, repos),
    };
  });
};
const calculateScore = (profile, repos) => {
  let followers = profile.followers;
  let totalStars = getStarCount(repos);
  return followers * 3 + totalStars;
};

const sortPlayers = players => {
  return players.sort((a, b) => b.score - a.score);
};
export const battle = players => {
  return axios.all([players.map(getUserData)]).then(sortPlayers).catch(handleError);
};

export default {
  fetchPopularRepos: async language => {
    const encodeURI = window.encodeURI(
      `${githubBaseUrl}search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
    );

    const results = await axios.get(encodeURI);
    return results.data.items;
  },
};
