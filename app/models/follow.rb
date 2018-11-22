class Follow < ApplicationRecord
  validates :followed_id, uniqueness: { scope: :follower_id }
  validates :follower_id, uniqueness: { scope: :followed_id }

  belongs_to :followed,
    foreign_key: :followed_id,
    class_name: :User

  belongs_to :follower,
    foreign_key: :follower_id,
    class_name: :User
end
