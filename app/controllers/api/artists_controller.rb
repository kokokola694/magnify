class Api::ArtistsController < ApplicationController
  def index
    if params[:ids]
      @artists = Artist.where(id: params[:ids]).includes(:albums, :songs)
    elsif params[:input]
      if params[:input] == ""
        @artists = Artist.none
      else
        @artists = Artist.where('lower(name) LIKE ?', "%#{params[:input]}").includes(:albums, :songs)
      end
    else
      @artists = Artist.all.includes(:albums, :songs)
    end

  end

  def show
    @artist = Artist.find(params[:id])
  end
end
