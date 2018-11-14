class Playlist < ApplicationRecord
  validates :title, :image_url, presence: true

  belongs_to :author,
    foreign_key: :author_id,
    class_name: :User

  has_many :playlist_songs,
    foreign_key: :playlist_id,
    class_name: :PlaylistSong

  has_many :songs,
    through: :playlist_songs,
    source: :song

  after_initialize :ensure_photo

  private
  def ensure_photo
    self.image_url = 'default_playlist'
  end

end
