class Api::AlbumsController < ApplicationController
  def index
    if params[:ids]
      @albums = Album.where(id: params[:ids]).includes(:artist, :songs)
    elsif params[:input]
      if params[:input] == ""
        @albums = Album.none
      else
        @albums = Album.where('lower(title) LIKE ?', "%#{params[:input]}%").includes(:songs, :artist)
      end
    else
      @albums = Album.all.includes(:artist, :songs)
    end
  end

  def show
    @album = Album.find(params[:id])
  end
end
