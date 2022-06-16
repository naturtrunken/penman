class CreateUserApiKeys < ActiveRecord::Migration[7.0]
  def change
    create_table :user_api_keys, id: :uuid do |t|
      t.string :user_id, index: true, null: false
      t.string :value

      t.timestamps
    end
  end
end
