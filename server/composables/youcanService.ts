import { Session, YouCanWebhookSub, YouCanWebhookSubs, YouCanWebhookUnSub } from "../utils/types";

export default class youcanService {

  private static instance?: youcanService
  private session: Session

  private tokenType: string
  private urls: {
    base: string,
    subscribe: string,
    unsubscribe: string,
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
      unsubscribe: `${process.env.YOUCAN_BASE_URL!}/resthooks/unsubscribe`,
      list: `${process.env.YOUCAN_BASE_URL!}/resthooks/list`,
      syncOrderCallback: process.env.YOUCAN_SYNC_ORDER_CALLBACK_URL!
    }

    this.events = {
      orderCreate: 'order.create'
    }
  }

  private call<T>(url: string, options?: RequestInit): Promise<T> {
    return fetch(url, {
      ...options,
      headers: {
        Authorization: `${this.tokenType} ${this.session.accessToken}`,
        'Content-Type': 'application/json',
      },
    }).then(
      res => helper.check(res.ok, res) ? res.json() : null
    )
  }

  public listSubscriptions(): Promise<YouCanWebhookSubs> {
    return this.call<YouCanWebhookSubs>(this.urls.list)
  }

  public async unSubscribeAll(): Promise<boolean> {
    const subs = await this.listSubscriptions()
    return this.batchUnSubscribe(subs)
  }

  private batchUnSubscribe(subs: YouCanWebhookSubs): Promise<boolean> {
    const unsubs = Promise.allSettled(subs.map(sub => this.unSubscribe(sub.id)))
    return unsubs.then(
      res => helper.check(true, res),
      err => helper.check(false, err)
    )
  }


  public async unSubscribeCreatedOrderSubs(): Promise<boolean> {
    const createdOrderSubs = await this.listCreatedOrderSubs()
    return this.batchUnSubscribe(createdOrderSubs)
  }

  public async listCreatedOrderSubs() {
    return await this.listSubscriptions().then(
      subs => subs.filter(sub => (sub.event === this.events.orderCreate))
    )
  }

  private subscribe(reqBody: YouCanWebhookSub): Promise<{ id: string }> {
    return this.call<{ id: string }>(this.urls.subscribe, {
      method: 'POST',
      body: JSON.stringify(reqBody)
    })
  }

  private unSubscribe(id: string): Promise<YouCanWebhookUnSub> {
    return this.call<YouCanWebhookUnSub>(`${this.urls.unsubscribe}/${id}`, {
      method: 'POST',
    })
  }


  public subscribeCreatedOrder(): Promise<{ id: string }> {
    return this.subscribe({
      target_url: this.urls.syncOrderCallback,
      event: this.events.orderCreate
    })
  }

}