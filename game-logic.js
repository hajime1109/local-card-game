// ゲーム全体の情報を管理するオブジェクト（ゲームステート）
const gameState = {
    deck: [],             // 山札
    players: {},          // 各プレイヤーの手札などを管理
    field: [],            // 現在、場に出ているカード
    currentPlayerIndex: 0, // 現在のターンのプレイヤー番号
    gamePhase: 'waiting', // ゲームの進行状況（waiting, playing, finishedなど）
};