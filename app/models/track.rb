class Track < ApplicationRecord
  belongs_to :user, optional: true
  has_many :tags, through: :tags_tracks
end
