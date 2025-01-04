// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import CommentsModalView from './view';

const comments = [
  {
    id:          1,
    content:     'Lorem ipsum dolor sit amet',
    username:    'username',
    created_at:  '2022-01-01T00:00:00.000Z',
    photoid:     1,
    replied_to:  null,
    userid:      '1',
  },
  {
    id:          2,
    content:     'Lorem Lorem Lorem',
    username:    'username',
    created_at:  '2022-01-01T00:00:00.000Z',
    photoid:     1,
    replied_to:  null,
    userid:      '1',
  },
  {
    id:          3,
    content:     'Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet',
    username:    'username',
    created_at:  '2022-01-01T00:00:00.000Z',
    photoid:     1,
    replied_to:  null,
    userid:      '1',
  },
  {
    id:          4,
    content:     'AAAAA BBBBB CCCCC',
    username:    'username',
    created_at:  '2022-01-01T00:00:00.000Z',
    photoid:     1,
    replied_to:  null,
    userid:      '1',
  },
];


const meta: Meta<typeof CommentsModalView> = {
  title:      'Components/Modals/Comments',
  component:  CommentsModalView,
  tags:       ['autodocs'],
  args:       { setReplyTo: () => {}, setCommentContent: () => {}, handleCommentInsert: () => {} },
  decorators: [
    Story => (
      <div style={{ width: '500px', height: '650px', border: '1px solid red' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CommentsModalView>;


export const CommentsModal: Story = {
  args: {
    replyTo:        ['test'],
    listOfComments: comments,
  },
};

export const CommentsModalWithCommentsWithReply: Story = {
  args: {
    listOfComments: [...comments, { ...comments[0], replied_to: 1, id: 5, content: 'This is reply' }],
  },
};

export const CommentsModalWithOneLongComment: Story = {
  args: {
    listOfComments: [{ ...comments[0], content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, voluptatem. Dolorum labore totam mollitia, culpa repellendus a repudiandae quibusdam voluptatem atque voluptas facilis sapiente ad ullam enim excepturi consectetur? Consectetur sequi autem similique possimus consequatur vero vitae dicta ut nam, ratione atque, quasi unde debitis eaque! Non adipisci sequi odit totam quod dolorum impedit hic eligendi beatae corrupti libero sint numquam officia, saepe magnam! Libero, corrupti! Odit, quos doloremque ipsum dolore soluta nisi doloribus pariatur iusto iste ducimus sint ipsa, ullam at mollitia harum dicta ad corporis molestias voluptatum voluptates sapiente nihil voluptatibus! Voluptas, optio maxime similique fuga eos itaque accusamus nam consectetur explicabo maiores commodi? Reprehenderit dicta asperiores rem beatae assumenda sed adipisci ut ea laborum, ratione optio aliquam excepturi cupiditate quod repellat corporis quae odit suscipit ad maxime quo id? Magni a labore quos doloribus facilis earum incidunt unde corrupti placeat officiis id et sed provident, nisi porro deleniti dolor ipsam temporibus doloremque molestias maxime veniam harum natus. Quae assumenda magnam ad temporibus nihil neque. Nam in minus cumque quis enim explicabo accusantium ex ut. Animi sapiente cupiditate consequatur aperiam rerum, sint minima ad ut sed reprehenderit, quas ducimus repellat similique sit blanditiis officiis fugiat. Dolore, a et!' }],
  },
};

export const CommentsModalWithNoComments: Story = {
  args: {
    listOfComments: [],
  },
};

export const CommentsModalWithEmptyComments: Story = {
  args: {
    listOfComments: [{ ...comments[0], content: '' }],
  },
};
export const CommentsModalWithMultilineComments: Story = {
  args: {
    listOfComments: [{ ...comments[0], content: 'xdgdfg\nsdfgsd\ng\nsdg\nsdf\ngsdf\ng\nsdfg\nfdsg' }],
  },
};
