class Api::PlaylistSongsController < ApplicationController

  def create
    @playlist_song = PlaylistSong.new(playlist_song_params)
    if @playlist_song.save
      render :show
    else
      render json: @playlist_song.errors.full_messages, status: 422
    end
  end

  def destroy
    @playlist_song = PlaylistSong.find_by(playlist_id: playlist_song_params[:playlist_id],
    song_id: playlist_song_params[:song_id])
    if @playlist_song
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
