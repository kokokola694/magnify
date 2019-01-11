class Genre < ApplicationRecord
  validates :name, presence: true, uniqueness: true

  has_many :albums,
    foreign_key: :genre_id,
    class_name: :Album

  has_one_attached :photo

end
