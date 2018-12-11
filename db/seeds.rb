User.destroy_all
PlaylistSong.destroy_all
Song.destroy_all
Playlist.destroy_all
Album.destroy_all
Artist.destroy_all
Save.destroy_all

def attach_photo(model, file)
  photo = EzDownload.open("https://s3.amazonaws.com/magnify-dev/photo/#{file}")
  # photo = File.open("app/assets/images/#{file}")
  model.photo.attach(io: photo, filename: file)
  model.save!
end

def attach_show_photo(model, file)
  show_photo = EzDownload.open("https://s3.amazonaws.com/magnify-dev/photo/#{file}")
  # photo = File.open("app/assets/images/#{file}")
  model.show_photo.attach(io: show_photo, filename: file)
  model.save!
end

def attach_audio(model, file)
  audio = EzDownload.open("https://s3.amazonaws.com/magnify-dev/music/#{file}")
  # audio = File.open("app/assets/audio/#{file}")
  model.audio.attach(io: audio, filename: file)
  model.save!
end

u1 = User.new(username: 'demo', password: 'password')
attach_photo(u1, "default-user-300x300.png")

u2 = User.new(username: 'miko', password: 'bethany')
attach_photo(u2, "default-user-300x300.png")

u3 = User.new(username: 'kokokola', password: 'bethany')
attach_photo(u3, "default-user-300x300.png")

u4 = User.new(username: 'pakman', password: 'bethany')
attach_photo(u4, "default-user-300x300.png")


ar4 = Artist.new(name: "Sovereign Grace Music")
attach_photo(ar4,"sovgracemusic_logo.png")
attach_show_photo(ar4,"sgm_show.jpg")

ar5 = Artist.new(name: "Elyon Beats")
attach_photo(ar5, "elyon.jpg")
attach_show_photo(ar5,"elyon_show.jpg")

ar6 = Artist.new(name: "Gowe")
attach_photo(ar6, "gowe.jpg")
attach_show_photo(ar6,"gowe_show.jpg")

ar1 = Artist.new(name: "IU")
attach_photo(ar1, "IU.jpg")
attach_show_photo(ar1,"iu_show.jpg")

ar2 = Artist.new(name: "Maroon 5")
attach_photo(ar2, "maroon5.jpg")
attach_show_photo(ar2,"maroon5_show.jpg")

ar3 = Artist.new(name: "GD & TOP")
attach_photo(ar3,"gd_top.png")
attach_show_photo(ar3,"gdtop_show.jpg")

ar7 = Artist.new(name: "Ariana Grande")
attach_photo(ar7, "ariana_grande.jpg")
attach_show_photo(ar7,"ariana_show.jpg")

ar8 = Artist.new(name: "Shane and Shane")
attach_photo(ar8, "shane.jpg")
attach_show_photo(ar8,"shane_show.jpg")

ar9 = Artist.new(name: "Younha")
attach_photo(ar9, "younha.png")
attach_show_photo(ar9,"younha_show.jpg")

ar10 = Artist.new(name: "Coldplay")
attach_photo(ar10, "coldplay.jpg")
attach_show_photo(ar10,"coldplay_show.jpg")

ar11 = Artist.new(name: "Yoshiki")
attach_photo(ar11, "yoshiki.jpg")
attach_show_photo(ar11,"yoshiki_show.jpg")

ar12 = Artist.new(name: "Yui")
attach_photo(ar12, "yui.jpg")
attach_show_photo(ar12,"yui_show.jpg")




ab1 = Album.new(title: "Modern Times", year: 2013, artist_id: ar1.id)
attach_photo(ab1, "IU-Modern_Times.jpg")

ab2 = Album.new(title: "Songs About Jane", year: 2002, artist_id: ar2.id)
attach_photo(ab2, "Maroon_5_-_Songs_About_Jane.png")

ab3 = Album.new(title: "GD & TOP", year: 2010, artist_id: ar3.id)
attach_photo(ab3, "highhigh_cover.jpg")

ab4 = Album.new(title: "Through the Night", year: 2017, artist_id: ar1.id)
attach_photo(ab4, "IU_Through_the_Night_cover_art.png")

ab5 = Album.new(title: "Prayers of the Saints", year: 2017, artist_id: ar4.id)
attach_photo(ab5, "sgm_prayers.jpg")

ab6 = Album.new(title: "Nocturnal Creature", year: 2012, artist_id: ar5.id)
attach_photo(ab6, "elyon_nocturnal.jpg")

ab7 = Album.new(title: "We Are Hypergiants", year: 2012, artist_id: ar6.id)
attach_photo(ab7, "hypergiants.jpg")

ab8 = Album.new(title: "Yours Truly", year: 2013, artist_id: ar7.id)
attach_photo(ab8, "yours_truly.png")

ab9 = Album.new(title: "My Everything", year: 2014, artist_id: ar7.id)
attach_photo(ab9, "my_everything.png")

ab10 = Album.new(title: "The Worship Initiative, Vol 11", year: 2016, artist_id: ar8.id)
attach_photo(ab10, "worship11.jpg")

ab11 = Album.new(title: "Part B: Growing Season", year: 2009, artist_id: ar9.id)
attach_photo(ab11, "growing_season.png")

ab12 = Album.new(title: "Viva la Vida or Death and All His Friends", year: 2008, artist_id: ar10.id)
attach_photo(ab12, "viva_2008.jpg")

ab13 = Album.new(title: "Red Swan", year: 2018, artist_id: ar11.id)
attach_photo(ab13, "red_swan_cover.png")

ab14 = Album.new(title: "Holidays in the Sun", year: 2010, artist_id: ar12.id)
attach_photo(ab14, "holidays.jpg")

# s17 = Song.new(title: "Bad Day", artist_id: ar1.id, album_id: ab1.id)
# attach_audio(s17, "06+%EC%8B%AB%EC%9D%80+%EB%82%A0.mp3")
# s18 = Song.new(title: "Obliviate", artist_id: ar1.id, album_id: ab1.id)
# attach_audio(s18, "07+Obliviate.mp3")
# s19 = Song.new(title: "Walk with Me, Girl", artist_id: ar1.id, album_id: ab1.id)
# attach_audio(s19, "08+%EC%95%84%EC%9D%B4%EC%95%BC+%EB%82%98%EB%9E%91+%EA%B1%B7%EC%9E%90+(feat.+%EC%B5%9C%EB%B0%B1%ED%98%B8).mp3")
# s20 = Song.new(title: "Havana", artist_id: ar1.id, album_id: ab1.id)
# attach_audio(s20, "09+Havana.mp3")
# s21 = Song.new(title: "A Gloomy Clock", artist_id: ar1.id, album_id: ab1.id)
# attach_audio(s21, "10+%EC%9A%B0%EC%9A%B8%EC%8B%9C%EA%B3%84+(feat.+%EC%A2%85%ED%98%84+Of+SHINee).mp3")
# s22 = Song.new(title: "Daydream", artist_id: ar1.id, album_id: ab1.id)
# attach_audio(s22, "11+%ED%95%9C%EB%82%AE%EC%9D%98+%EA%BF%88+(feat.+%EC%96%91%ED%9D%AC%EC%9D%80).mp3")
# s23 = Song.new(title: "Wait", artist_id: ar1.id, album_id: ab1.id)
# attach_audio(s23, "12+%EA%B8%B0%EB%8B%A4%EB%A0%A4.mp3")
# s24 = Song.new(title: "Voice Mail", artist_id: ar1.id, album_id: ab1.id)
# attach_audio(s24, "13+(Bonus+Track)+Voice+Mail+(Korean+Ver.).mp3")
# s1 = Song.new(title: "Everybody Has Secrets", artist_id: ar1.id, album_id: ab1.id)
# attach_audio(s1, "02+Everybody+Has+Secrets.mp3")

s1 = Song.new(title: "Roses", artist_id: ar5.id, album_id: ab6.id, duration: "4:35")
attach_audio(s1, "roses.mp3")

s11 = Song.new(title: "Wait For You", artist_id: ar6.id, album_id: ab7.id, duration: "3:56")
attach_audio(s11, "wait.mp3")

s2 = Song.new(title: "The Red Shoes", artist_id: ar1.id, album_id: ab1.id, duration: "4:14")
attach_audio(s2, "04+%EB%B6%84%ED%99%8D%EC%8B%A0+(Red+Shoes).mp3")
s3 = Song.new(title: "Modern Times", artist_id: ar1.id, album_id: ab1.id, duration: "3:25")
attach_audio(s3, "05+Modern+Times.mp3")

s4 = Song.new(title: "Through the Night", artist_id: ar1.id, album_id: ab4.id, duration: "4:13")
attach_audio(s4, "IU+-+%EB%B0%A4%ED%8E%B8%EC%A7%80+(Through+the+Night).mp3")

s5 = Song.new(title: "Sunday Morning", artist_id: ar2.id, album_id: ab2.id, duration: "3:57")
attach_audio(s5, "Sunday+Morning.mp3")

s6 = Song.new(title: "High High", artist_id: ar3.id, album_id: ab3.id, duration: "3:07")
attach_audio(s6, "GD_TOP-02-High+High.mp3")
s10 = Song.new(title: "When We See Your Face", artist_id: ar4.id, album_id: ab5.id, duration: "4:19")
attach_audio(s10, "When%2BWe%2BSee%2BYour%2BFace.mp3")

s12 = Song.new(title: "Almost is Never Enough", artist_id: ar7.id, album_id: ab8.id, duration: "5:27")
attach_audio(s12, "almost.mp3")
s13 = Song.new(title: "Piano", artist_id: ar7.id, album_id: ab8.id, duration: "3:56")
attach_audio(s13, "piano.mp3")
s14 = Song.new(title: "Honeymoon Avenue", artist_id: ar7.id, album_id: ab8.id, duration: "5:39")
attach_audio(s14, "honeymoon.mp3")

s15 = Song.new(title: "One Last Time", artist_id: ar7.id, album_id: ab9.id, duration: "3:18")
attach_audio(s15, "one_last_time.mp3")

s16 = Song.new(title: "Sovereign Over Us", artist_id: ar8.id, album_id: ab10.id, duration: "5:49")
attach_audio(s16, "Sovereign+Over+Us.mp3")

s17 = Song.new(title: "Broke Up Today", artist_id: ar9.id, album_id: ab11.id, duration: "4:27")
attach_audio(s17, "broke_up_today.mp3")

s17 = Song.new(title: "Viva la Vida", artist_id: ar10.id, album_id: ab12.id, duration: "4:02")
attach_audio(s17, "viva.mp3")

s18 = Song.new(title: "Red Swan", artist_id: ar11.id, album_id: ab13.id, duration: "4:23")
attach_audio(s18, "red_swan.mp3")

s19 = Song.new(title: "Again", artist_id: ar12.id, album_id: ab14.id, duration: "4:11")
attach_audio(s19, "again.mp3")

pl1 = Playlist.new(title: "My Favorite Songs", author_id: u1.id)
attach_photo(pl1, "playlist-icon.png")
pl2 = Playlist.new(title: "Chill", author_id: u1.id)
attach_photo(pl2, "playlist-icon.png")
pl3 = Playlist.new(title: "Driving", author_id: u2.id)
attach_photo(pl3, "playlist-icon.png")
pl4 = Playlist.new(title: "Lalala", author_id: u1.id)
attach_photo(pl4, "playlist-icon.png")
pl5 = Playlist.new(title: "Beats", author_id: u1.id)
attach_photo(pl5, "playlist-icon.png")
pl6 = Playlist.new(title: "woooooo", author_id: u1.id)
attach_photo(pl6, "playlist-icon.png")
pl7 = Playlist.new(title: "KPOP ALL THE WAY", author_id: u3.id)
attach_photo(pl7, "playlist-icon.png")
pl8 = Playlist.new(title: "i like music", author_id: u3.id)
attach_photo(pl8, "playlist-icon.png")
pl9 = Playlist.new(title: "fun fun fun", author_id: u4.id)
attach_photo(pl9, "playlist-icon.png")
pl10 = Playlist.new(title: "iu", author_id: u3.id)
attach_photo(pl10, "playlist-icon.png")
pl11 = Playlist.new(title: "quiet times", author_id: u3.id)
attach_photo(pl11, "playlist-icon.png")
pl12 = Playlist.new(title: "yes", author_id: u4.id)
attach_photo(pl12, "playlist-icon.png")

Save.create!(saver_id: u1.id, savable_id: ab4.id, savable_type: :Album)
Save.create!(saver_id: u1.id, savable_id: ab1.id, savable_type: :Album)
Save.create!(saver_id: u1.id, savable_id: pl3.id, savable_type: :Playlist)
Save.create!(saver_id: u2.id, savable_id: pl1.id, savable_type: :Playlist)
Save.create!(saver_id: u1.id, savable_id: s5.id, savable_type: :Song)
Save.create!(saver_id: u1.id, savable_id: s3.id, savable_type: :Song)
Save.create!(saver_id: u2.id, savable_id: s2.id, savable_type: :Song)
Save.create!(saver_id: u2.id, savable_id: s5.id, savable_type: :Song)
Save.create!(saver_id: u1.id, savable_id: ar1.id, savable_type: :Artist)
Save.create!(saver_id: u1.id, savable_id: ar2.id, savable_type: :Artist)
Save.create!(saver_id: u2.id, savable_id: ar1.id, savable_type: :Artist)
Save.create!(saver_id: u2.id, savable_id: ar2.id, savable_type: :Artist)

pls1 = PlaylistSong.create!(song_id: s1.id, playlist_id: pl1.id)
pls2 = PlaylistSong.create!(song_id: s3.id, playlist_id: pl1.id)
pls3 = PlaylistSong.create!(song_id: s1.id, playlist_id: pl2.id)
pls4 = PlaylistSong.create!(song_id: s2.id, playlist_id: pl3.id)
pls5 = PlaylistSong.create!(song_id: s4.id, playlist_id: pl3.id)
pls6 = PlaylistSong.create!(song_id: s11.id, playlist_id: pl3.id)
pls4 = PlaylistSong.create!(song_id: s5.id, playlist_id: pl4.id)
pls5 = PlaylistSong.create!(song_id: s6.id, playlist_id: pl4.id)
pls6 = PlaylistSong.create!(song_id: s14.id, playlist_id: pl4.id)
pls7 = PlaylistSong.create!(song_id: s13.id, playlist_id: pl4.id)
pls8 = PlaylistSong.create!(song_id: s17.id, playlist_id: pl5.id)
pls9 = PlaylistSong.create!(song_id: s4.id, playlist_id: pl5.id)
pls10 = PlaylistSong.create!(song_id: s10.id, playlist_id: pl1.id)
pls11 = PlaylistSong.create!(song_id: s11.id, playlist_id: pl1.id)
pls12 = PlaylistSong.create!(song_id: s13.id, playlist_id: pl1.id)
pls13 = PlaylistSong.create!(song_id: s14.id, playlist_id: pl1.id)
pls14 = PlaylistSong.create!(song_id: s16.id, playlist_id: pl1.id)
pls15 = PlaylistSong.create!(song_id: s17.id, playlist_id: pl1.id)
