json.extract! playlist, :id, :title, :author_id
json.author playlist.author.username
json.photoUrl url_for(playlist.photo)
