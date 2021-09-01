import { expect } from "@open-wc/testing/index-no-side-effects";
import { createFixture } from "../../../test/utils/create-fixture";
import { <%= elementClassName %> } from "../dist/<%= elementName %>.js";

const element = `
  <<%= elementName %>></<%= elementName %>>
`;

describe("<<%= elementName %>>", () => {
  it("should upgrade", async () => {
    const el = await createFixture(element);
    expect(el).to.be.an.instanceOf(customElements.get(<%= elementClassName %>.tag), "<%= elementName %> should be an instance of <%= elementClassName %>");
  });
});