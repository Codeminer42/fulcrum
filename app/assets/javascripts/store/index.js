import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import project from 'reducers/project';
import projectBoard from 'reducers/projectBoard';
import users from 'reducers/users';
import stories from 'reducers/stories';
import pastIterations from 'reducers/pastIterations';
import * as Story from '../models/beta/story';
import * as ProjectBoard from '../models/beta/projectBoard';
import * as Note from '../models/beta/note';

const reducer = combineReducers({
  project,
  projectBoard,
  users,
  stories,
  pastIterations
});

const store = createStore(
  reducer, composeWithDevTools(
    applyMiddleware(
      thunk.withExtraArgument(
        { Story, ProjectBoard, Note }
      )
    )
  )
);

export default store;
