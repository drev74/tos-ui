import { config } from "@vue/test-utils";
import { createRouterMock, injectRouterMock, VueRouterMock } from "vue-router-mock";


// create one router per test file
const router = createRouterMock()
beforeEach(() => {
  vi.clearAllMocks();
  injectRouterMock(router)
})

// Add properties to the wrapper
config.plugins.VueWrapper.install(VueRouterMock)
