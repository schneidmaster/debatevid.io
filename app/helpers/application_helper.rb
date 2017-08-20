module ApplicationHelper
  def videos_json
    Video.all_json({
      columns: [:id, :debate_type, :debate_level, :thumbnail, :live_now, :is_featured],
      include: {
        tournament: {
          columns: [:id, :name, :year]
        },
        aff_team: {
          columns: [:id],
          include: {
            school: {
              columns: [:id, :name, :short_name]
            },
            debater_one: {
              columns: [:id, :first_name, :last_name]
            },
            debater_two: {
              columns: [:id, :first_name, :last_name]
            }
          }
        },
        neg_team: {
          columns: [:id],
          include: {
            school: {
              columns: [:id, :name, :short_name]
            },
            debater_one: {
              columns: [:id, :first_name, :last_name]
            },
            debater_two: {
              columns: [:id, :first_name, :last_name]
            }
          }
        },
        tags_videos: {
          include: {
            tag: {
              columns: [:id, :title]
            }
          }
        }
      }
    })
  end
end
