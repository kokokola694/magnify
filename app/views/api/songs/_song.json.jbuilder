json.extract! song, :id, :title, :artist_id, :album_id
json.audioUrl url_for(song.audio)
