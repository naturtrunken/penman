# https://github.com/rails/rails/issues/40962
# We are using UUIDs here and not SERIAL/Integer values for the primary key.
# The original active storage tables expect an int as foreign key.
# Since its a string here, we have to change the active storage column with the foreign key.
class ChangeActiveStorageRecordReferencesToUuid < ActiveRecord::Migration[7.0]
  def change
    remove_column :active_storage_attachments, :record_id, :integer
    add_column :active_storage_attachments, :record_id, :string, null: false
  end
end
