import React from 'react';
import { shallow, mount } from 'enzyme';
import ExpandedStoryState from 'components/story/ExpandedStory/ExpandedStoryState';
import { states } from '../../../../../app/assets/javascripts/models/beta/story';
import { storyTypes } from '../../../../../app/assets/javascripts/libs/beta/constants'

describe('<ExpandedStoryState />', () => {
  it('renders component title', () => {
    const onEditSpy = sinon.spy();

    const story = { state: 'started', _editing: { state: 'started' } };

    const wrapper = mount(
      <ExpandedStoryState
        story={story}
        onEdit={onEditSpy}
        disabled={false}
      />
    );

    expect(wrapper.text()).toContain(I18n.t('activerecord.attributes.story.state'));
  });

  describe("states at select", () => {
    let onEditSpy;

    beforeEach(() => {
      onEditSpy = sinon.spy();
    })

    describe('when is estimated feature', () => {
      const story = {
        estimate: 1,
        storyType: storyTypes.BUG,
        _editing: { state: states[0] }
      };
      let wrapper;

      beforeEach(() => {
        wrapper = shallow(
          <ExpandedStoryState
            story={story}
            onEdit={onEditSpy}
            disabled={false}
          />
        );
      });

      it('renders just one state', () => {
        expect(wrapper.find('option').length).toEqual(1);
      });

      it('has to be unscheduled', () => {
        expect(wrapper.find('select').prop('value')).toBe(states[0]);
      });
    })

  describe('when is unestimated feature', () => {
    let onEditSpy;

    beforeEach(() => {
      onEditSpy = sinon.spy();
    })

    const story = {
      estimate: null,
      storyType: storyTypes.FEATURE,
      _editing: { state: states[0] }
    };
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(
        <ExpandedStoryState
          story={story}
          onEdit={onEditSpy}
          disabled={false}
        />
      );
    })
    
    it('renders all states', () => {
      expect(wrapper.find('option').length).toEqual(states.length);
    });
  })

    states.forEach(state => {
      it(`sets select value as ${state}`, () => {
        const onEditSpy = sinon.spy();

        const story = {
          _editing: { state }
        };

        const wrapper = shallow(
          <ExpandedStoryState
            story={story}
            onEdit={onEditSpy}
            disabled={false}
          />
        );
        const select = wrapper.find('select');

        expect(select.prop('value')).toBe(state);
      });
    });
  });

  describe('when the user selects a state', () => {
    it('triggers the edit callback passing the story state', () => {
      const state = states[0];
      const change = states[1];

      const story = {
        _editing: { state }
      };

      const onEdit = sinon.spy();

      const wrapper = shallow(
        <ExpandedStoryState
          story={story}
          onEdit={onEdit}
          disabled={false}
        />
      );
      const select = wrapper.find('select');

      select.simulate('change', { target: { value: change } });

      expect(onEdit).toHaveBeenCalledWith(change);
    });
  });

  describe('when component is disabled', () => {
    it('select field is editable', () => {
      const onEditSpy = sinon.spy();
      const story = { state: 'started', _editing: { state: 'started' } };
      const wrapper = mount(
        <ExpandedStoryState
          story={story}
          onEdit={onEditSpy}
          disabled={true}
        />
      );
      const select = wrapper.find('select');
      expect(select.prop('disabled')).toBe(true);
    });
  });

  describe('when component is enabled', () => {
    it('select field is enabled', () => {
      const onEditSpy = sinon.spy();
      const story = { state: 'started', _editing: { state: 'started' } };
      const wrapper = mount(
        <ExpandedStoryState
          story={story}
          onEdit={onEditSpy}
          disabled={false}
        />
      );
      const select = wrapper.find('select');
      expect(select.prop('disabled')).toBe(false);
    });
  });

  describe("When change estimate", () => {
    describe("to no estimate", () => {
      it("disables state select", () => {
          const story = { _editing: { estimate: '', storyType: 'feature', state: 'unscheduled' } };

          const wrapper = shallow(
            <ExpandedStoryState
              story={story}
            />
          );

          const select = wrapper.find('select');

          expect(select.prop('disabled')).toBe(true);
      });
    });

    describe("to a number", () => {
      it("doesn't disable state select when estimate is a number", () => {
        const story = { _editing: { estimate: !isNaN, storyType: 'feature', state: 'unstarted' } };

        const wrapper = shallow(
          <ExpandedStoryState
              story={story}
          />
        );
        const select = wrapper.find('select');

        expect(select.prop('disabled')).toBe(false);
      });
    });
  });
});
