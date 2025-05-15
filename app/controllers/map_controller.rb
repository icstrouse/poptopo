require "json"

class MapController < ApplicationController
  allow_unauthenticated_access only: [ :index, :tag ]

  def index
    user_id = session["user_id"]

    @tags = Tag.where(user_id: user_id).to_json
    @tracks = Track.where(user_id: user_id).to_json
  end

  def tag
    # TODO: authorize user for tag
    @tag = Tag.find(params[:id]).to_json
    puts "@tag: #{@tag}"
    # @tracks = Track.where().to_json
    @tracks = [].to_json
  end

  # TODO:
  def track
    # TODO: authorize user for track
    @track = Track.where(params[:id]).to_json

    # @tags = Tag.where().to_json
  end
end
