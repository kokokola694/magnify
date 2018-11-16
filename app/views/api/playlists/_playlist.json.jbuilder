json.extract! playlist, :id, :title, :author_id, :song_ids
json.author playlist.author.username
json.photoUrl url_for(playlist.photo)
