import './autoSuggest.css';

const AutoSuggestListItem = (props) => {
  const { handleSelect, value, style, style3 } = props;

  return (
    <li id={value} className='suggestItem' style={{zIndex: 99, listStyle: 'none', width: "70%", backgroundColor: "white"}} onClick={() => handleSelect({animal: value})} className="itemHover">
      <div className="suggestItem" style={{backgroundColor: "white"}}>
        <strong>{value}</strong>
      </div>
    </li>
  );
};

export default AutoSuggestListItem;
