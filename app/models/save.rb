class Save < ApplicationRecord
  validates :savable_type, presence: true,
    inclusion: {in: ["playlist", "song", "album"]}
  belongs_to :savable, polymorphic: true
end
