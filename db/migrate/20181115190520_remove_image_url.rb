class RemoveImageUrl < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :image_url
    remove_column :albums, :image_url
    remove_column :playlists, :image_url
  end
end
