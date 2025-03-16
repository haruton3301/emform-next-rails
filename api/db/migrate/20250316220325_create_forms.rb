class CreateForms < ActiveRecord::Migration[7.2]
  def change
    create_table :forms, id: :uuid do |t|
      t.string :title, null: false
      t.text :description
      t.boolean :is_publish, default: true, null: false
      t.references :user, null: false, foreign_key: true, type: :bigint

      t.timestamps
    end
  end
end
