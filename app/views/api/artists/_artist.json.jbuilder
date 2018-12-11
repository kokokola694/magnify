json.extract! artist, :id, :name, :song_ids, :album_ids

json.photoUrl url_for(artist.photo)
json.showPhotoUrl url_for(artist.show_photo)
