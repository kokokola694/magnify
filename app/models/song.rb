class Song < ApplicationRecord
  validates :title, presence: true

  belongs_to :artist,
    foreign_key: :artist_id,
    class_name: :Artist

  belongs_to :album,
    foreign_key: :album_id,
    class_name: :Album

  has_many :playlist_songs,
    foreign_key: :song_id,
    class_name: :PlaylistSong

  has_many :playlists,
    through: :playlist_songs,
    source: :playlist

end