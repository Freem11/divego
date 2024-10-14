import React from 'react';
import { useContext } from 'react';
import { FormGroup } from 'reactstrap';
import InputBase from '@mui/material/InputBase';
import { SearchTextContext } from '../contexts/searchTextContext';
import './photoFilter.css';

export default function PhotoFilterer() {
  const { textvalue, setTextValue } = useContext(SearchTextContext);

  const handleChange = async (e) => {
    console.log(e.target.value);
    setTextValue(e.target.value);
  };

  return (
    <div className="containerF">
      <div className="inputboxF">
        <FormGroup>
          <InputBase
            placeholder="Dive Deeper!"
            type="text"
            name="pullTab"
            value={textvalue}
            onChange={handleChange}
            className="suggestInput"
            inputProps={{
              style: {
                fontSize:        '1vw',
                width:           '20vw',
                textAlign:       'center',
                height:          '5vh',
                backgroundColor: 'white',
                borderRadius:    '1vw',
                pointerEvents:   'auto',
              },
            }}
          />
        </FormGroup>
      </div>
    </div>
  );
}
