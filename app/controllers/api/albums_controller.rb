class Api::AlbumsController < ApplicationController
  def index
    if params[:ids]
      @albums = Album.where(id: params[:ids]).includes(:artist, :songs)
    elsif params[:input]
      @albums = Album.where('lower(title) LIKE ?', "%#{params[:input]}").includes(:album, :artist)
    else
      @albums = Album.all.includes(:artist, :songs)
    end
  end

  def show
    @album = Album.find(params[:id])
  end
end
