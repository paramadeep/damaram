/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import dotenv from 'dotenv';
import {
  openBrowser, closeBrowser, clear, goto, $, click,
  write, reload, press, waitFor, below, near, into, text,
  beforeunload, accept,
} from 'taiko';

import friends from './data/friends';

dotenv.config();

const sendMessageToFriend = async (friend) => {
  await click($('div[role="textbox"]'), near('Search or start new chat'));
  await clear($('div[role="textbox"]'), near('Search or start new chat'));
  console.log(friend);
  await write(friend);
  await waitFor($(`[title="${friend}"]`));
  await click($(`[title="${friend}"]`));
  // await click($('div[data-testid="cell-frame-container"]', below('CHATS')));
  await write('Diwali starts with our sweet video', into($('div[spellcheck="true"]', near('Type a message'))));
  await press('Enter');
  await write('https://www.youtube.com/watch?v=OYmpru8stn4', into($('div[spellcheck="true"]', near('Type a message'))));
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
  .then(() => waitFor('Search or start new chat'))
  .then(sendMessageToFriends)
  .then(() => {
    beforeunload(() => accept());
  })
  .finally(() => closeBrowser());
