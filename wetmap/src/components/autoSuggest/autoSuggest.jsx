import React from 'react';
import AutoSuggestListItem from './autoSuggestListItem';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SearchIcon from '@mui/icons-material/Search';
import './autoSuggest.css';
import InputField from '../reusables/inputField';

export default function AutoSuggest(props) {
	const {
		placeholder,
		value,
		list,
		clear,
		handleSelect,
		handleChange,
		style,
		style1,
		style2,
		style3,
	} = props;

	return (
		<div className='column col-11'>
			<InputField
        className="suggestInput"
        placeholder={placeholder}
        name={placeholder}
        value={value}
        onChange={handleChange}
      />
			{/* <div className='relative flex-row'>
				<div className='absolute z-10 left-3 top-1/2 transform -translate-y-1/2 text-gray-400'>
					<SearchIcon  />
				</div>

				<input
					type='search'
					className='form-input pl-10' // Adjust padding to make space for the icon
					value={value}
					onChange={handleChange}
					placeholder='Search Places...'
				/>
			</div> */}
			{value.length > 1 && (
				<div variant='text' id='XButton' onClick={clear}>
					<HighlightOffIcon
						sx={{
							color: 'white',
							height: '2vh',
							width: '2vw',
							position: 'absolute',
						}}
					></HighlightOffIcon>
				</div>
			)}

			<div
				style={{
					...style1,
					height: 'auto',
					zIndex: '100',
					position: 'absolute',
				}}
			>
				{list.length > 0 &&
					list.map((element) => {
						return (
							<AutoSuggestListItem
								key={element}
								value={element}
								handleSelect={handleSelect}
								style={style2}
								style3={style3}
							/>
						);
					})}
			</div>
		</div>
	);
}
