import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from 'components/store';
import { hydrate, deflate } from 'components/store/actions';
import LeaderboardApp from 'components/Leaderboard/components/LeaderboardApp';

export default class Leaderboard extends Component {
  componentWillMount() {
    store.dispatch(hydrate(this.props));
  }

  componentWillUnmount() {
    store.dispatch(deflate());
  }

  render() {
    return (
      <Provider store={store}>
        <LeaderboardApp />
      </Provider>
    );
  }
}
