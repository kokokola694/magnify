class Api::PlaylistsController < ApplicationController

  def index
    @playlists = Playlist.all.includes(:author)
  end

  def show
    @playlist = Playlist.find(params[:id])
  end

  def create
    @playlist = Playlist.new(playlist_params)
    @playlist.author_id = current_user.id
    if @playlist.save
      render :show
    else
      render json: @playlist.errors.full_messages, status: 422
    end
  end

  def destroy
    @playlist = Playlist.find(params[:id])
    @playlist.destroy
    render 'api/playlists/show'
  end

  private
  def playlist_params
    params.require(:playlist).permit(:title)
  end

end
