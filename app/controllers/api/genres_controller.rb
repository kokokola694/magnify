class Api::GenresController < ApplicationController
  def index
    @genres = Genre.all
  end

  def show
    @albums = Album.where(genre_id: params[:id])
    render 'api/albums/index.json.jbuilder'
  end
end
