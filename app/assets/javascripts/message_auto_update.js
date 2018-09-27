$(function() {

  function buildHTML(message) {
  var insertImage = "";
  if (message.image) {
    insertImage = `<img class="lower-message__image" src="${message.image}">`
  }
  var html =  `<div class='chat-main__body--messages-list'>
                <div class='chat-main__message' data-message-id='${message.id}'>
                  <div class='chat-main__message-name'>
                    ${message.name}
                  </div>
                  <div class='chat-main__message-time'>
                    ${message.created_at}
                  </div>
                  <div class='chat-main__message-body'></div>
                  <p class='chat-main__message-body-image'>
                    ${message.content}
                  </p>
                  ${insertImage}
                </div>
              </div>`
  return html;
}

  var interval = function(){
    $.ajax({
      url: "./messages",
      type: 'GET',
      dataType: 'json'
    })
    .done(function(data) {
      var id = $('.chat-main__message').eq(-1).data('messageId');//自身の画面のHTML上の一番最新のコメントのidを取得
      var insertHTML = '';
      data.messages.forEach(function(message) {
        if (message.id > id ) {//DBに自身の画面より最新のメッセージが存在していたらそれをまとめて取得する
          insertHTML += buildHTML(message);
        }
      });
      $('.chat-main__body').append(insertHTML);//新しいメッセージを.chat-main__bodyの子要素の末尾に配置
    })
    .fail(function() {
      alert("自動更新に失敗しました");
    });
  };
  if( window.location.href.match("./messages")){//チャット画面でのみ更新機能を動かす
    setInterval(interval, 1500);
  }
});
