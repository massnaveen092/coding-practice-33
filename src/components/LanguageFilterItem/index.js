// Write your code here
const LanguageFilterItem = props => {
  const {languageFilterDetails, setActivelanguageFilterId} = props
  const {id, language} = languageFilterDetails
  const onclickImage = () => {
    setActivelanguageFilterId(id)
  }
  return (
    <li>
      <button type="button" onClick={onclickImage}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
