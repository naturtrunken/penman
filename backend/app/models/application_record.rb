class ApplicationRecord < ActiveRecord::Base
  primary_abstract_class
  nilify_blanks

  # From https://pawelurbanek.com/uuid-order-rails - alternative for the ID field for first() and last()
  self.implicit_order_column = "created_at"
end
