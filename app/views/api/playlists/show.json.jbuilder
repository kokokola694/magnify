json.partial! 'api/playlists/playlist', playlist: @playlist
json.songs do
  @playlist.songs.each do |song|
    json.set! song.id do
      json.partial! 'api/songs/song', song: song
    end
  end
end
