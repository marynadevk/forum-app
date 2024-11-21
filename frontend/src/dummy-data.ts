import { IPost, IUser, IUserProfile } from './interfaces';

export const USERS: IUser[] = [
  {
    id: '101',
    username: 'Alice Green',
    avatar: '/images/avatars/avatar1.svg',
  },
  {
    id: '102',
    username: 'Bob Smith',
    avatar: '/images/avatars/avatar2.svg',
  },
  {
    id: '103',
    username: 'Charlie Johnson',
    avatar: '/images/avatars/avatar3.svg',
  },
  {
    id: '201',
    username: 'Dave Wilson',
    avatar: '/images/avatars/avatar4.svg',
  },
  {
    id: '202',
    username: 'Eve Adams',
    avatar: '/images/avatars/avatar5.svg',
  },
  {
    id: '203',
    username: 'Frank Hall',
    avatar: '/images/avatars/avatar6.svg',
  },
  {
    id: '204',
    username: 'Grace Lee',
    avatar: '/images/avatars/avatar7.svg',
  },
  {
    id: '205',
    username: 'Helen King',
    avatar: '/images/avatars/avatar8.svg',
  },
  {
    id: '206',
    username: 'Ian Scott',
    avatar: '/images/avatars/avatar9.svg',
  },
  {
    id: '207',
    username: 'Jane Doe',
    avatar: '/images/avatars/avatar10.svg',
  },
  {
    id: '208',
    username: 'Kyle Morris',
    avatar: '/images/avatars/avatar1.svg',
  },
  {
    id: '209',
    username: 'Laura Young',
    avatar: '/images/avatars/avatar2.svg',
  },
  {
    id: '210',
    username: 'Mike Brown',
    avatar: '/images/avatars/avatar3.svg',
  },
  {
    id: '211',
    username: 'Nina Taylor',
    avatar: '/images/avatars/avatar4.svg',
  },
  {
    id: '212',
    username: 'Oscar White',
    avatar: '/images/avatars/avatar5.svg',
  },
];
export const USERS_PROFILES: IUserProfile[] = [
  {
    id: '101',
    username: 'Alice Green',
    avatar: '/images/avatars/avatar1.svg',
    reactions: 0,
    posts: [],
  },
  {
    id: '102',
    username: 'Bob Smith',
    avatar: '/images/avatars/avatar2.svg',
    reactions: 0,
    posts: [],
  },
  {
    id: '103',
    username: 'Charlie Johnson',
    avatar: '/images/avatars/avatar3.svg',
    reactions: 0,
    posts: [],
  },
  {
    id: '201',
    username: 'Dave Wilson',
    avatar: '/images/avatars/avatar4.svg',
    reactions: 0,
    posts: [],
  },
  {
    id: '202',
    username: 'Eve Adams',
    avatar: '/images/avatars/avatar5.svg',
    reactions: 0,
    posts: [],
  },
  {
    id: '203',
    username: 'Frank Hall',
    avatar: '/images/avatars/avatar6.svg',
    reactions: 0,
    posts: [],
  },
  {
    id: '204',
    username: 'Grace Lee',
    avatar: '/images/avatars/avatar7.svg',
    reactions: 0,
    posts: [],
  },
  {
    id: '205',
    username: 'Helen King',
    avatar: '/images/avatars/avatar8.svg',
    reactions: 0,
    posts: [],
  },
  {
    id: '206',
    username: 'Ian Scott',
    avatar: '/images/avatars/avatar9.svg',
    reactions: 0,
    posts: [],
  },
  {
    id: '207',
    username: 'Jane Doe',
    avatar: '/images/avatars/avatar10.svg',
    reactions: 0,
    posts: [],
  },
  {
    id: '208',
    username: 'Kyle Morris',
    avatar: '/images/avatars/avatar1.svg',
    reactions: 0,
    posts: [],
  },
  {
    id: '209',
    username: 'Laura Young',
    avatar: '/images/avatars/avatar2.svg',
    reactions: 0,
    posts: [],
  },
  {
    id: '210',
    username: 'Mike Brown',
    avatar: '/images/avatars/avatar3.svg',
    reactions: 0,
    posts: [],
  },
  {
    id: '211',
    username: 'Nina Taylor',
    avatar: '/images/avatars/avatar4.svg',
    reactions: 0,
    posts: [],
  },
  {
    id: '212',
    username: 'Oscar White',
    avatar: '/images/avatars/avatar5.svg',
    reactions: 0,
    posts: [],
  },
];

export const DUMMY_POSTS: IPost[] = [
  {
    id: '1',
    title: 'How to care for Roses in Winter',
    body: 'Roses are lovely in every season, but winter care is essential for their survival. Make sure to prune your roses before the first frost and cover them with mulch to protect the roots.',
    userId: '101',
    user: USERS.find(user => user.id === '101')!,
    image: '/images/post-img.jpg',
    createdAt: new Date('2024-11-01T12:30:00Z'),
    likes: [
      '101',
      '202',
      '203',
      '204',
      '205',
      '206',
      '207',
      '208',
      '209',
      '210',
    ],
    comments: [
      {
        id: '1',
        postId: '1',
        userId: '201',
        user: USERS.find(user => user.id === '201')!,
        body: "Thanks for the tip! I've been struggling to keep my roses alive in winter.",
        createdAt: new Date('2024-11-01T15:00:00Z'),
        commentLikes: ['201', '202', '206', '207', '208', '209', '210'],
      },
      {
        id: '2',
        postId: '1',
        userId: '202',
        user: USERS.find(user => user.id === '202')!,
        body: "I'll definitely try the mulching technique this year.",
        createdAt: new Date('2024-11-02T09:30:00Z'),
        commentLikes: [
          '201',
          '202',
          '203',
          '204',
          '205',
          '206',
          '207',
          '209',
          '210',
        ],
      },
    ],
  },
  {
    id: '2',
    title: 'The Best Indoor Plants for Low Light',
    body: "If you're looking for houseplants that thrive in low-light conditions, try the snake plant, pothos, or ZZ plant. These plants require minimal care and still add a beautiful green touch to your home.",
    userId: '102',
    user: USERS.find(user => user.id === '102')!,
    image: '/images/post-img.jpg',
    createdAt: new Date('2024-11-05T09:45:00Z'),
    likes: ['203', '204', '205', '211', '212'],
    comments: [
      {
        id: '1',
        postId: '2',
        userId: '203',
        user: USERS.find(user => user.id === '203')!,
        body: "I have a snake plant in my office, and it's doing wonders! Great recommendation.",
        createdAt: new Date('2024-11-06T10:00:00Z'),
        commentLikes: [
          '201',
          '202',
          '203',
          '204',
          '205',
          '206',
          '207',
          '208',
          '209',
          '210',
        ],
      },
      {
        id: '2',
        postId: '2',
        userId: '202',
        user: USERS.find(user => user.id === '202')!,
        body: "I didn't know ZZ plants were so low-maintenance. I'll look into getting one.",
        createdAt: new Date('2024-11-06T12:30:00Z'),
        commentLikes: [
          '201',
          '202',
          '203',
          '204',
          '205',
          '206',
          '207',
          '208',
          '209',
          '210',
        ],
      },
    ],
  },
  {
    id: '3',
    title: 'Tips for Growing Orchids at Home',
    body: 'Orchids need a lot of indirect sunlight and a steady watering routine. Avoid over-watering, and make sure the potting mix has good drainage. Orchids also love humidity, so consider using a humidity tray.',
    userId: '103',
    user: USERS.find(user => user.id === '103')!,
    image: '/images/post-img.jpg',
    createdAt: new Date('2024-10-28T15:00:00Z'),
    likes: ['206', '207', '208', '209', '210'],
    comments: [
      {
        id: '1',
        postId: '3',
        userId: '205',
        user: USERS.find(user => user.id === '205')!,
        body: 'Great advice! I’ve been killing my orchids because I kept over-watering them.',
        createdAt: new Date('2024-10-29T11:00:00Z'),
        commentLikes: ['201', '202', '203'],
        subComments: [
          {
            id: '1',
            postId: '2',
            commentId: '1',
            userId: '203',
            user: USERS.find(user => user.id === '203')!,
            body: "I have a snake plant in my office, and it's doing wonders! Great recommendation.",
            createdAt: new Date('2024-11-06T10:00:00Z'),
            commentLikes: [
              '201',
              '202',
              '203',
              '204',
              '205',
              '206',
              '207',
              '208',
              '209',
              '210',
            ],
          },
          {
            id: '2',
            postId: '2',
            commentId: '1',
            userId: '202',
            user: USERS.find(user => user.id === '202')!,
            body: "I didn't know ZZ plants were so low-maintenance. I'll look into getting one.",
            createdAt: new Date('2024-11-06T12:30:00Z'),
            commentLikes: [
              '201',
              '202',
              '203',
              '204',
              '205',
              '206',
              '207',
              '208',
              '209',
              '210',
            ],
          },
        ],
      },
      {
        id: '2',
        postId: '3',
        commentId: '1',
        userId: '206',
        user: USERS.find(user => user.id === '206')!,
        body: 'I’ll try using a humidity tray. My orchids always seem to dry out.',
        createdAt: new Date('2024-10-30T16:00:00Z'),
        commentLikes: ['204', '205', '206', '207', '208', '209', '210'],
      },
    ],
  },
];
