import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { search } from "actions/story";
import { connect } from "react-redux";

export class StorySearch extends Component {
  constructor(props) {
    super(props);

    const { projectId, search } = props;

    this.state = {
      keyWord: '',
      result: [],
      projectId,
      search
    }
  }
  
  handleChange = e => {
    this.setState({ keyWord: e.target.value })
  }

  handleSearch = async (e) => {
    e.preventDefault()

    const { keyWord, projectId, search } = this.state

    search(keyWord, projectId)
  }

  render() {
    const { keyWord } = this.state;

    return (
      <form 
        action="#" 
        acceptCharset="UTF-8" 
        method="post"
        onSubmit={this.handleSearch}
      >
        <div className="form-group">
          <input 
            type="text" 
            onChange={this.handleChange} 
            placeholder="Search" 
            className="form-control input-sm"
            value={keyWord}
          />
        </div>
      </form>
    );
  }
}

StorySearch.propTypes = {
  projectId: PropTypes.number.isRequired
};

const mapStateToProps = ({ project }) => ({ projectId: project.id });

export default connect(
  mapStateToProps,
  {
    search
  }
)(StorySearch);
