// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import SiteSelectorView from './view';


const meta: Meta<typeof SiteSelectorView> = {
  title:      'Components/Reusables/SiteSelector',
  component:  SiteSelectorView,
  tags:       ['autodocs'],
  args:       {},
  decorators: [
    Story => (
      <div style={{ width: '400px', border: '1px solid red' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SiteSelectorView>;


export const NoSites: Story = {
  args: {
    sites: [],
  },
};

export const Error: Story = {
  args: {
    sites: [],
    error: true,
  },
};

export const OneSites: Story = {
  args: {
    sites: [
      {
        id:                   1,
        created_at:           '2022-09-27T15:27:00+00:00',
        name:                 'Whytecliff Park',
        lat:                  49.3714,
        lng:                  -123.2925,
        userid:               'f917ae18-9467-406a-9671-6124731ce5e0',
        username:             'Scuba SEAsons',
        region:               '',
        divesiteprofilephoto: '',
        divesitebio:          '',
        photo:                '',
        newusername:          '',
      },
    ],
  },
};

export const MultipleSites: Story = {
  args: {
    sites: [
      {
        id:                   1,
        created_at:           '2022-09-27T15:27:00+00:00',
        name:                 'Whytecliff Park',
        lat:                  49.3714,
        lng:                  -123.2925,
        userid:               'f917ae18-9467-406a-9671-6124731ce5e0',
        username:             'Scuba SEAsons',
        region:               '',
        divesiteprofilephoto: '',
        divesitebio:          '',
        photo:                '',
        newusername:          '',
      },
      {
        id:                   2,
        created_at:           '2022-09-27T15:27:36+00:00',
        name:                 'Porteau Cove',
        lat:                  49.5615,
        lng:                  -123.236944,
        userid:               'f917ae18-9467-406a-9671-6124731ce5e0',
        username:             'Scuba SEAsons',
        region:               '',
        divesiteprofilephoto: '',
        divesitebio:          '',
        photo:                '',
        newusername:          '',
      },
      {
        id:                   5,
        created_at:           '2022-09-27T16:15:50+00:00',
        name:                 'Kelvin Grove',
        lat:                  49.4495,
        lng:                  -123.2405,
        userid:               'f917ae18-9467-406a-9671-6124731ce5e0',
        username:             'Scuba SEAsons',
        region:               '',
        divesiteprofilephoto: '',
        divesitebio:          '',
        photo:                '',
        newusername:          '',
      },
      {
        id:                   6,
        created_at:           '2022-09-27T16:16:42+00:00',
        name:                 'HMCS Annapolis Wreck',
        lat:                  49.449722,
        lng:                  -123.329,
        userid:               'f917ae18-9467-406a-9671-6124731ce5e0',
        username:             'Scuba SEAsons',
        region:               '',
        divesiteprofilephoto: '',
        divesitebio:          '',
        photo:                '',
        newusername:          '',
      },
    ],
  },
};

export const OverflowingSites: Story = {
  args: {
    sites: [
      {
        id:                   1,
        created_at:           '2022-09-27T15:27:00+00:00',
        name:                 'Whytecliff Park',
        lat:                  49.3714,
        lng:                  -123.2925,
        userid:               'f917ae18-9467-406a-9671-6124731ce5e0',
        username:             'Scuba SEAsons',
        region:               '',
        divesiteprofilephoto: '',
        divesitebio:          '',
        photo:                '',
        newusername:          '',
      },
      {
        id:                   2,
        created_at:           '2022-09-27T15:27:36+00:00',
        name:                 'Porteau Cove',
        lat:                  49.5615,
        lng:                  -123.236944,
        userid:               'f917ae18-9467-406a-9671-6124731ce5e0',
        username:             'Scuba SEAsons',
        region:               '',
        divesiteprofilephoto: '',
        divesitebio:          '',
        photo:                '',
        newusername:          '',
      },
      {
        id:                   5,
        created_at:           '2022-09-27T16:15:50+00:00',
        name:                 'Kelvin Grove',
        lat:                  49.4495,
        lng:                  -123.2405,
        userid:               'f917ae18-9467-406a-9671-6124731ce5e0',
        username:             'Scuba SEAsons',
        region:               '',
        divesiteprofilephoto: '',
        divesitebio:          '',
        photo:                '',
        newusername:          '',
      },
      {
        id:                   6,
        created_at:           '2022-09-27T16:16:42+00:00',
        name:                 'HMCS Annapolis Wreck',
        lat:                  49.449722,
        lng:                  -123.329,
        userid:               'f917ae18-9467-406a-9671-6124731ce5e0',
        username:             'Scuba SEAsons',
        region:               '',
        divesiteprofilephoto: '',
        divesitebio:          '',
        photo:                '',
        newusername:          '',
      },
      {
        id:                   297,
        created_at:           '2023-08-11T23:39:43.714661+00:00',
        name:                 'Seymour Bay',
        lat:                  49.3430973,
        lng:                  -123.3546737,
        userid:               'f917ae18-9467-406a-9671-6124731ce5e0',
        username:             'Scuba SEAsons',
        region:               '',
        divesiteprofilephoto: '',
        divesitebio:          '',
        photo:                '',
        newusername:          '',
      },
      {
        id:                   8830,
        created_at:           '2024-05-12T17:02:54.177433+00:00',
        name:                 'Ansell Place',
        lat:                  49.3959333333333,
        lng:                  -123.2516,
        userid:               'f917ae18-9467-406a-9671-6124731ce5e0',
        username:             '',
        region:               '',
        divesiteprofilephoto: '',
        divesitebio:          '',
        photo:                '',
        newusername:          '',
      },
      {
        id:                   8832,
        created_at:           '2024-05-12T17:02:54.177433+00:00',
        name:                 'Bowyer Island',
        lat:                  49.41945,
        lng:                  -123.268383333333,
        userid:               'f917ae18-9467-406a-9671-6124731ce5e0',
        username:             '',
        region:               '',
        divesiteprofilephoto: '',
        divesitebio:          '',
        photo:                '',
        newusername:          '',
      },
      {
        id:                   8834,
        created_at:           '2024-05-12T17:02:54.177433+00:00',
        name:                 'Christe Islet',
        lat:                  49.49945,
        lng:                  -123.30195,
        userid:               'f917ae18-9467-406a-9671-6124731ce5e0',
        username:             '',
        region:               '',
        divesiteprofilephoto: '',
        divesitebio:          '',
        photo:                '',
        newusername:          '',
      },
      {
        id:                   8836,
        created_at:           '2024-05-12T17:02:54.177433+00:00',
        name:                 'Copper Cove Road',
        lat:                  49.3783333333333,
        lng:                  -123.279816666667,
        userid:               'f917ae18-9467-406a-9671-6124731ce5e0',
        username:             '',
        region:               '',
        divesiteprofilephoto: '',
        divesitebio:          '',
        photo:                '',
        newusername:          '',
      },
      {
        id:                   8840,
        created_at:           '2024-05-12T17:02:54.177433+00:00',
        name:                 'Lookout Point',
        lat:                  49.3758,
        lng:                  -123.289116666667,
        userid:               'f917ae18-9467-406a-9671-6124731ce5e0',
        username:             '',
        region:               '',
        divesiteprofilephoto: '',
        divesitebio:          '',
        photo:                '',
        newusername:          '',
      },
      {
        id:                   8844,
        created_at:           '2024-05-12T17:02:54.177433+00:00',
        name:                 'Pam Rocks',
        lat:                  49.4832833333333,
        lng:                  -123.2849,
        userid:               'f917ae18-9467-406a-9671-6124731ce5e0',
        username:             '',
        region:               '',
        divesiteprofilephoto: '',
        divesitebio:          '',
        photo:                '',
        newusername:          '',
      },
    ],
  },
};

export const loading: Story = {
  args: {
    sites: null,
  },
};
