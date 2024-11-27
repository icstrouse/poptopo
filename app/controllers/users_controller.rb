class UsersController < ApplicationController
  allow_unauthenticated_access only: %i[ new create ]
  rate_limit to: 10, within: 3.minutes, only: :create, with: -> { redirect_to new_user_url, alert: "Try again later." }

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)

    respond_to do |format|
      if @user.save
        start_new_session_for @user
        session[:user_id] = @user.id
        redirect_to root_path
      else
        # format.html { render :new, status: :unprocessable_entity }
        redirect_to new_user_path, alert: "Try another email address or password."
      end
    end
  end

  def destroy
    # destroy user record
  end

  private
    # Only allow a list of trusted parameters through.
    def user_params
      params.expect(user: [ :first_name, :last_name, :email_address, :password, :password_confirmation ])
    end
end
