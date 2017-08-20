import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { store, history } from 'components/Videos/store';
import { hydrate, deflate } from 'components/Videos/store/actions';
import VideosTable from 'components/Videos/components/VideosTable';

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
        <ConnectedRouter history={history}>
          <VideosTable />
        </ConnectedRouter>
      </Provider>
    );
  }
}
