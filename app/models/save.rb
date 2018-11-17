class Save < ApplicationRecord
  validates :savable_type, presence: true
  belongs_to :savable, polymorphic: true
  belongs_to :saver,
    foreign_key: :saver_id,
    class_name: :User
end
