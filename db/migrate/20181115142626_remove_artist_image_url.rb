class RemoveArtistImageUrl < ActiveRecord::Migration[5.2]
  def change
    remove_column :artists, :image_url
  end
end
