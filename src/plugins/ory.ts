/* eslint-disable @typescript-eslint/no-unused-vars */
import { Configuration, FrontendApi } from 'authclient091';
import { Plugin } from 'vue';
import { $ory, $session } from './injectKeys';

const config = new Configuration({
  basePath: 'http://127.0.0.1:4433',
  credentials: 'include',
});

const Ory = new FrontendApi(config);

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
