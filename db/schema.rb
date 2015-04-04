# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150404153235) do

  create_table "debaters", force: :cascade do |t|
    t.integer  "school_id"
    t.string   "first_name"
    t.string   "last_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "judges", force: :cascade do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "judges_videos", force: :cascade do |t|
    t.integer  "judge_id"
    t.integer  "video_id"
    t.integer  "winning_team_id"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "judges_videos", ["judge_id"], name: "index_judges_videos_on_judge_id"
  add_index "judges_videos", ["video_id"], name: "index_judges_videos_on_video_id"

  create_table "schools", force: :cascade do |t|
    t.string   "name"
    t.string   "short_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "tags", force: :cascade do |t|
    t.string   "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "tags_videos", force: :cascade do |t|
    t.integer "tag_id"
    t.integer "video_id"
  end

  create_table "teams", force: :cascade do |t|
    t.integer  "school_id"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.integer  "debater_one_id"
    t.integer  "debater_two_id"
  end

  create_table "tournaments", force: :cascade do |t|
    t.integer  "year"
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "provider"
    t.string   "uid"
    t.string   "name"
    t.string   "avatar"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "videos", force: :cascade do |t|
    t.integer  "provider"
    t.string   "key"
    t.integer  "user_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.integer  "debate_type"
    t.integer  "debate_level"
    t.integer  "aff_team_id"
    t.integer  "neg_team_id"
    t.string   "thumbnail"
    t.integer  "tournament_id"
  end

end
