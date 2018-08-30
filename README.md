## usersテーブル

|Column|Type   |Options    |
|------|----   |    -------|
|name  |integer|null: false|
|e-mail|integer|null: false|

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
