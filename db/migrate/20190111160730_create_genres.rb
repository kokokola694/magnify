class CreateGenres < ActiveRecord::Migration[5.2]
  def change
    create_table :recent do |t|
      t.integer :song_id, null: false
      t.integer :album_id, null: false
      t.integer :user_id, null: false
      t.timestamps
    end
    add_index :recent, :user_id
    add_index :recent, :song_id
    add_index :recent, :album_id
    add_column :albums, :genre, :string, null: false
  end
end
