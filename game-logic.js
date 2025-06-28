/**
 * game-logic.js
 * このファイルは、ゲームのルールや進行など、見た目とは独立した
 * 「頭脳」の部分を担当します。
 */

/**
 * ゲームで使う設定値や変わらない値を定義する定数。
 * @const
 */
const GAME_CONFIG = {
  JOKER_COUNT: 1,
  CARD_SUITS: ['spade', 'heart', 'diamond', 'club'],
  CARD_RANKS: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
};

/**
 * ゲームの現在の状況（手札、場のカードなど）をすべて管理するオブジェクト。
 */
const gameState = {
  deck: [],
  players: {},
  field: [],
  currentPlayerIndex: 0,
  gamePhase: 'waiting',
};

/**
 * 53枚のカード（ジョーカー1枚を含む）の山札を作成して返す。
 * @return {!Array<!Object>} カードオブジェクトの配列。
 */
function createDeck() {
  const deck = [];
  for (const suit of GAME_CONFIG.CARD_SUITS) {
    for (const rank of GAME_CONFIG.CARD_RANKS) {
      deck.push({suit: suit, rank: rank});
    }
  }
  for (let i = 0; i < GAME_CONFIG.JOKER_COUNT; i++) {
    deck.push({suit: 'joker', rank: 99});
  }
  return deck;
}

/**
 * 受け取ったカードの配列をシャッフルして返す。
 * @param {!Array<!Object>} deck シャッフルしたいカードの配列。
 * @return {!Array<!Object>} シャッフルされたカードの配列。
 */
function shuffle(deck) {
  const shuffledDeck = [...deck];
  for (let i = shuffledDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
  }
  return shuffledDeck;
}

/**
 * シャッフルされた山札をプレイヤーに配る。
 * @param {!Array<!Object>} shuffledDeck シャッフル済みの山札。
 * @param {number} playerCount プレイヤーの人数。
 * @return {!Object<string, !Array<!Object>>} プレイヤーIDをキー、手札を値とするオブジェクト。
 */
function dealCards(shuffledDeck, playerCount) {
  const hands = {};
  for (let i = 0; i < playerCount; i++) {
    hands[`player${i}`] = [];
  }
  let deckIndex = 0;
  while (deckIndex < shuffledDeck.length) {
    for (let i = 0; i < playerCount; i++) {
      if (deckIndex < shuffledDeck.length) {
        const card = shuffledDeck[deckIndex];
        hands[`player${i}`].push(card);
        deckIndex++;
      }
    }
  }
  return hands;
}