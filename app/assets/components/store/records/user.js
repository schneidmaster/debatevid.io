import { Record } from "immutable";

const defaultUser = {
  id: null,
  name: null,
  avatar: null,
  tagsCount: 0,
  videosCount: 0,
  score: 0
};

export default class User extends Record(defaultUser) {
  constructor(data) {
    const tagsCount = data && data.tagsVideos ? data.tagsVideos.length : 0;
    const videosCount = data && data.videos ? data.videos.length : 0;
    const score = tagsCount + videosCount * 3;
    super(Object.assign({}, data, { tagsCount, videosCount, score }));
  }
}
