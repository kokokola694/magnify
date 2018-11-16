class Api::ArtistsController < ApplicationController
  def index
    if params[:ids]
      @artists = Artist.where(id: params[:ids]).includes(:albums, :songs)
    else
      @artists = Artist.all.includes(:albums, :songs)
    end

  end

  def show
    @artist = Artist.find(params[:id])
  end
end
