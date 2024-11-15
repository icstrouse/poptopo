require "json"

class MapController < ApplicationController
  allow_unauthenticated_access only: [:index]
  
  def index
    @tags = Tag.all.to_json
  end

  def tag
    @tag = Tag.find(params[:id]).to_json

    @tracks = Track.where(tag_id: params[:id]).to_json
  end
end
