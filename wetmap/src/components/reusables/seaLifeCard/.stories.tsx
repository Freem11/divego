// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import SeaLifeCard from './view';


const meta: Meta<typeof SeaLifeCard> = {
  title:      'Components/Reusables/SeaLifeCard',
  component:  SeaLifeCard,
  tags:       ['autodocs'],
  args:       {},
  decorators: [
    Story => (
      <div style={{ width: '450px', border: '1px solid red' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SeaLifeCard>;


export const FromDiveSite: Story = {
  args: {
    pic: {
      id:           1038,
      created_at:   '2024-10-19T17:38:30.200283+00:00',
      photoFile:    'animalphotos/public/1729354759387.jpg',
      label:        'Panamic Fanged Blenny',
      dateTaken:    '2024-10-02',
      latitude:     24.8208405589444,
      longitude:    -110.578602254391,
      month:        10,
      UserID:       'fca9a8c0-9517-4c06-a6c5-4baf3baaf604',
      UserName:     'L. Elliott',
      likecount:    3872,
      likedbyuser:  false,
      likeid:       null,
      commentcount: 1233,
    },
    countOfLikes: 3872,
    picLiked:     false,
    isShowAuthor: true,
  },
};

export const FromUserProfile: Story = {
  args: {
    pic: {
      id:           1038,
      created_at:   '2024-10-19T17:38:30.200283+00:00',
      photoFile:    'animalphotos/public/1729354759387.jpg',
      label:        'Panamic Fanged Blenny',
      dateTaken:    '2024-10-02',
      latitude:     24.8208405589444,
      longitude:    -110.578602254391,
      month:        10,
      UserID:       'fca9a8c0-9517-4c06-a6c5-4baf3baaf604',
      UserName:     'L. Elliott',
      likecount:    3872,
      likedbyuser:  false,
      likeid:       null,
      commentcount: 1233,
    },
    countOfLikes: 3872,
    picLiked:     false,
    isShowAuthor: false,
  },
};

export const LikedByUser: Story = {
  args: {
    pic: {
      id:           1038,
      created_at:   '2024-10-19T17:38:30.200283+00:00',
      photoFile:    'animalphotos/public/1729354759387.jpg',
      label:        'Panamic Fanged Blenny',
      dateTaken:    '2024-10-02',
      latitude:     24.8208405589444,
      longitude:    -110.578602254391,
      month:        10,
      UserID:       'fca9a8c0-9517-4c06-a6c5-4baf3baaf604',
      UserName:     'L. Elliott',
      likecount:    3872,
      likedbyuser:  true,
      likeid:       null,
      commentcount: 1233,
    },
    countOfLikes: 3872,
    picLiked:     true,
    isShowAuthor: true,
  },
};
