class Api::FollowsController < ApplicationController

  def create
    @follow = Follow.new(follow_params)
    if @follow.save
      render :show
    else
      render json: @follow.errors.full_messages
    end
  end

  def destroy
    @follow = Follow.find_by(followed_id: follow_params[:followed_id],
      follower_id: follow_params[:follower_id])
    if @follow.destroy
      render :show
    else
      render json: @follow.errors.full_messages
    end
  end

  private
  def follow_params
    params.require(:follow).permit(:followed_id, :follower_id)
  end

end
