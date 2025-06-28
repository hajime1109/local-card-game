// HTMLの要素を取得しておく
const myIdElement = document.getElementById('my-id');
const theirIdInput = document.getElementById('their-id');
const connectBtn = document.getElementById('connect-btn');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const messagesDiv = document.getElementById('messages');

// 接続相手を保存しておくための変数
let currentConn;

// 1. PeerJSの初期化
// null を指定すると、PeerJSがランダムなIDを自動で生成してくれる
// debug: 3 は、デバッグ情報をコンソールに詳しく表示する設定（開発中に便利）
const peer = new Peer(null, {
    debug: 3
});


// 2. 自分のIDが確定した時の処理
peer.on('open', (id) => {
    console.log('自分のPeer ID:', id);
    myIdElement.textContent = id; // 画面に自分のIDを表示
});


// 3. 相手から接続された時の処理
peer.on('connection', (conn) => {
    console.log('相手から接続されました:', conn.peer);
    currentConn = conn; // 接続を保存

    // 接続が確立したら、データ受信の準備をする
    conn.on('open', () => {
        // データを受信した時の処理
        conn.on('data', (message) => {
            console.log('受信したメッセージ:', message);
            // 画面にメッセージを追加
            const p = document.createElement('p');
            p.textContent = `相手: ${message}`;
            messagesDiv.appendChild(p);
        });
    });
});


// 4. 自分が相手に接続する時の処理
connectBtn.addEventListener('click', () => {
    const theirId = theirIdInput.value;
    console.log(`${theirId} に接続します...`);
    
    // 入力されたIDの相手に接続を開始
    const conn = peer.connect(theirId);
    currentConn = conn; // 接続を保存

    // 接続が確立したら、データ受信の準備をする
    conn.on('open', () => {
        // データを受信した時の処理
        conn.on('data', (message) => {
            console.log('受信したメッセージ:', message);
            // 画面にメッセージを追加
            const p = document.createElement('p');
            p.textContent = `相手: ${message}`;
            messagesDiv.appendChild(p);
        });
    });
});


// 5. メッセージを送信する時の処理
sendBtn.addEventListener('click', () => {
    const message = messageInput.value;
    if (currentConn && currentConn.open) {
        // 相手にメッセージを送信
        currentConn.send(message);
        console.log('送信したメッセージ:', message);

        // 自分の画面にもメッセージを表示
        const p = document.createElement('p');
        p.textContent = `自分: ${message}`;
        messagesDiv.appendChild(p);

        // 入力欄を空にする
        messageInput.value = '';
    } else {
        console.log('まだ接続されていません。');
    }
});

// エラーハンドリング
peer.on('error', (err) => {
    console.error('PeerJSエラー:', err);
    alert(`エラーが発生しました: ${err.message}`);
});