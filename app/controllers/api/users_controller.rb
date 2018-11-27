class Api::UsersController < ApplicationController

  def show
    @user = User.find(params[:id])
  end

  def create
    @user = User.new(user_params)
    photo = EzDownload.open("https://s3.amazonaws.com/magnify-dev/photo/default-user-300x300.png")
    # photo = File.open("app/assets/images/default-user-300x300.png")
    @user.photo.attach(io: photo, filename: "default-user-300x300.png")
    if @user.save
      login(@user)
      render "api/users/show"
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  private
  def user_params
    params.require(:user).permit(:username, :password)
  end

end
