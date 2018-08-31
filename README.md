## usersテーブル

|Column|Type         |Options                  |
|------|-------------|-------------------------|
|name  |VARCHAR(100) |null: false, unique: true|
|e-mail|VARCHAR(256) |null: false, unique: true|

### Association
- has_many :intermediate_table_of_user_and_groups
- has_many :messages

## groupsテーブル

|Column|Type         |Options    |
|------|-------------|-----------|
|name  |VARCHAR(100) |null: false|

### Association
- has_many :intermediate_table_of_user_and_group
- has_many :messages

## intermediate_table_of_user_and_groupテーブル(中間テーブル)

|Column   |Type         |Options                       |
|---------|-------------|------------------------------|
|user_id  |references   |null: false, foreign_key: true|
|group_id |references   |null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group

## messagesテーブル

|Column   |Type          |Options                                     |
|---------|--------------|--------------------------------------------|
|text     |VARCHAR(1000) |                                            |
|image    |VARCHAR(500)  |                                            |
|user_id  |references    |null: false, foreign_key: true              |
|group_id |references    |null: false, foreign_key: true              |

### Association
- belongs_to :user
- belongs_to :group
