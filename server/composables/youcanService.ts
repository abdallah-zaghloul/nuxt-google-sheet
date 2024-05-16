import { Session } from "../utils/types";

export default class youcanService {

  private static instance?: youcanService
  private session: Session

  private tokenType: string
  private urls: {
    base: string,
    subscribe: string,
    list: string,
    syncOrderCallback: string,
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
    this.urls = {
      base: process.env.YOUCAN_BASE_URL!,
      subscribe: `${process.env.YOUCAN_BASE_URL!}/resthooks/subscribe`,
      list: `${process.env.YOUCAN_BASE_URL!}/resthooks/list`,
      syncOrderCallback: process.env.YOUCAN_SYNC_ORDER_CALLBACK_URL!
    }

    this.events = {
      orderCreate: 'order.create'
    }
  }

  private call(url: string, options?: RequestInit): Promise<Response> {
    return fetch(url, {
      ...options,
      headers: {
        Authorization: `${this.tokenType} ${this.session.accessToken} `,
        'Content-Type': 'application/json',
      },
    })
  }

  public listSubscriptions(): Promise<Response> {
    return this.call(this.urls.list)
  }

  private subscribe(reqBody: { target_url: string, event: string }): Promise<Response> {
    return this.call(this.urls.subscribe, {
      method: 'POST',
      body: JSON.stringify(reqBody)
    })
  }

  public subscribeCreatedOrder(): Promise<Boolean> {
    return this.subscribe({
      target_url: this.urls.syncOrderCallback,
      event: this.events.orderCreate
    }).then(
      res => res.ok,
    )
  }

}