import jasmineEnzyme from "jasmine-enzyme";
import React from "react";
import { shallow } from "enzyme";
import Sprints from "components/stories/Sprints";

let props = {};
let wrapper = {};

const createProps = () => ({
  stories: [
    {
      id: 1,
      position: "3",
      state: "unstarted",
      estimate: 1,
      storyType: "feature"
    },
    {
      id: 2,
      position: "2",
      state: "unstarted",
      estimate: 1,
      storyType: "feature"
    }
  ],
  project: {
    startDate: "2018-09-03T16:00:00",
    iterationLength: 1,
    defaultVelocity: 2
  }
});

describe("<Sprints />", () => {
  beforeEach(() => {
    jasmineEnzyme();
    props = createProps();
    wrapper = shallow(<Sprints {...props} />);
  });

  it("renders one <Sprint> components", () => {
    expect(wrapper.find("Sprint")).toHaveLength(1);
  });

  describe("when no stories are passed as props", () => {
    beforeEach(() => {
      props = createProps();
      props.stories = [];
      wrapper = shallow(<Sprints {...props} />);
    });
    it("does not render any <Sprint> component", () => {
      expect(wrapper.find("Sprint")).toHaveLength(0);
    });
  });
});
