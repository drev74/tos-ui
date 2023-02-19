import { FrontendApi, Session } from 'authclient091';
import { InjectionKey } from "vue";

export const $ory: InjectionKey<FrontendApi> = Symbol('$ory');
export const $session: InjectionKey<Session> = Symbol('$session');
export const $ory_urls: InjectionKey<{
  logoutUrl: string;
}> = Symbol('$ory_urls');