import "./autoSuggest.css";

const AutoSuggestListItem = (props) => {
  const { handleSelect, value } = props;

  return (
    <li id={value} className="suggestItem" onClick={() => handleSelect(value)}>
      <div id="SuggestionBox">
        <div id="listItems">
          <strong>{value}</strong>
        </div>
      </div>
    </li>
  );
};

export default AutoSuggestListItem;
