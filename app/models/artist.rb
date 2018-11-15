class Artist < ApplicationRecord
  validates :name, presence: true, uniqueness: true

  has_one_attached :photo

  has_many :songs,
    foreign_key: :artist_id,
    class_name: :Song

  has_many :albums,
    foreign_key: :artist_id,
    class_name: :Album

end
