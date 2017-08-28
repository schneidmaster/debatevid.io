class DropActiveAdminComments < ActiveRecord::Migration[5.1]
  def up
    remove_index :active_admin_comments, [:namespace] if index_exists?(:active_admin_comments, [:namespace])
    remove_index :active_admin_comments, [:author_type, :author_id] if index_exists?(:active_admin_comments, [:author_type, :author_id])
    remove_index :active_admin_comments, [:resource_type, :resource_id] if index_exists?(:active_admin_comments, [:resource_type, :resource_id])
    drop_table :active_admin_comments
  end

  def down
    create_table :active_admin_comments do |t|
      t.string :namespace
      t.text :body
      t.string :resource_id,   null: false
      t.string :resource_type, null: false
      t.references :author, polymorphic: true
      t.timestamps
    end
    add_index :active_admin_comments, [:namespace] unless index_exists?(:active_admin_comments, [:namespace])
    add_index :active_admin_comments, [:author_type, :author_id] unless index_exists?(:active_admin_comments, [:author_type, :author_id])
    add_index :active_admin_comments, [:resource_type, :resource_id] unless index_exists?(:active_admin_comments, [:resource_type, :resource_id])
  end
end
