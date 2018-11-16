@songs.each do |song|
  json.songs do
    json.set! song.id do
      json.partial! 'api/songs/song', song: song
    end
  end
  json.artists do
    json.set! song.artist.id do
      json.partial! 'api/artists/artist', artist: song.artist
    end
  end
  json.albums do
    json.set! song.album.id do
      json.partial! 'api/albums/album', album: song.album
    end
  end 
end
