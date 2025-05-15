class CreateTagsTracks < ActiveRecord::Migration[8.0]
  def change
    create_table :tags_tracks do |t|
      t.references :tag, null: false, foreign_key: true
      t.references :track, null: false, foreign_key: true

      t.timestamps
    end
  end
end
