class Artist < ApplicationRecord
  validates :name, presence: true, uniqueness: true
  # validates :image_url, presence: true

  has_one_attached :photo

  has_many :songs,
    foreign_key: :artist_id,
    class_name: :Song

  has_many :albums,
    foreign_key: :artist_id,
    class_name: :Album

  # after_initialize :ensure_photo

  private
  # def ensure_photo
  #   self.image_url = 'default_artist'
  # end

end
