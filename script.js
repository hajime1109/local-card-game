// script.js (デバッグ用)

console.log('1. script.jsの読み込み開始');

// --- ここからゲームロジックのテストコード ---
// console.log('ゲームロジックのテストを開始します。');
// const deck = createDeck();
// console.log('山札を作成しました。枚数:', deck.length);
// const shuffledDeck = shuffle(deck);
// console.log('山札をシャッフルしました。');
// const playerCount = 4;
// const playerHands = dealCards(shuffledDeck, playerCount);
// console.log(`${playerCount}人にカードを配りました:`, playerHands);
// --- ゲームロジックのテストコードは一旦コメントアウト ---

console.log('2. P2P通信の準備を開始します。');

const myIdElement = document.getElementById('my-id');
// 他のHTML要素取得コード...（前回のエラー解消コードから持ってくる）
const theirIdInput = document.getElementById('their-id');
const connectBtn = document.getElementById('connect-btn');
// ...など

console.log('3. Peerオブジェクトを作成します...');
const peer = new Peer(null, {
    debug: 3,
});
console.log('4. Peerオブジェクトを作成しました。サーバーからの「open」イベントを待っています...');


peer.on('open', (id) => {
    // このメッセージがコンソールに表示されるかが重要
    console.log('★★成功★★ 5. openイベントが発生しました！ あなたのID:', id);
    myIdElement.textContent = id;
});

peer.on('error', (err) => {
    // エラーが出た場合もコンソールに表示
    console.error('!!エラー!! PeerJSでエラーが発生しました:', err);
});

// peer.on('connection', ...)、connectBtn.addEventListener(...) など、
// 他のイベントリスナーは、この時点ではそのままでOKです。