import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "components/store";
import { hydrate, deflate } from "components/store/actions";
import SubmitApp from "components/Submit/components/SubmitApp";

export default class Submit extends Component {
  componentWillMount() {
    store.dispatch(hydrate(this.props));
  }

  componentWillUnmount() {
    store.dispatch(deflate());
  }

  render() {
    return (
      <Provider store={store}>
        <SubmitApp />
      </Provider>
    );
  }
}
