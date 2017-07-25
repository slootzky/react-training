import React from 'react';
import PropTyps from 'prop-types';
import api from '../utils/api';
import {withState,compose} from 'recompose';

const RepoGrid = props => {
  return (
    <ul className="popular-list">
      {props.repos.map((repo, index) => (
        <li key={repo.name} className="popular-item">
          <div className="popular-rank">#{index + 1}</div>
          <ul className="space-list-items">
            <li>
              <img className="avatar" src={repo.owner.avatar_url} alt={`Avatar for ${repo.owner.login}`} />
            </li>
            <li>
              <a href={repo.html_url}> {repo.name} </a>
            </li>
            <li>@{repo.owner.login}</li>
            <li>{repo.stargazers_count} stars</li>
          </ul>
        </li>
      ))}
    </ul>
  );
};

RepoGrid.propTypes = {
  repos: PropTyps.array.isRequired,
};

const SelectLanguage = props => {
  var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

  return (
    <ul className="languages">
      {languages.map(lang => (
        <li
          key={lang}
          onClick={props.onSelect.bind(null, lang)}
          style={lang === props.selectedLanguage ? { color: '#d0021b' } : null}
        >
          {lang}
        </li>
      ))}
    </ul>
  );
};

SelectLanguage.PropTypes = {
  selectedLanguage: PropTyps.string.isRequired,
  onSelect: PropTyps.func.isRequired,
};

class Popular extends React.Component {
  languageWasUpdated(lang){
    this.props.updateRepos(null);

    api.fetchPopularRepos(lang).then(repos => {
      this.props.updateRepos(repos);
    });
  }

  componentDidMount() {
    this.languageWasUpdated(this.props.selectedLanguage);
  }

  render() {
    return (
      <div>
        <SelectLanguage selectedLanguage={this.props.selectedLanguage} onSelect={(lang)=>{
          this.props.updateLanguage(lang);
          this.languageWasUpdated(lang);
        }} />
        {!this.props.repos ? <p>LOADING</p> : <RepoGrid repos={this.props.repos} />}

      </div>
    );
  }
}

const enhace = compose(withState('repos','updateRepos',null),withState('selectedLanguage','updateLanguage','All')

);

export default enhace(Popular);
