const users = [
  {
    id: '1',
    email: '1@mail.com',
    password: 'password',
    firstName: 'firstName 1',
    lastName: 'lastName 1',
    age: 25
  },
  {
    id: '2',
    email: '2@mail.com',
    password: 'password',
    firstName: 'firstName 2',
    lastName: 'lastName 2',
    age: 25
  },
  {
    id: '3',
    email: '3@mail.com',
    password: 'password',
    firstName: 'firstName 3',
    lastName: 'lastName 3',
    age: 25
  }
];

const posts = [
  {
    id: '1',
    title: 'Post 1',
    body: 'Body 1',
    published: true,
    author: '1'
  },
  {
    id: '2',
    title: 'Post 2',
    body: 'Body 2',
    published: true,
    author: '1'
  },
  {
    id: '3',
    title: 'Post 3',
    body: 'Body 3',
    published: true,
    author: '2'
  }
];

const comments = [
  {
    id: '1',
    text: '1 comment',
    author: '1',
    post: '1'
  },
  {
    id: '2',
    text: '2 comment',
    author: '2',
    post: '2'
  },
  {
    id: '3',
    text: '3 comment',
    author: '2',
    post: '3'
  },
  {
    id: '4',
    text: '4 comment',
    author: '3',
    post: '1'
  }
];

const db = {
  users,
  posts,
  comments
};

export { db as default };