class User < ApplicationRecord
  validates :username, :password_digest, :session_token, presence: true, uniqueness: true
  validates :password, length: {minimum: 6}, allow_nil: true

  has_one_attached :photo

  has_many :playlists,
    foreign_key: :author_id,
    class_name: :Playlist

  has_many :saves,
    foreign_key: :saver_id,
    class_name: :Save

  has_many :saved_playlists,
    through: :saves,
    source: :savable,
    source_type: :Playlist

  has_many :saved_albums,
    through: :saves,
    source: :savable,
    source_type: :Album

  has_many :saved_songs,
    through: :saves,
    source: :savable,
    source_type: :Song

  has_many :saved_artists,
    through: :saves,
    source: :savable,
    source_type: :Artist

# People that are following the user.
  # has_many :followers,
  #   foreign_key: :followed_id,
  #   class_name: :Follow

# People that the user is following.
  # has_many :follows,
  #   foreign_key: :follower_id,
  #   class_name: :Follow


  attr_reader :password

  after_initialize :ensure_session_token

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil unless user && user.is_password?(password)
    user
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    bcrypt_pw = BCrypt::Password.new(self.password_digest)
    bcrypt_pw.is_password?(password)
  end

  def reset_session_token!
    self.update(session_token: self.class.generate_session_token)
    self.session_token
  end

  private
  def ensure_session_token
    self.session_token ||= self.class.generate_session_token
  end

  def self.generate_session_token
    SecureRandom.urlsafe_base64(16)
  end

  # def ensure_photo
  #   file = EzDownload.open("https://s3.amazonaws.com/magnify-dev/avatar.svg")
  #   self.photo.attach(io: file, filename: "avatar.svg")
  # end
end
