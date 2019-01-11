# json.album do
#   json.extract! album, :id, :title, :year, :song_ids
#   json.artist_id album.artist.id
#   json.photoUrl url_for(album.photo)
# end
#
# json.artist do
#   json.extract! album.artist, :id, :name
# end

json.extract! album, :id, :title, :year, :song_ids, :artist_id, :genre_id
json.photoUrl url_for(album.photo)
