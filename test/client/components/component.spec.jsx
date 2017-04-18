import React from "react";
import { mount } from "enzyme";
import Component from "../../../client/components/component";

const params =  {
  org: "testOrg",
  repo: "electrode",
  version: "1"
}

describe("Component", () => {
  it("mounts without errors", () => {
    mount(<Component params />);
  });
});
