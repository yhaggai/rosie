import { auth } from '~src/lib/firebase';

export const routes = [
  // {
  //   path: '/',
  //   name: 'chat',
  //   component: 'chat-app',
  //   metadata: {
  //     title: 'chat app',
  //     titleTemplate: null,
  //     description: 'best way to communicate in your kindergardern'
  //   },
  //   action: async () => {
  //     await import('~src/screens/chat');
  //   }
  // },
  {
    path: '/',
    name: 'chat',
    component: 'chat-app',
    metadata: {
      title: 'chat app',
      titleTemplate: null,
      description: 'best way to communicate in your kindergardern'
    },
    action: async () => {
      console.log('auth.currentUser', auth.currentUser);
      // if (!auth.currentUser) {
      //   window.location.href = '/login';
      //   return;
      // }
      await import('~src/screens/chat');
    }
  },
  {
    path: '/login',
    name: 'login',
    component: 'chat-login-screen',
    metadata: {
      title: 'chat app',
      titleTemplate: null,
      description: 'best way to communicate in your kindergardern'
    },
    action: async () => {
      await import('~src/screens/login-screen');
    }
  }
];
