json.extract! artist, :id, :name, :song_ids, :album_ids

json.photoUrl url_for(artist.photo)
