import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "components/store";
import { hydrateVideo, deflate } from "components/store/actions";
import VideoInfo from "components/Video/components/VideoInfo";

export default class Video extends Component {
  componentWillMount() {
    store.dispatch(hydrateVideo(this.props));
  }

  componentWillUnmount() {
    store.dispatch(deflate());
  }

  render() {
    return (
      <Provider store={store}>
        <VideoInfo />
      </Provider>
    );
  }
}
