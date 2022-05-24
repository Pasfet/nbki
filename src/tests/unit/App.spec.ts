import { mount, enableAutoDestroy } from "@vue/test-utils";
import { TableItemInterface } from "@/types/table";
import * as api from "@/api/index";
import App from "@/App.vue";

describe("Tests app", () => {
  enableAutoDestroy(afterEach);

  const mockReturnData: TableItemInterface[] = [
    { id: "1", name: "name", price: 1, count: 2, total: 3 },
    { id: "2", name: "name2", price: 2, count: 3, total: 12 },
    { id: "3", name: "name3", price: 7, count: 4, total: 7 },
    { id: "4", name: "name4", price: 4, count: 8, total: 9 },
    { id: "5", name: "name5", price: 5, count: 6, total: 11 },
  ];

  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    api.mockResponseData = jest.fn().mockReturnValue(mockReturnData);
  });

  const renderComponent = () => mount(App);

  const findByText = (text: string, wrapper: any, tag = "button") =>
    wrapper.findAll(tag).wrappers.find((w: any) => w.text() === text);

  const ButtonText = "Сгенерировать";

  it("render 5 items when click on button", async () => {
    const wrapper = renderComponent();

    const btn = findByText(ButtonText, wrapper);
    await btn.trigger("click");

    await wrapper.vm.$nextTick();

    expect(wrapper.findAll("tbody > tr")).toHaveLength(mockReturnData.length);
  });

  it("correctly render item", async () => {
    const wrapper = renderComponent();

    const btn = findByText(ButtonText, wrapper);
    await btn.trigger("click");

    await wrapper.vm.$nextTick();

    expect(wrapper.findAll("tbody > tr").at(0).text()).toEqual("1name123");
  });

  it("total sum by total Prop", async () => {
    const wrapper = renderComponent();
    const btn = findByText(ButtonText, wrapper);
    await btn.trigger("click");
    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain("Итого: 42.00 ₽");
  });

  it.each`
    prop              | firstExpected | finishExpected
    ${"ID"}           | ${"1name123"} | ${"5name55611"}
    ${"Наименование"} | ${"1name123"} | ${"5name55611"}
    ${"Цена"}         | ${"1name123"} | ${"3name3747"}
    ${"Количество"}   | ${"1name123"} | ${"4name4489"}
    ${"Стоимость"}    | ${"1name123"} | ${"2name22312"}
  `(
    "sortedBy $prop wheck click on $prop th",
    async ({ prop, firstExpected, finishExpected }) => {
      const wrapper = renderComponent();
      const btn = findByText(ButtonText, wrapper);
      await btn.trigger("click");

      await wrapper.vm.$nextTick();

      const thID = findByText(prop, wrapper, "th");
      expect(wrapper.findAll("tbody > tr").at(0).text()).toEqual(firstExpected);

      thID.trigger("click");
      await wrapper.vm.$nextTick();

      expect(wrapper.findAll("tbody > tr").at(0).text()).toEqual(
        finishExpected
      );
    }
  );

  it("render totalSum", async () => {
    const wrapper = renderComponent();
    const btn = findByText(ButtonText, wrapper);
    await btn.trigger("click");
    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain("Итого: 42.00 ₽");
  });

  it("render Error message", async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    api.mockResponseData = jest
      .fn()
      .mockRejectedValue(new Error("Bad request"));

    const wrapper = renderComponent();
    const btn = findByText(ButtonText, wrapper);
    await btn.trigger("click");

    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain("Bad request");
  });
});
