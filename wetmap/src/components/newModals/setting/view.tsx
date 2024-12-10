import Collapse from '@mui/material/Collapse';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
// import './settings.css';
import ModalHeader from '../../reusables/modalHeader';
import LargeButton from '../../reusables/button/largeButton';
import ActDelDialog from '../../modals/dialog';
import screenData from '../screenData.json';
import React from 'react';

type SettingsProps = {
  handleLogout: () => void
};

export default function SettingsView(props: SettingsProps) {
  return (
    <div className="flex-column-between full-height">
      <div>
        <div className="d-flex">
          <h1 className="text-clip">{screenData.PicUploader.header}</h1>
        </div>
      </div>
    </div>
  );
}
