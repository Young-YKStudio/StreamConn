import { MdEventAvailable, MdApps } from 'react-icons/md'

const smallIconSize = 'w-4 h-4'

export const notLoggedInLinks = [
  {
    name: 'Login',
    href: '/login',
  },
  {
    name: 'Register',
    href: '/register',
  },
]

export const loggedInLinks = [
  {
    name: 'My Account',
    href: 'myAccount'
  }
]

export const subMenuLinks = [
  {
    name: 'Events',
    href: '/event',
    icon: <MdEventAvailable className={smallIconSize} />
  },
  {

    name: 'Categories',
    href:  '/categories',
    icon: <MdApps className={smallIconSize} />
  }
]

export const supportsLinks = [
  {
    name: 'Help'
  },
  {
    name: 'Guidelines'
  },
  {
    name: 'Security'
  },
  {
    name: 'Privacy Policy'
  },
  {
    name: 'Terms of Service'
  },
]

export const roleBasedLinksTemplate = [
  {
    name: 'Client Memeber',
    href: '/ClientMember'
  },
  {
    name: 'Public',
    href: '/Public'
  },
  {
    name: 'Member',
    href: '/Member'
  },
]