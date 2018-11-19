class Api::SavesController < ApplicationController

  def create
    @save = Save.new(save_params)
    if @save.save
      render :show
    else
      render json: @save.errors.full_messages
    end
  end

  def destroy
    @save = Save.find_by(savable_id: save_params[:savable_id],
    savable_type: save_params[:savable_type], saver_id: save_params[:saver_id])
    if @save.destroy
      render :show
    else
      render json: ["Unable to remove from collection"]
    end
  end

  private
  def save_params
    params.require(:save).permit(:savable_id, :savable_type, :saver_id)
  end

end
