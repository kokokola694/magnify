class EditSaves < ActiveRecord::Migration[5.2]
  def change
    change_column :saves, :savable_id, :integer, null: false
    change_column :saves, :savable_type, :string, null: false
  end
end
