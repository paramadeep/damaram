/* eslint-disable no-await-in-loop */
import dotenv from 'dotenv';
import {
  openBrowser, closeBrowser, goto, $, click,
  reload, waitFor, scrollDown,
} from 'taiko';

dotenv.config();

const extrctNames = () => $('[data-testid="contact-list-key"]>div>div>div')
  .elements()
  .then((e) => Promise.all(e.map((el) => el.text())))
  .then((names) => names.map((name) => name.split('\n')[0]));

const scrollToNext = () => scrollDown($('.copyable-area>div:nth-child(3)'), 1100);

const scrapeNames = async () => {
  const allNames = [];
  for (let index = 0; index < 30; index += 1) {
    const names = await extrctNames();
    allNames.push(...names);
    await scrollToNext();
  }
  return new Set([...allNames]);
};

openBrowser({ headless: false })
  .then(() => goto('web.whatsapp.com'))
  .then(() => reload())
  .then(() => waitFor('Search or start new chat'))
  .then(() => click($('[data-testid="chat"]')))
  .then(() => waitFor('New chat'))
  .then(scrapeNames)
  .then(console.log)
  .finally(() => closeBrowser());
