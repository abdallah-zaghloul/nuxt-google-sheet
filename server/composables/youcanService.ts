import { Session } from "../utils/types";

export default class youcanService {

  private static instance?: youcanService
  private session: Session

  private tokenType: string
  private webhookUrls: {
    subscribe: string,
    list: string
  }
  private events: {
    orderCreate: string
  }

  //singleton
  public static init(session: Session) {
    return youcanService.instance ??= (new youcanService(session))
  }

  //singleton private constructor
  private constructor(session: Session) {
    this.session = session as Session

    //youcan static options
    this.tokenType = 'Bearer'
    this.webhookUrls = {
      subscribe: 'https://api.youcan.shop/resthooks/subscribe',
      list: 'https://api.youcan.shop/resthooks/list'
    }

    this.events = {
      orderCreate: 'order.create'
    }
  }

  private call(url: string, options?: RequestInit) {
    return fetch(url, {
      ...options,
      headers: {
        Authorization: `${this.tokenType} ${this.session.accessToken}`,
        'Content-Type': 'application/json'
      },
    })
  }

  public listSubscriptions() {
    return this.call(this.webhookUrls.list)
  }

  private subscribe(reqBody: { targetUrl: string, event: string }) {
    return this.call(this.webhookUrls.subscribe, {
      method: 'POST',
      body: JSON.stringify(reqBody)
    })
  }

  public async subscribeCreatedOrder() {
    const res = await this.subscribe({
      targetUrl: process.env.YOUCAN_SYNC_ORDER_CALLBACK_URL!,
      event: this.events.orderCreate
    })
    console.log(res)
    return res
  }
}