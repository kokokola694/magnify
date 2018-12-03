json.extract! song, :id, :title, :duration, :artist_id, :album_id
json.audioUrl url_for(song.audio)
