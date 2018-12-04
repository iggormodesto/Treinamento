import { CLICK_UPDATE_VALUE } from './actionTypes';

import axios from 'axios';

export const clickButton = value => ({
  type: CLICK_UPDATE_VALUE,
  newValue: value
});