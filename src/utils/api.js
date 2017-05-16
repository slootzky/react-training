import axios from 'axios'

export default {
    fetchPopularRepos : async (language) =>{
        var encodeURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`);

        var results = await axios.get(encodeURI);
        return results.data.items;
    },

};
