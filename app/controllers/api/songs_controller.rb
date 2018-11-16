class Api::SongsController < ApplicationController

  def index
    if params[:ids]
      @songs = Song.all.where(id: params[:ids])
    else
      @songs = Song.all
    end
  end

  def show
    @song = Song.find(params[:id])
  end

end
