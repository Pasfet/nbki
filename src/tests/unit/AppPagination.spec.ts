import { shallowMount, enableAutoDestroy } from "@vue/test-utils";
import Pagination from "@/components/AppPagination.vue";

describe("AppPagination components", () => {
  enableAutoDestroy(beforeEach);
  let wrapper: any;

  const createComponent = (settings: any) => {
    wrapper = shallowMount(Pagination, {
      ...settings,
    });
  };

  const findButtonByText = (text: string) =>
    wrapper.findAll("button").wrappers.find((w: any) => w.text() === text);

  it("render pagination", () => {
    createComponent({
      propsData: {
        totalLength: 20,
        perPage: 5,
        currentPage: 1,
      },
    });

    expect(wrapper.text()).toContain("1");
    expect(wrapper.text()).toContain("2");
    expect(wrapper.text()).toContain("3");
  });

  it("render arrows-prev/next pages pagination", () => {
    createComponent({
      propsData: {
        totalLength: 20,
        perPage: 5,
        currentPage: 1,
      },
    });
    expect(wrapper.html()).toContain("‹");
    expect(wrapper.html()).toContain("›");
  });

  it("render arrows-first/last pages pagination", () => {
    createComponent({
      propsData: {
        totalLength: 20,
        perPage: 5,
        currentPage: 1,
      },
    });
    expect(wrapper.html()).toContain("«");
    expect(wrapper.html()).toContain("»");
  });

  it.each`
    currentPage | clickByText | expected
    ${2}        | ${"1"}      | ${1}
    ${2}        | ${"‹"}      | ${1}
    ${2}        | ${"›"}      | ${3}
    ${3}        | ${"«"}      | ${1}
    ${1}        | ${"»"}      | ${4}
  `(
    "click on $clickByText button and emitted page-changed event",
    ({ currentPage, clickByText, expected }) => {
      createComponent({
        propsData: {
          totalLength: 20,
          perPage: 5,
          currentPage,
        },
      });

      findButtonByText(clickByText).trigger("click");

      expect(wrapper.emitted()["page-changed"]).toStrictEqual([[expected]]);
    }
  );
});
