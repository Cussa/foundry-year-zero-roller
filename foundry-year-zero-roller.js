// Imports Modules.
import * as YZUR from './lib/yzur.js';

/* -------------------------------------------- */
/*  Foundry VTT Initialization                  */
/* -------------------------------------------- */

Hooks.once('init', function() {
  // CONFIG.debug.hooks = true;

  // Copy this in your Hooks.once('init')
  YZUR.YearZeroRollManager.register('myz', {
    'ROLL.chatTemplate': 'systems/foundry-year-zero-roller/templates/dice/roll.hbs',
    'ROLL.tooltipTemplate': 'systems/foundry-year-zero-roller/templates/dice/tooltip.hbs',
    'ROLL.infosTemplate': 'systems/foundry-year-zero-roller/templates/dice/infos.hbs',
  });
  game.yzur = YZUR;
});

Hooks.once('ready', function() {
  console.warn('YZ Roller Tester | READY!');
});

Hooks.on('renderChatLog', (app, html, data) => {
  html.on('click', '.dice-button.push', _onPush);
});

function _onPush(event) {
  event.preventDefault();

  // Gets the message.
  const chatCard = event.currentTarget.closest('.chat-message');
  const messageId = chatCard.dataset.messageId;
  const message = game.messages.get(messageId);

  // Gets the roll.
  const roll = YZUR.YearZeroRoll.fromData(message.roll.toJSON());

  // Pushes the roll.
  if (roll.pushable) {
    roll.push();
    roll.toMessage();
  }
}