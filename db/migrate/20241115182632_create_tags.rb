class CreateTags < ActiveRecord::Migration[8.0]
  def change
    create_table :tags do |t|
      t.string :name
      t.float :lat
      t.float :lng
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
