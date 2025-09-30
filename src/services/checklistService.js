import ChecklistItem from '../models/checklistItem.js';

export async function getItem(id) {
  return await ChecklistItem.findById(id);
}

export async function createItem(data) {
  return await ChecklistItem.create(data);
}

export async function updateItem(id, data) {
  return await ChecklistItem.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  });
}