
/**
 * This script checks if a user belongs to a game, when they send the 'joingame'
 * message, and if so, sends them the game info
 */

const { getGameBySocket } = require('./gamemanager');
const gameutility = require('./gameutility');
const { cancelAutoAFKResignTimer, cancelDisconnectTimer } = require('./afkdisconnect');


/**
 * The method that fires when a client sends the 'joingame' command after refreshing the page.
 * This should fetch any game their in and reconnect them to it.
 * @param {Socket} ws - Their new websocket
 */
function onJoinGame(ws) {
    // Is the client in a game?
    const game = getGameBySocket(ws);
    if (!game) return; // They don't belong in a game

    const colorPlayingAs = gameutility.doesSocketBelongToGame_ReturnColor(game, ws);
    gameutility.subscribeClientToGame(game, ws, colorPlayingAs);

    // Cancel the timer that auto loses them by AFK, IF IT is their turn!
    if (game.whosTurn === colorPlayingAs) cancelAutoAFKResignTimer(game, { alertOpponent: true });
    cancelDisconnectTimer(game, colorPlayingAs)
}


module.exports = {
    onJoinGame
}