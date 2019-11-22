import React from 'react';
import classname from 'classnames';
import CollapsedStoryStateActions from './CollapsedStoryStateActions';
import CollapsedStoryInfo from './CollapsedStoryInfo';
import * as Story from '../../../models/beta/story';
import { updateCollapsedStory, highlight } from '../../../actions/story';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CollapsedStoryFocusButon from './CollapsedStoryFocusButton';
import StoryPropTypes from '../../shapes/story';
import EstimateBadge from '../EstimateBadge';

const storyClassName = (story, additionalClassname = '') => {
  const isStoryNotEstimated = Story.isStoryNotEstimated(story.storyType, story.estimate);
  const isRelease = Story.isRelease(story);

  return classname(
    'Story Story--collapsed',
    {
      'Story--release': isRelease,
      'Story--unestimated': isStoryNotEstimated,
      'Story--estimated': !isStoryNotEstimated
    },
    additionalClassname
  );
};

export const CollapsedStory = ({ 
  onToggle, 
  story, 
  updateCollapsedStory, 
  project, 
  className, 
  title, 
  highlight, 
  isHighlightable 
}) =>
  <div
    className={storyClassName(story, className)}
    onClick={onToggle}
    title={title}
  >
    <EstimateBadge story={story} />

    <CollapsedStoryInfo story={story} />

    <CollapsedStoryStateActions story={story}
      onUpdate={(newAttributes) =>
        updateCollapsedStory(story.id, project.id, newAttributes)}
    />
    {
      isHighlightable && 
      <CollapsedStoryFocusButon onClick={() => highlight(story.id)} />
    }
  </div>

CollapsedStory.propTypes = {
  story: StoryPropTypes,
  onToggle: PropTypes.func.isRequired,
  title: PropTypes.string,
  className: PropTypes.string,
  from: PropTypes.string, 
  highlight: PropTypes.func
};

const mapStateToProps = ({ 
  project, 
  stories
}, props) => ({ 
  project, 
  stories,
  isHighlightable: Story.haveHighlightButton(Story.withScope(stories), props.story, props.from) 
});

const mapDispatchToProps = { updateCollapsedStory, highlight }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollapsedStory);
