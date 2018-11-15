class Album < ApplicationRecord
  validates :title, presence: true

  has_one_attached :photo

  has_many :songs,
    foreign_key: :album_id,
    class_name: :Song

  belongs_to :artist,
    foreign_key: :artist_id,
    class_name: :Artist

  # after_initialize :ensure_photo
  # 
  # private
  # def ensure_photo
  #   file = EzDownload.open("https://s3.amazonaws.com/magnify-dev/baseline-music_note-24px.svg")
  #   self.photo.attach(io: file, filename: "avatar.svg")
  # end

end
