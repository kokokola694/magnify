class AddUserImageUrl < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :image_url, :string, null: false
    change_column :albums, :image_url, :string, null: false
    change_column :artists, :image_url, :string, null: false
    change_column :playlists, :image_url, :string, null: false
  end
end
