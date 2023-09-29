export default class MainBean {
  modelLabel: string
  serviceLabel: string
  anyObject: { [key: string]: any } = {}
  dict = {}

  constructor(modelLabel: string, serviceLabel: string, model: any, service: any, dict = {}) {
    this.modelLabel = modelLabel
    this.serviceLabel = serviceLabel
    this.anyObject[this.modelLabel] = model
    this.anyObject[this.serviceLabel] = service
    this.dict = dict
  }
}
