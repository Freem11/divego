import "./autoSuggest.css";

const AutoSuggestListItem = (props) => {
  const { handleSelect, value, style, style3 } = props;

  return (
    <li id={value} style={{...style}} onClick={() => handleSelect(value)} className="itemHover">
        <div style={{...style3}}>
          <strong>{value}</strong>
        </div>
    </li>
  );
};

export default AutoSuggestListItem;
