import ChecklistItem from '../models/checklistItem.js';

export async function getItem(id) {
  return await ChecklistItem.findById(id);
}

export async function createItem(item) {
  return await ChecklistItem.create(item);
}