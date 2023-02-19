/* eslint-disable @typescript-eslint/no-unused-vars */
import { Configuration, FrontendApi, Session } from 'authclient091';
import type { InjectionKey, Plugin } from 'vue';

const config = new Configuration({
  basePath: 'http://127.0.0.1:4433',
  credentials: 'include',
});

const Ory = new FrontendApi(config);

export const $ory: InjectionKey<typeof Ory> = Symbol('$ory');
export const $session: InjectionKey<Session> = Symbol('$session');
export const $ory_urls: InjectionKey<{
  logoutUrl: string;
}> = Symbol('$ory_urls');

export const OryPlugin: Plugin = {
  install(app) {
    // can now be used with inject($ory)
    app.provide($ory, Ory);

    // can now be used with inject($session)
    Ory.toSession()
      .then((sess) => {
        app.provide($session, sess);
      })
      .catch(() => {
        console.log('[Ory] User has no session.');
      });

    Promise.all([
      // get the logout url
      Ory.createBrowserLogoutFlow({ cookie: '' }).catch(() => ({
        data: { logout_url: '' },
      })).data.logout_url || '',
    ]);
  },
};
