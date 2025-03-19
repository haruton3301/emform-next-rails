class CreateFields < ActiveRecord::Migration[7.2]
  def change
    create_table :fields do |t|
      t.references :form, null: false, foreign_key: true, type: :uuid
      t.string :name, null: false
      t.string :label, null: false
      t.integer :order, null: false, default: 0
      t.integer :field_type, null: false
      t.boolean :is_required, null: false, default: false

      t.timestamps
    end

    add_index :fields, [ :form_id, :order ], unique: true
  end
end
