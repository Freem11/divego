import React, { useContext, useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { ModalContext } from './components/reusables/modal/context';
import PasswordUpdate from './components/newModals/passwordUpdate';
import LayoutMain from './components/layout/main';
import DiveSite from './components/newModals/diveSite';
import LayoutPage from './components/layout/page';
import PageDiveSite from './components/pages/divesite';
import PageMap from './components/pages/map';
import PageUserProfile from './components/pages/userProfile';

const ShowModal = ({ component }: { component: React.FC<any> }): JSX.Element | null => {
  const { modalShow } = useContext(ModalContext);
  useEffect(() => {
    modalShow(component);
  }, []);
  return null;
};

export const AppRoutes = {
  home:        '/',
  account:     () => `/account`,
  userProfile: (id: string | number) => `/user/${id}`,
  diveSite:    (id: string | number) => `/divesites/${id}`,

};

const routes = [


  {
    path:     '*',
    element:  <LayoutPage />,
    children: [
      { index: true, element: <PageMap /> },

      {
        path:     'account', children: [
          { index: true, element: <PageUserProfile /> },
          { path:    'password', element: <ShowModal component={PasswordUpdate} /> },
        ],
      },
      {
        path: 'divesites/:id', element: <PageDiveSite />,
      },
    ],
  },
];


export default () => useRoutes(routes);
