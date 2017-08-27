module ApplicationHelper
  def data_json(videos = Video.all)
    {
      logged_in: logged_in?,
      levels: Video.debate_levels_select,
      types: Video.debate_types_select,
      tournaments: Tournament.all_json(columns: %i[id year name]),
      schools: School.all_json(columns: %i[id name short_name]),
      teams: Team.all_json(columns: %i[id school_id debater_one_id debater_two_id]),
      debaters: Debater.all_json(columns: %i[id first_name last_name]),
      tags: Tag.all_json(columns: %i[id title]),
      favorites: Favorite.for_user(current_user).all_json(columns: %i[video_id]),
      videos: videos.all_json(
        columns: %i[id created_at debate_type debate_level thumbnail live_now is_featured tournament_id aff_team_id neg_team_id views favorites_count],
        include: {
          tags_videos: {
            columns: [:tag_id],
          },
        },
      ),
    }
  end
end
