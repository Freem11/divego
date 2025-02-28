import React, { useContext, useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { ModalContext } from './components/reusables/modal/context';
import PasswordUpdate from './components/newModals/passwordUpdate';
import LayoutMain from './components/layout/main';

const ShowModal = ({ component }: { component: React.FC<any> }): JSX.Element | null => {
  const { modalShow } = useContext(ModalContext);
  useEffect(() => {
    modalShow(component);
  }, []);
  return null;
};

const routes = [
  {
    path:     '*',
    element:  <LayoutMain />,
    children: [
      {
        path:     'account', children: [
          { path:    'password', element: <ShowModal component={PasswordUpdate} /> },
        ],
      },
    ],
  },
];

export default () => useRoutes(routes);
