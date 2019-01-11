class CreateAlbumGenres < ActiveRecord::Migration[5.2]
  def change
    create_table :genres do |t|
      t.string :name, null: false
      t.timestamps
    end
    remove_column :albums, :genre
    add_column :albums, :genre_id, :integer, null: false
  end
end
