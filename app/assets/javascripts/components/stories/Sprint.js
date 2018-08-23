import React, { Component } from "react";
import PropTypes from "prop-types";
import Stories from "./Stories";

const propTypes = {
  number: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  startDate: PropTypes.node,
  points: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  completedPoints: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  stories: PropTypes.array
};

const defaultProps = {
  number: 0,
  startDate: 0,
  points: 0,
  stories: []
};
class Sprint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClosed: true
    };
    this.toggleSprint = this.toggleSprint.bind(this);
  }

  toggleSprint() {
    this.setState(prevState => ({ isClosed: !prevState.isClosed }));
  }

  render() {
    const { number, startDate, points, completedPoints, stories } = this.props;
    const { isClosed } = this.state;
    const { closedStyle } = isClosed ? "Sprint--closed" : "";
    return (
      <div className={`Sprint ${closedStyle}`}>
        <div className="Sprint__header" onClick={this.toggleSprint}>
          {number} - {startDate}
          <span className="Sprint__points">
            {completedPoints && `${completedPoints} / `}
            {points}
          </span>
        </div>
        <div className="Sprint__body">
          {stories && <Stories stories={stories} />}
        </div>
      </div>
    );
  }
}

Sprint.propTypes = propTypes;
Sprint.defaultProps = defaultProps;

export default Sprint;
