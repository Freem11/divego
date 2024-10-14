import React, { useState, useContext } from 'react';
import { Form } from 'reactstrap';
import TextField from '@mui/material/TextField';
import { adminCheck } from '../supabaseCalls/adminSupabaseCalls';
// import { adminCheck } from "../axiosCalls/adminAxiosCalls";
import { useNavigate } from 'react-router-dom';
import { AdminContext } from './contexts/adminContext';

export default function AdminPortal() {
  let navigate = useNavigate();
  const [formVal, setFormVal] = useState('');
  const { setAdminStat } = useContext(AdminContext);
  const handleChange = (e) => {
    setFormVal(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let adminResult = await adminCheck(formVal);

    if (adminResult === 'green') {
      setAdminStat(true);
      navigate('/admin');
    }

    return;
  };

  return (
    <div
      style={{
        '&.selected':       { opacity: '80%' },
        '&.selected:hover': { opacity: '80%' },
        '&:hover':          { opacity: '80%' },
        'backgroundColor':  'white',
        'width':            '240px',
        'opacity':          '70%',
        'borderRadius':     '10px',
        'paddingTop':       '2px',
      }}
    >
      <Form onSubmit={handleSubmit} style={{ width: '240px' }}>
        <TextField
          id="standard-basic"
          label="Enter Password..."
          variant="standard"
          onChange={handleChange}
          value={formVal}
          sx={{
            '&.Mui-selected':       { opacity: '80%' },
            '&.Mui-selected:hover': { opacity: '80%' },
            '&:hover':              { opacity: '80%' },
            'height':               'auto',
            'width':                '230px',
            'backgroundColor':      'white',
            'opacity':              '70%',
            'borderRadius':         '10px',
            'marginLeft':           '10px',
          }}
        />
      </Form>
    </div>
  );
}
