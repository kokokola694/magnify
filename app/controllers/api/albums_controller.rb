class Api::AlbumsController < ApplicationController
  def index
    @albums = Album.all.includes(:artist, :songs)
  end

  def show
    @album = Album.find(params[:id])
  end
end
