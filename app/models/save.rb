class Save < ApplicationRecord
  validates :savable_type, presence: true,
    inclusion: {in: ["playlist", "song", "album"]}
  belongs_to :savable, polymorphic: true
  belongs_to :saver,
    foreign_key: :saver_id,
    class_name: :User
end
