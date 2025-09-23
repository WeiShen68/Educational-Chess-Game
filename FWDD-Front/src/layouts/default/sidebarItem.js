import {
  CircleIcon,
  KeyIcon,
  BugIcon,
} from 'vue-tabler-icons';

const sidebarItem = [
  { header: 'Dashboard' },
  {
    title: 'Play',
    icon: 'mdi-gamepad-square',
    to: '/dashboard'
  },
  { divider: true },
  // { header: 'G1 Title' },
  // {
  //   title: 'G2',
  //   icon: KeyIcon,
  //   to: '/auth',
  //   children: [
  //     {
  //       title: 'G3',
  //       icon: CircleIcon,
  //       to: '/UNKNOWN'
  //     },
  //     {
  //       title: 'G3',
  //       icon: CircleIcon,
  //       to: '/UNKNOWN'
  //     }
  //   ]
  // },
  // { divider: true },
  {
    title: 'Error 404',
    icon: BugIcon,
    to: '/pages/error'
  },
  // {
  //   title: 'Page',
  //   icon: 'mdi-file-outline',
  //   to: '/page'
  // },
  {
    title: 'Switch User',
    icon: 'mdi-login-variant',
    to: '/login'
  },
  {
    title: 'Registration',
    icon: 'mdi-account-plus',
    to: '/register'
  },
];

export default sidebarItem;