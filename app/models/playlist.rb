class Playlist < ApplicationRecord
  validates :title, presence: true

  has_one_attached :photo

  belongs_to :author,
    foreign_key: :author_id,
    class_name: :User

  has_many :playlist_songs,
    foreign_key: :playlist_id,
    class_name: :PlaylistSong

  has_many :songs,
    through: :playlist_songs,
    source: :song

    # after_initialize :ensure_photo

    # private
    # def ensure_photo
    #   file = EzDownload.open("https://s3.amazonaws.com/magnify-dev/baseline-music_note-24px.svg")
    #   self.photo.attach(io: file, filename: "avatar.svg")
    # end

end
