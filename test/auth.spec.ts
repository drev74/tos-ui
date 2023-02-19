import { mount } from "@vue/test-utils";
import RegistrationView from "src/views/RegistrationView.vue";

describe("Registration", () => {
  expect(RegistrationView).toBeTruthy();

  it("should perform registration", () => {
    const wrap = mount(RegistrationView, {
      global: {
        mocks: {}
      }
    })
    console.log(wrap.html());
  })
});
