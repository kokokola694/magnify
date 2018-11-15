class Artist < ApplicationRecord
  validates :name, presence: true, uniqueness: true

  has_one_attached :photo

  has_many :songs,
    foreign_key: :artist_id,
    class_name: :Song

  has_many :albums,
    foreign_key: :artist_id,
    class_name: :Album

  # after_initialize :ensure_photo
  #
  # def ensure_photo
  #   file = EzDownload.open("https://s3.amazonaws.com/magnify-dev/avatar.svg")
  #   self.photo.attach(io: file, filename: "avatar.svg")
  # end

end
