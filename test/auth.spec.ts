import { mount } from "@vue/test-utils";
import RegistrationView from "src/views/RegistrationView.vue";


describe("Auth Components", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  describe("Registration", () => {
    expect(RegistrationView).toBeTruthy();

    it("should perform registration", () => {
      const wrap = mount(RegistrationView)
      console.log(wrap.html());      
    })
  });
})
