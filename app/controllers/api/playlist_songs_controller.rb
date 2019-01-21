class Api::PlaylistSongsController < ApplicationController



  def attach_photo(model, file)
    photo = EzDownload.open("https://s3.amazonaws.com/magnify-dev/photo/#{file}")
    model.photo.attach(io: photo, filename: file)
  end

  ALBUM_IMG = {
    "Modern Times" => "IU-Modern_Times.jpg",
    "Songs About Jane" => "Maroon_5_-_Songs_About_Jane.png",
    "High High" => "highhigh_cover.jpg",
    "Through the Night" => "IU_Through_the_Night_cover_art.png",
    "Prayers of the Saints" => "sgm_prayers.jpg",
    "Nocturnal Creature" => "elyon_nocturnal.jpg",
    "We Are Hypergiants" => "hypergiants.jpg",
    "Yours Truly" => "yours_truly.png",
    "My Everything" => "my_everything.png",
    "The Worship Initiative, Vol 11" => "worship11.jpg",
    "Part B: Growing Season" => "growing_season.png",
    "Viva la Vida or Death and All His Friends" => "viva_2008.jpg",
    "Red Swan" => "red_swan_cover.png",
    "Holidays in the Sun" => "holidays.jpg",
    "Drive Slow" => "drive_slow.jpg",
    "Paris in the Rain" => "paris_album.jpg",
    "Don't Forget" => "dontforget_album.jpg",
    "And July" => "july_album.jpg",
    "From Age to Age" => "fromagetoage.jpg",
    "POP/STARS" => "kdapopstars.jpeg",
    "Smoke + Mirrors (Deluxe)" => "smokemirrors.png",
    "Spider-Man: Into the Spider-Verse" => "spidermanalbum.jpeg"
  }

  def create
    @playlist_song = PlaylistSong.new(playlist_song_params)
    if @playlist_song.save
      playlist = Playlist.find(@playlist_song.playlist_id)
      album = Album.find(Song.find(playlist.song_ids[0]).album_id)
      attach_photo(playlist, ALBUM_IMG[album.title])
      render :show
    else
      render json: @playlist_song.errors.full_messages, status: 422
    end
  end

  def destroy
    @playlist_song = PlaylistSong.find_by(playlist_id: playlist_song_params[:playlist_id],
    song_id: playlist_song_params[:song_id])
    if @playlist_song
      playlist = Playlist.find(@playlist_song.playlist_id)
      destroyed_song_id = @playlist_song.song_id
      first_song_id = playlist.song_ids[0]

      if destroyed_song_id == first_song_id
        if playlist.song_ids.length == 1
          attach_photo(playlist, "playlist-icon.png")
        else
          second_song = Song.find(playlist.song_ids[1])
          update_album = Album.find(second_song.album_id)

          attach_photo(playlist, ALBUM_IMG[update_album.title])
        end
      end

      @playlist_song.destroy
      render :show
    else
      render json: ["Song was not found in playlist."]
    end
  end

  private
  def playlist_song_params
    params.require(:playlistSong).permit(:song_id, :playlist_id)
  end


end
