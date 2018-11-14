# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'open-uri'

User.destroy_all
PlaylistSong.destroy_all
Song.destroy_all
Playlist.destroy_all
Album.destroy_all
Artist.destroy_all

u1 = User.create(username: 'demo', password: 'password')
u2 = User.create(username: 'miko', password: 'bethany')

ar1 = Artist.new(name: "IU")
# file1 = open("https://s3.amazonaws.com/magnify-dev/IU.jpg")
# file1 = File.open("app/assets/images/IU.jpg")
# ph1 = ar1.photo
# ph1.attach(io: file1, filename: "IU.jpg")
ar1.save

ar2 = Artist.new(name: "Maroon 5")
# file1 = File.open("app/assets/images/IU.jpg")
file2 = EzDownload.open("https://s3.amazonaws.com/magnify-dev/IU.jpg")
options = {io: file2, filename: "IU.jpg"}
debugger
ar2.photo.attach(options)
ar2.save

ab1 = Album.new(title: "Modern Times", year: 2013)
# f = EzDownload.open("https://s3.amazonaws.com/magnify-dev/IU-Modern_Times.jpg")
# ab1.photo.attach(io: f, filename: "IU-Modern_Times.jpg")
ab1.save

ab2 = Album.new(title: "Songs About Jane", year: 2002)
# f = EzDownload.open("https://s3.amazonaws.com/magnify-dev/Maroon_5_-_Songs_About_Jane.png")
# ab2.photo.attach(io: f, filename: "Maroon_5_-_Songs_About_Jane.png")
ab2.save

s1 = Song.create(title: "The Red Shoes", artist_id: ar1.id, album_id: ab1.id)
s2 = Song.create(title: "Everybody has Secrets", artist_id: ar1.id, album_id: ab1.id)

s3 = Song.create(title: "Sunday Morning", artist_id: ar2.id, album_id: ab2.id)

pl1 = Playlist.create(title: "My Favorite Songs")
pl2 = Playlist.create(title: "Cool")

pls1 = PlaylistSong.create(song_id: s1.id, playlist_id: pl1.id)
pls2 = PlaylistSong.create(song_id: s3.id, playlist_id: pl1.id)
pls3 = PlaylistSong.create(song_id: s1.id, playlist_id: pl2.id)
