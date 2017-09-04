class LeaderboardController < ApplicationController
  def index
    @users = User.all_json(
      columns: %i[id name avatar],
      include: {
        tags_videos: {
          columns: %i[id],
        },
        videos: {
          columns: %i[id],
        },
      },
    )
  end
end
