@albums.each do |album|
  json.albums do
    json.set! album.id do
      json.partial! 'api/albums/album', album: album
    end
  end
  json.artists do
    json.set! album.artist.id do
      json.partial! 'api/artists/artist', artist: album.artist
    end
  end
end
