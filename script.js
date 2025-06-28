// script.js

// --- HTMLの要素を取得 ---
const myIdElement = document.getElementById('my-id');
const theirIdInput = document.getElementById('their-id');
const connectBtn = document.getElementById('connect-btn');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const messagesDiv = document.getElementById('messages');

// --- 接続相手の情報を保存する変数 ---
let currentConn;

// --- PeerJSの初期化 ---
const peer = new Peer(null, {
  debug: 2, // ログのレベルを少し下げる
});

// --- PeerJSのイベントハンドリング ---

// 1. 自分のIDが確定した時の処理
peer.on('open', (id) => {
  console.log('自分のPeer ID:', id);
  myIdElement.textContent = id;
});

// 2. 相手から接続された時の処理
peer.on('connection', (conn) => {
  console.log('相手から接続されました:', conn.peer);
  currentConn = conn;
  setupMessageListener(conn); // メッセージ受信の準備
});

// 3. エラーが発生した時の処理
peer.on('error', (err) => {
  console.error('PeerJSでエラーが発生しました:', err);
  alert(`エラーが発生しました: ${err.type}`);
});


// --- ボタンのクリックイベント ---

// 4. 「接続」ボタンが押された時の処理
connectBtn.addEventListener('click', () => {
  const theirId = theirIdInput.value;
  if (!theirId) {
    alert('相手のIDを入力してください。');
    return;
  }
  
  console.log(`${theirId} に接続します...`);
  const conn = peer.connect(theirId);
  currentConn = conn;
  setupMessageListener(conn); // メッセージ受信の準備
});

// 5. 「送信」ボタンが押された時の処理
sendBtn.addEventListener('click', () => {
  const message = messageInput.value;
  if (currentConn && currentConn.open) {
    currentConn.send(message); // 相手にメッセージを送信
    displayMessage(`自分: ${message}`); // 自分の画面にも表示
    messageInput.value = ''; // 入力欄をクリア
  } else {
    alert('まだ相手と接続されていません。');
  }
});


// --- 共通の関数 ---

/**
 * メッセージ受信の準備をする関数
 * @param {import("peerjs").DataConnection} conn 
 */
function setupMessageListener(conn) {
  conn.on('open', () => {
    console.log('相手とのデータ通信路が開通しました。');
  });

  conn.on('data', (message) => {
    console.log('受信したメッセージ:', message);
    displayMessage(`相手: ${message}`); // 受信メッセージを画面に表示
  });
}

/**
 * メッセージを画面に表示する関数
 * @param {string} text 
 */
function displayMessage(text) {
  const p = document.createElement('p');
  p.textContent = text;
  messagesDiv.appendChild(p);
}