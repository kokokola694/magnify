class Api::AlbumsController < ApplicationController
  def index
    if params[:ids]
      @albums = Album.where(id: params[:ids]).includes(:artist, :songs)
    else
      @albums = Album.all.includes(:artist, :songs)
    end
  end

  def show
    @album = Album.find(params[:id])
  end
end
