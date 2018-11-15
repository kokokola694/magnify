
json.album do
  json.partial! 'api/albums/album', album: @album
end

json.artist do
  json.partial! 'api/artists/artist', artist: @album.artist
end
