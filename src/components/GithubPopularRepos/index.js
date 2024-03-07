import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRepos extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    repositorydata: [],
    activeLanguageFilterId: languageFiltersData[0].id,
  }

  componentDidMount() {
    this.getReposotries()
  }

  getReposotries = async () => {
    const {activeLanguageFilterId} = this.state
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const url = `https://apis.ccbp.in/popular-repos?language=${activeLanguageFilterId}`
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      const newData = data.popular_repos.mpa(each => ({
        id: each.id,
        avatharUrl: each.avatar_url,
        name: each.name,
        starsCount: each.stars_count,
        forksCount: each.forks_count,
        issuesCount: each.issues_count,
      }))
      this.setState({
        repositorydata: newData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div>
      <Loader color="#0284c7" height={80} width={80} type="ThreeDots" />
    </div>
  )

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1>Something Went wrong</h1>
    </div>
  )

  renderRepositoriesListView = () => {
    const {repositorydata} = this.state

    return (
      <ul>
        {repositorydata.map(each => (
          <RepositoryItem key={each.id} repositoryDetails={each} />
        ))}
      </ul>
    )
  }

  renderRepositories = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRepositoriesListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return ''
    }
  }

  setActivelanguageFilterId = newFilterId => {
    this.setState(
      {
        activeLanguageFilterId: newFilterId,
      },
      this.getReposotries,
    )
  }

  renderLanguageFilterList = () => {
    const {activeLanguageFilterId} = this.state

    return (
      <ul>
        {languageFiltersData.map(each => (
          <LanguageFilterItem
            key={each.id}
            languageFilterDetails={each}
            setActivelanguageFilterId={this.setActivelanguageFilterId}
          />
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div>
        <div>
          <h1>Popular</h1>
          {this.renderLanguageFilterList()}
          {this.renderRepositories()}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
// Write your code here
