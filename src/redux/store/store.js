import { createStore } from 'redux';
import { Reducers } from '../reduce/Reducers';

export const myStore = createStore(Reducers);