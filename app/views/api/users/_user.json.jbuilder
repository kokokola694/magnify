json.extract! user, :id, :username, :playlist_ids, :saved_album_ids, :saved_playlist_ids, :saved_song_ids, :saved_artist_ids, :follows_user_ids, :followers_user_ids
json.photoUrl url_for(user.photo)
