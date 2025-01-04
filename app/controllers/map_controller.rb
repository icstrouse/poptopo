require "json"

class MapController < ApplicationController
  allow_unauthenticated_access only: [ :index ]

  def index
    user_id = session[:user_id]

    @tags = Tag.where(user_id: user_id).to_json
  end

  def tag
    @tag = Tag.find(params[:id]).to_json

    @tracks = Track.where(tag_id: params[:id]).to_json
  end
end