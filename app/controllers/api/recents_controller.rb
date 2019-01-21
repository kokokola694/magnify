class Api::RecentsController < ApplicationController

  def index
    @recents = Recent.order("created_at DESC").limit(5)
  end

  def create
    @recent = Recent.new(playlist_params)
    @recent.save
  end

  private
  def recent_params
    params.require(:recent).permit(:song_id, :album_id, :user_id)
  end

end
