class Album < ApplicationRecord
  validates :title, :image_url, presence: true

  has_one_attached :photo

  has_many :songs,
    foreign_key: :album_id,
    class_name: :Song

  belongs_to :artist,
    foreign_key: :artist_id,
    class_name: :Artist

  after_initialize :ensure_photo

  private
  def ensure_photo
    self.image_url = 'default_album'
  end

end
