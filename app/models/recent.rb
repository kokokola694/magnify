class Recent < ApplicationRecord
  validates :song_id, presence: true, uniqueness: { scope: :user_id }
  validates :album_id, presence: true

  belongs_to :user
  belongs_to :song
  belongs_to :album

end
