// ** Mock
import mock from 'src/@fake-db/mock'

// ** Types
import { PartnersType } from 'src/french-tontine/types/apps/partnerTypes'

const data: { partners: PartnersType[] } = {
  partners: [
    {
      id: 1,
      name: 'Galen Slixby',
      email: 'gslixby0@abc.net.au',
      avatar: '',
      status: 'disabled',
      avatarColor: 'primary'
    },
    {
      id: 2,
      name: 'Halsey Redmore',
      email: 'hredmore1@imgur.com',
      avatar: '/images/avatars/3.png',
      status: 'activated'
    },
    {
      id: 3,
      name: 'Marjory Sicely',
      email: 'msicely2@who.int',
      avatar: '/images/avatars/1.png',
      status: 'activated'
    },
    {
      id: 4,
      name: 'Cyrill Risby',
      email: 'crisby3@wordpress.com',
      avatar: '/images/avatars/3.png',
      status: 'disabled'
    },
    {
      id: 5,
      name: 'Maggy Hurran',
      email: 'mhurran4@yahoo.co.jp',
      avatar: '/images/avatars/1.png',
      status: 'activated'
    },
    {
      id: 6,
      name: 'Silvain Halstead',
      email: 'shalstead5@shinystat.com',
      avatar: '',
      status: 'activated',
      avatarColor: 'error'
    },
    {
      id: 7,
      name: 'Breena Gallemore',
      email: 'bgallemore6@boston.com',
      avatar: '',
      status: 'activated',
      avatarColor: 'warning'
    },
    {
      id: 8,
      name: 'Kathryne Liger',
      email: 'kliger7@vinaora.com',
      avatar: '/images/avatars/4.png',
      status: 'activated'
    },
    {
      id: 9,
      name: 'Franz Scotfurth',
      email: 'fscotfurth8@dailymotion.com',
      avatar: '/images/avatars/2.png',
      status: 'activated'
    },
    {
      id: 10,
      name: 'Jillene Bellany',
      email: 'jbellany9@kickstarter.com',
      avatar: '/images/avatars/5.png',
      status: 'disabled'
    },
    {
      id: 11,
      name: 'Jonah Wharlton',
      email: 'jwharltona@oakley.com',
      avatar: '/images/avatars/4.png',
      status: 'disabled'
    },
    {
      id: 12,
      name: 'Seth Hallam',
      email: 'shallamb@hugedomains.com',
      avatar: '/images/avatars/5.png',
      status: 'activated'
    },
    {
      id: 13,
      name: 'Yoko Pottie',
      email: 'ypottiec@privacy.gov.au',
      avatar: '/images/avatars/7.png',
      status: 'disabled'
    },
    {
      id: 14,
      name: 'Maximilianus Krause',
      email: 'mkraused@stanford.edu',
      avatar: '/images/avatars/6.png',
      status: 'activated'
    },
    {
      id: 15,
      name: 'Zsazsa McCleverty',
      email: 'zmcclevertye@soundcloud.com',
      avatar: '/images/avatars/2.png',
      status: 'activated'
    },
    {
      id: 16,
      name: 'Bentlee Emblin',
      email: 'bemblinf@wired.com',
      avatar: '/images/avatars/6.png',
      status: 'activated'
    },
    {
      id: 17,
      name: 'Brockie Myles',
      email: 'bmylesg@amazon.com',
      avatar: '',
      status: 'activated',
      avatarColor: 'success'
    },
    {
      id: 18,
      name: 'Bertha Biner',
      email: 'bbinerh@mozilla.com',
      avatar: '/images/avatars/7.png',
      status: 'activated'
    },
    {
      id: 19,
      name: 'Travus Bruntjen',
      email: 'tbruntjeni@sitemeter.com',
      avatar: '',
      status: 'activated',
      avatarColor: 'primary'
    },
    {
      id: 20,
      name: 'Wesley Burland',
      email: 'wburlandj@uiuc.edu',
      avatar: '/images/avatars/6.png',
      status: 'disabled'
    },
    {
      id: 21,
      name: 'Selina Kyle',
      email: 'irena.dubrovna@wayne.com',
      avatar: '/images/avatars/1.png',
      status: 'activated'
    },
    {
      id: 22,
      name: 'Jameson Lyster',
      email: 'jlysterl@guardian.co.uk',
      avatar: '/images/avatars/8.png',
      status: 'disabled'
    },
    {
      id: 23,
      name: 'Kare Skitterel',
      email: 'kskitterelm@ainyx.com',
      avatar: '/images/avatars/3.png',
      status: 'activated'
    },
    {
      id: 24,
      name: 'Cleavland Hatherleigh',
      email: 'chatherleighn@washington.edu',
      avatar: '/images/avatars/2.png',
      status: 'activated'
    },
    {
      id: 25,
      name: 'Adeline Micco',
      email: 'amiccoo@whitehouse.gov',
      avatar: '',
      status: 'activated',
      avatarColor: 'error'
    },
    {
      id: 26,
      name: 'Hugh Hasson',
      email: 'hhassonp@bizjournals.com',
      avatar: '/images/avatars/4.png',
      status: 'disabled'
    },
    {
      id: 27,
      name: 'Germain Jacombs',
      email: 'gjacombsq@jigsy.com',
      avatar: '/images/avatars/5.png',
      status: 'activated'
    },
    {
      id: 28,
      name: 'Bree Kilday',
      email: 'bkildayr@mashable.com',
      avatar: '',
      status: 'activated',
      avatarColor: 'warning'
    },
    {
      id: 29,
      name: 'Candice Pinyon',
      email: 'cpinyons@behance.net',
      avatar: '/images/avatars/7.png',
      status: 'activated'
    },
    {
      id: 30,
      name: 'Isabel Mallindine',
      email: 'imallindinet@shinystat.com',
      avatar: '',
      status: 'activated',
      avatarColor: 'info'
    },
    {
      id: 31,
      name: 'Gwendolyn Meineken',
      email: 'gmeinekenu@hc360.com',
      avatar: '/images/avatars/1.png',
      status: 'activated'
    },
    {
      id: 32,
      name: 'Rafaellle Snowball',
      email: 'rsnowballv@indiegogo.com',
      avatar: '/images/avatars/5.png',
      status: 'activated'
    },
    {
      id: 33,
      name: 'Rochette Emer',
      email: 'remerw@blogtalkradio.com',
      avatar: '/images/avatars/8.png',
      status: 'activated'
    },
    {
      id: 34,
      name: 'Ophelie Fibbens',
      email: 'ofibbensx@booking.com',
      avatar: '/images/avatars/4.png',
      status: 'activated'
    },
    {
      id: 35,
      name: 'Stephen MacGilfoyle',
      email: 'smacgilfoyley@bigcartel.com',
      avatar: '',
      status: 'activated',
      avatarColor: 'error'
    },
    {
      id: 36,
      name: 'Bradan Rosebotham',
      email: 'brosebothamz@tripadvisor.com',
      avatar: '',
      status: 'disabled',
      avatarColor: 'success'
    },
    {
      id: 37,
      name: 'Skip Hebblethwaite',
      email: 'shebblethwaite10@arizona.edu',
      avatar: '/images/avatars/1.png',
      status: 'disabled'
    },
    {
      id: 38,
      name: 'Moritz Piccard',
      email: 'mpiccard11@vimeo.com',
      avatar: '/images/avatars/1.png',
      status: 'disabled'
    },
    {
      id: 39,
      name: 'Tyne Widmore',
      email: 'twidmore12@bravesites.com',
      avatar: '',
      status: 'activated',
      avatarColor: 'primary'
    },
    {
      id: 40,
      name: 'Florenza Desporte',
      email: 'fdesporte13@omniture.com',
      avatar: '/images/avatars/6.png',
      status: 'activated'
    },
    {
      id: 41,
      name: 'Edwina Baldetti',
      email: 'ebaldetti14@theguardian.com',
      avatar: '',
      status: 'activated',
      avatarColor: 'info'
    },
    {
      id: 42,
      name: 'Benedetto Rossiter',
      email: 'brossiter15@craigslist.org',
      avatar: '',
      status: 'disabled',
      avatarColor: 'warning'
    },
    {
      id: 43,
      name: 'Micaela McNirlan',
      email: 'mmcnirlan16@hc360.com',
      avatar: '',
      status: 'disabled',
      avatarColor: 'error'
    },
    {
      id: 44,
      name: 'Vladamir Koschek',
      email: 'vkoschek17@abc.net.au',
      avatar: '',
      status: 'activated',
      avatarColor: 'success'
    },
    {
      id: 45,
      name: 'Corrie Perot',
      email: 'cperot18@goo.ne.jp',
      avatar: '/images/avatars/3.png',
      status: 'activated'
    },
    {
      id: 46,
      name: 'Saunder Offner',
      email: 'soffner19@mac.com',
      avatar: '',
      status: 'activated',
      avatarColor: 'primary'
    },
    {
      id: 47,
      name: 'Karena Courtliff',
      email: 'kcourtliff1a@bbc.co.uk',
      avatar: '/images/avatars/1.png',
      status: 'activated'
    },
    {
      id: 48,
      name: 'Onfre Wind',
      email: 'owind1b@yandex.ru',
      avatar: '',
      status: 'activated',
      avatarColor: 'error'
    },
    {
      id: 49,
      name: 'Paulie Durber',
      email: 'pdurber1c@gov.uk',
      avatar: '',
      status: 'disabled',
      avatarColor: 'warning'
    },
    {
      id: 50,
      name: 'Beverlie Krabbe',
      email: 'bkrabbe1d@home.pl',
      avatar: '/images/avatars/2.png',
      status: 'activated'
    }
  ]
}

// POST: Add new partners
mock.onPost('/apps/partner/add-partner').reply(config => {
  // Get event from post data
  const partner = JSON.parse(config.data).data

  const lastId = Math.max(...data.partners.map(u => u.id), 0)

  partner.id = lastId + 1

  data.partners.unshift({ ...partner, avatar: '', avatarColor: 'primary', status: 'activated' })

  return [201, { partner }]
})

// PUT: Update partner
mock.onPut('/apps/partner/update-partner').reply(config => {
  // Get event from post data
  const partner = JSON.parse(config.data).data

  const partnerIndex = data.partners.findIndex(t => t.id === partner.id)

  console.log('Befor  ::::::::::::::::::::: data.partners[partnerIndex] ----- ', data.partners[partnerIndex])

  data.partners[partnerIndex] = { ...data.partners[partnerIndex], ...partner }

  console.log('After  ::::::::::::::::::::: data.partners[partnerIndex] ----- ', data.partners[partnerIndex])

  return [201, { partner }]
})

// GET: DATA
mock.onGet('/apps/partners/list').reply(config => {
  const { q = '', status = null } = config.params ?? ''

  const queryLowered = q.toLowerCase()

  const filteredData = data.partners.filter(
    partner =>
      (partner.name.toLowerCase().includes(queryLowered) ||
        partner.email.toLowerCase().includes(queryLowered) ||
        partner.status.toLowerCase().includes(queryLowered)) &&
      partner.status === (status || partner.status)
  )

  return [
    200,
    {
      allData: data.partners,
      partners: filteredData,
      params: config.params,
      total: filteredData.length
    }
  ]
})
