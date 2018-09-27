$(function() {

  var search_list = $("#user-search-result");
  var group_user_list = $("#chat-group-users");

  function appendUsers(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user.name }</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</a>
                </div>`
    search_list.append(html);
  }


  function addUserToGroup(user_name,user_id) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='${ user_id }'>
                  <p class='chat-group-user__name'>${ user_name }</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    group_user_list.append(html);
  }

  $("#user-search-field").on('keyup', function() {//インクリメントサーチ機能
    var input = $("#user-search-field").val();
    $.ajax({
    type: 'GET',
    url: '/users',
    data: { keyword: input },
    dataType: 'json'
    })
    .done(function(users) {
      $("#user-search-result").empty();//一旦検索結果をリセットする
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUsers(user);
        });
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    });
  });

  $("#user-search-result").on('click','.chat-group-user__btn--add', function() {//グループにユーザーを追加する
    $(this).parent().remove();
    var user_name = $(this).attr('data-user-name');
    var user_id = $(this).attr('data-user-id');
    addUserToGroup(user_name,user_id);
  });

  $("#chat-group-users").on('click','.chat-group-user__btn--remove', function() {//グループからユーザーを削除する
    $(this).parent().remove();
  });
});
