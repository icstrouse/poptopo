class Tag < ApplicationRecord
  belongs_to :user, optional: true
  # has_many :tracks, through: :tags_tracks
end
