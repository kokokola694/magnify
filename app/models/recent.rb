class Recent < ApplicationRecord
  validates :song_id, uniqueness: { scope: :user_id }
  validates :album_id, uniqueness: { scope: :user_id }

  belongs_to :user
  belongs_to :song
  belongs_to :album

end
