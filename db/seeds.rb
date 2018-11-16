# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
PlaylistSong.destroy_all
Song.destroy_all
Playlist.destroy_all
Album.destroy_all
Artist.destroy_all

default_music_photo = EzDownload.open("https://s3.amazonaws.com/magnify-dev/default_music.png")

def attach_photo(model, file)
  photo = EzDownload.open("https://s3.amazonaws.com/magnify-dev/#{file}")
  model.photo.attach(io: photo, filename: file)
  model.save!
end

def attach_audio(model, file)
  audio = EzDownload.open("https://s3.amazonaws.com/magnify-dev/#{file}")
  model.audio.attach(io: audio, filename: file)
  model.save!
end

u1 = User.new(username: 'demo', password: 'password')
attach_photo(u1, "default-user-300x300.png")

u2 = User.new(username: 'miko', password: 'bethany')
attach_photo(u2, "default-user-300x300.png")

ar1 = Artist.new(name: "IU")
file1 = EzDownload.open("https://s3.amazonaws.com/magnify-dev/IU.jpg")
ar1.photo.attach(io:file1, filename: "IU.jpg")
ar1.save!

ar2 = Artist.new(name: "Maroon 5")
file2 = EzDownload.open("https://s3.amazonaws.com/magnify-dev/maroon5.jpg")
ar2.photo.attach(io: file2, filename: "maroon5.jpg")
ar2.save!

ab1 = Album.new(title: "Modern Times", year: 2013, artist_id: ar1.id)
f = EzDownload.open("https://s3.amazonaws.com/magnify-dev/IU-Modern_Times.jpg")
ab1.photo.attach(io: f, filename: "IU-Modern_Times.jpg")
ab1.save!

ab2 = Album.new(title: "Songs About Jane", year: 2002, artist_id: ar2.id)
f = EzDownload.open("https://s3.amazonaws.com/magnify-dev/Maroon_5_-_Songs_About_Jane.png")
ab2.photo.attach(io: f, filename: "Maroon_5_-_Songs_About_Jane.png")
ab2.save!

s1 = Song.new(title: "Modern Times", artist_id: ar1.id, album_id: ab1.id)
attach_audio(s1, "02+Everybody+Has+Secrets.mp3")
s2 = Song.new(title: "Everybody has Secrets", artist_id: ar1.id, album_id: ab1.id)
attach_audio(s2, "05+Modern+Times.mp3")
s3 = Song.new(title: "Sunday Morning", artist_id: ar2.id, album_id: ab2.id)
attach_audio(s3, "Sunday+Morning.mp3")

pl1 = Playlist.new(title: "My Favorite Songs", author_id: u1.id)
attach_photo(pl1, "default_music.png")
pl2 = Playlist.new(title: "Cool", author_id: u1.id)
attach_photo(pl2, "default_music.png")
pl3 = Playlist.new(title: "Fun", author_id: u2.id)
attach_photo(pl3, "default_music.png")
pl4 = Playlist.new(title: "Lalala", author_id: u1.id)
attach_photo(pl4, "default_music.png")
pl5 = Playlist.new(title: "Lofi Beats", author_id: u1.id)
attach_photo(pl5, "default_music.png")
pl6 = Playlist.new(title: "Piano Instrumentals", author_id: u1.id)
attach_photo(pl6, "default_music.png")
pl7 = Playlist.new(title: "Upbeat", author_id: u1.id)
attach_photo(pl7, "default_music.png")
pl8 = Playlist.new(title: "Another Playlist", author_id: u1.id)
attach_photo(pl8, "default_music.png")
pl9 = Playlist.new(title: "FunFunFun", author_id: u1.id)
attach_photo(pl9, "default_music.png")
pl10 = Playlist.new(title: "Coolbeans", author_id: u1.id)
attach_photo(pl10, "default_music.png")

pls1 = PlaylistSong.create!(song_id: s1.id, playlist_id: pl1.id)
pls2 = PlaylistSong.create!(song_id: s3.id, playlist_id: pl1.id)
pls3 = PlaylistSong.create!(song_id: s1.id, playlist_id: pl2.id)
