import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from 'components/store';
import { hydrate, deflate } from 'components/store/actions';
import VideosApp from 'components/Videos/components/VideosApp';

export default class Videos extends Component {
  componentWillMount() {
    store.dispatch(hydrate(this.props));
  }

  componentWillUnmount() {
    store.dispatch(deflate());
  }

  render() {
    return (
      <Provider store={store}>
        <VideosApp />
      </Provider>
    );
  }
}
