class Album < ApplicationRecord
  validates :title, presence: true

  has_one_attached :photo

  has_many :songs,
    foreign_key: :album_id,
    class_name: :Song

  belongs_to :artist,
    foreign_key: :artist_id,
    class_name: :Artist

end
