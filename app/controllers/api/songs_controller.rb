class Api::SongsController < ApplicationController

  def index
    if params[:ids]
      @songs = Song.where(id: params[:ids]).includes(:album, :artist)
    else
      @songs = Song.all.includes(:album, :artist)
    end
  end

  def show
    @song = Song.find(params[:id])
  end

end
