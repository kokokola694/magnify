class CreateRecents < ActiveRecord::Migration[5.2]
  def change
    create_table :recents do |t|
      t.integer :song_id, null: false
      t.integer :album_id, null: false
      t.integer :user_id, null: false
      t.timestamps
    end
    add_index :recents, :user_id
    add_index :recents, :song_id
    add_index :recents, :album_id
    drop_table :recent
  end
end
