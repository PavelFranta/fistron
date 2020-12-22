import { writable } from 'svelte/store';

export const cardPack = writable([]);
export const revealsCounter = writable(0);
export const measuredTime = writable(null);