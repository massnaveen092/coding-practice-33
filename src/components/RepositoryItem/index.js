// Write your code here
const RepositoryItem = props => {
  const {repositoryDetails} = props
  const {avatharUrl, name, starsCount, forksCount, issuesCount} =
    repositoryDetails

  return (
    <li>
      <img src={avatharUrl} alt={name} />
      <h1>{name}</h1>
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
        />
        <p>{starsCount} stars</p>
      </div>
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
        />
        <p>{forksCount} forks</p>
      </div>
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="failure view"
        />
        <p>{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
