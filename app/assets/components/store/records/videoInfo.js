import { Record } from 'immutable';

const defaultVideoInfo = {
  provider: null,
  key: null,
  title: null,
  thumbnail: null,
};

export default class VideoInfo extends Record(defaultVideoInfo) {
  getLink() {
    if(this.provider === 'youtube') {
      return `https://www.youtube.com/watch?v=${this.key}`;
    } else if(this.provider === 'vimeo') {
      return `https://vimeo.com/${this.key}`;
    }
  }
}
