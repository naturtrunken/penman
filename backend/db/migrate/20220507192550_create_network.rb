class CreateNetwork < ActiveRecord::Migration[7.0]
  def change
    create_table :networks, id: :uuid do |t|
      t.string :user_id, null: false, index: true
      t.string :name

      t.timestamps
    end
  end
end
