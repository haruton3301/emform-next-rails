class RemoveIndexFromFields < ActiveRecord::Migration[6.0]
  def change
    remove_index :fields, column: [ :form_id, :order ]
  end
end
