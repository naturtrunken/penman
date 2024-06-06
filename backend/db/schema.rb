# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2022_05_27_104009) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pgcrypto"
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.string "record_id", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "sessions", force: :cascade do |t|
    t.string "session_id", null: false
    t.text "data"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["session_id"], name: "index_sessions_on_session_id", unique: true
    t.index ["updated_at"], name: "index_sessions_on_updated_at"
  end

  create_table "user_api_keys", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "user_id", null: false
    t.string "value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_user_api_keys_on_user_id"
  end

  create_table "user_network_target_attack_vectors", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "user_network_target_id", null: false
    t.string "text", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "user_network_target_service_id"
    t.boolean "tried", default: false
    t.index ["user_network_target_id"], name: "untav_untid"
  end

  create_table "user_network_target_block_checklist_elements", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "user_network_target_block_id", null: false
    t.string "value"
    t.boolean "checked", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_network_target_block_id"], name: "untbce_untbi"
  end

  create_table "user_network_target_blocks", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "user_network_target_id", null: false
    t.text "text"
    t.integer "phase", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "flag", default: 0, null: false
    t.string "user_network_target_service_id"
    t.text "output"
    t.index ["user_network_target_id"], name: "index_user_network_target_blocks_on_user_network_target_id"
  end

  create_table "user_network_target_ideas", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "user_network_target_id", null: false
    t.string "user_network_target_service_id"
    t.string "text"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "tried", default: false
    t.index ["user_network_target_id"], name: "untai_untid"
  end

  create_table "user_network_target_services", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "user_network_target_id", null: false
    t.string "name", null: false
    t.integer "port", null: false
    t.integer "protocol", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_network_target_id"], name: "index_user_network_target_services_on_user_network_target_id"
  end

  create_table "user_network_target_time_entries", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "user_network_target_id", null: false
    t.integer "state", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_network_target_id"], name: "untte_untid"
  end

  create_table "user_network_targets", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "user_network_id", null: false
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "ip"
    t.integer "state", default: 0, null: false
    t.index ["user_network_id"], name: "index_user_network_targets_on_user_network_id"
  end

  create_table "user_networks", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "user_id", null: false
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_user_networks_on_user_id"
  end

  create_table "users", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "provider", default: "email", null: false
    t.string "uid", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.boolean "allow_password_change", default: false
    t.datetime "remember_created_at"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.string "email"
    t.json "tokens"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
end
