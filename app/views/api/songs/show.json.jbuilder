json.song do
  json.partial! 'api/songs/song', song: @song
end
json.album do
  json.partial! 'api/albums/album', album: @song.album
end
json.artist do
  json.partial! 'api/artists/artist', artist: @song.artist
end 
