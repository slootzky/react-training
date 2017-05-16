import axios from 'axios';

export default {
  fetchPopularRepos: async language => {
    const encodeURI = window.encodeURI(
        `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
    );

    const results = await axios.get(encodeURI);
    return results.data.items;
  },
};
