import MainModel from './MainModel'

type ProfileAvatarGroupType = {
  name: string
  avatar: string
}

export default class Tontine extends MainModel {
  name: string
  contributionFrequency: string
  contributionAmount: number
  maxParticipants: number
  startDate: Date
  endDate: Date
  description: string

  status: string
  top3Candidate: ProfileAvatarGroupType[]
  candidatesNumber: number
  top3Subscribers: ProfileAvatarGroupType[]
  subscribersNumber: number
  numberOfComments: number
  completedCautization: number
  totalCautization: number

  constructor(
    _id = '-1',
    createdBy = null,
    createdAt = '',
    updatedBy = null,
    updatedAt = '',
    deletedBy = null,
    deletedAt = '',

    name = '',
    description = '',
    startDate = new Date(),
    endDate = new Date(),
    contributionAmount = 0,
    contributionFrequency = '',
    maxParticipants = 0,
    status = '',
    top3Candidate = [],
    candidatesNumber = 0,
    top3Subscribers = [],
    subscribersNumber = 0,
    numberOfComments = 0,
    completedCautization = 0,
    totalCautization = 0
  ) {
    super(_id, createdBy, createdAt, updatedBy, updatedAt, deletedBy, deletedAt)

    this.name = name
    this.description = description
    this.startDate = startDate
    this.endDate = endDate
    this.contributionAmount = contributionAmount
    this.contributionFrequency = contributionFrequency
    this.maxParticipants = maxParticipants
    this.status = status
    this.top3Candidate = top3Candidate
    this.candidatesNumber = candidatesNumber
    this.top3Subscribers = top3Subscribers
    this.subscribersNumber = subscribersNumber
    this.numberOfComments = numberOfComments
    this.completedCautization = completedCautization
    this.totalCautization = totalCautization
  }
}
