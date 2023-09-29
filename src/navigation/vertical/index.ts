// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

// import Role from 'src/french-tontine/logic/models/Role'

const navigation = (): VerticalNavItemsType => {
  const userData = JSON.parse(window.localStorage.getItem('frenchTontineUserData') as string)

  console.log('userData.roless : ', userData.roless)

  const Dashboard = {
    title: 'Dashboard',
    icon: 'tabler:smart-home',
    path: '/french-tontine/dashboard'
  }

  const platformRegistration = {
    title: "Demande d'Inscription",
    icon: 'tabler:registered',
    path: '/french-tontine/registrations/list'
  }

  const ListOfPOS = {
    title: 'Gestion de la tontine',
    icon: 'tabler:businessplan',
    children: [
      {
        title: 'Liste des abonnés',
        path: '/french-tontine/tontines/subscribers'
      },
      {
        title: 'Liste des candidats',
        path: '/french-tontine/tontines/candidates'
      },
      {
        title: 'Groupe de tontine',
        path: '/french-tontine/tontines/list'
      }
    ]
  }

  const UsersList = {
    title: 'Gestion des utilisateurs',
    icon: 'tabler:users-group',
    path: '/french-tontine/users/list'
  }

  const navArray: any = [
    Dashboard,
    {
      sectionTitle: 'Tontine & Offres'
    }
  ]

  // if (userData.roles.some((role: Role) => role.name === 'SUPER_ADMIN')) {
  //   navArray.push(Partners)
  //   navArray.push(UsersList)
  // } else if (userData.roles.some((role: Role) => role.name === 'ADMIN')) {
  //   navArray.push(platformRegistration)
  //   navArray.push(ListOfPOS)
  //   navArray.push(ListOfAgencies)
  //   navArray.push(UsersList)
  // } else if (userData.roles.some((role: Role) => role.name === 'DIRECTION')) {
  //   navArray.push(platformRegistration)
  //   navArray.push(ListOfPOS)
  //   navArray.push(ListOfAgencies)
  // } else if (userData.roles.some((role: Role) => role.name === 'AGENCY')) {
  //   // Tgcom@*1
  //   navArray.push(platformRegistration)
  //   navArray.push(ListOfPOS)
  // }

  /*
    Demande d'inscription
    Tontine
    Utilisateurs
  */

  navArray.push(platformRegistration)
  navArray.push(ListOfPOS)
  navArray.push(UsersList)

  return navArray
}

export default navigation
