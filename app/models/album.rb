class Album < ApplicationRecord
  validates :title, presence: true

  has_one_attached :photo

  has_many :songs,
    foreign_key: :album_id,
    class_name: :Song

  belongs_to :artist,
    foreign_key: :artist_id,
    class_name: :Artist

  belongs_to :genre,
    foreign_key: :genre_id,
    class_name: :Genre

  has_many :recents,
    foreign_key: :album_id,
    class_name: :Recent

  has_many :saves, as: :savable, class_name: :Save

  has_many :savers,
    through: :saves,
    source: :saver

end
