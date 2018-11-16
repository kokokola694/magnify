class AddSaverToSaves < ActiveRecord::Migration[5.2]
  def change
    add_column :saves, :saver_id, :integer, null: false
  end
end
