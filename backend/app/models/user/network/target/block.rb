class User::Network::Target::Block < ActiveRecord::Base
  include Rails.application.routes.url_helpers
  attribute :block_images
  attribute :block_files
  attribute :block_checklist_elements

  belongs_to :target,
             class_name: 'User::Network::Target',
             foreign_key: :user_network_target_id
  belongs_to :service,
             class_name: 'User::Network::Target::Service',
             foreign_key: :user_network_target_service_id,
             optional: true

  has_many :checklist_elements,
           class_name: 'User::Network::Target::Block::ChecklistElement',
           foreign_key: :user_network_target_block_id,
           dependent: :destroy

  has_many_attached :files

  validates_presence_of :text

  # Render the images in the JSON output.
  def block_images
    ret = []

    self.files.with_all_variant_records.each do |file|
      ret.push(
        {
          preview_path: rails_blob_path(
            file.representation(
              resize_to_limit: [nil, 100]
            ),
            only_path: true
          ),
          original_path: rails_blob_path(
            file,
            only_path: true
          ),
          name: file.filename
        }
      ) if file.content_type.starts_with?('image')
    end

    ret
  end

  # Render the files in the JSON output.
  def block_files
    ret = []

    self.files.each do |file|
      ret.push(
        {
          path: rails_blob_path(
            file,
            only_path: true
          ),
          name: file.filename
        }
      ) unless file.content_type.starts_with?('image')
    end

    ret
  end

  # Render the checklist elements.
  # TODO Why is this not included automatically?
  def block_checklist_elements
    self.checklist_elements.to_a
  end

  enum phase: [
    :general,
    :osint,
    :enumeration,
    :privilege_escalation,
    :post_exploitation
  ]
  enum flag: [
    :no_flag,
    :info,
    :user,
    :root
  ]
end
