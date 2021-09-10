/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import dotenv from 'dotenv';
import {
  openBrowser, closeBrowser, clear, goto, $, click,
  write, reload, press, waitFor, below, near, into,
  beforeunload, accept,
} from 'taiko';
import friends from './data/friends';
import message from './data/message';

dotenv.config();

const sendMessageToFriend = async (friend) => {
  await click($('div[role="textbox"]'), near('Search or start new chat'));
  await clear();
  await write(friend.name);
  await waitFor('CHATS');
  await click($('div[data-testid="cell-frame-container"]', below('CHATS')));
  await write(`${friend.title}, ${message}`, into($('div[spellcheck="true"]', near('Type a message'))));
  await press('Enter');
};

const sendMessageToFriends = async () => {
  for (const friend in friends) {
    const element = friends[friend];
    await sendMessageToFriend(element);
  }
};

openBrowser({ headless: false })
  .then(() => goto('web.whatsapp.com'))
  .then(() => reload())
  .then(sendMessageToFriends)
  .then(() => {
    beforeunload(() => accept());
  })
  .finally(() => closeBrowser());
