import { Router } from 'express';
import mongoose from 'mongoose';
import ChecklistItem from '../models/checklistItem.js';

const router = Router();

// GET endpoint to fetch all items.
router.get('/', async (_req, res) => {
  try {
    const items = await ChecklistItem.find({});
    // 200 OK
    res.json(items);
  } catch (error) {
    // 500 Internal Server Error
    res.status(500).json({
      error: 'Internal Server Error',
      error_description: error.message
    });
  }
});

// GET endpoint to fetch an item using a generic :id.
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // 400 Bad Request
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        error: 'Bad Request',
        error_description: 'Invalid ID format'
      });
    }
    const item = await ChecklistItem.findById(id);
    // 404 Not Found
    if (!item) {
      return res.status(404).json({
        error: 'Not Found',
        error_description: `Item with ID ${id} not found`,
      });
    }
    // 200 OK
    res.json(item);
  } catch (error) {
    // 500 Internal Server Error
    res.status(500).json({
      error: 'Internal Server Error',
      error_description: error.message
    });
  }
});

// POST endpoint to create an item.
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const item = await ChecklistItem.create(data);
    // 201 Created
    res.status(201).json(item);
  } catch (error) {
    // 400 Bad Request
    if (error.name === 'ValidationError') {
      res.status(400).json({
        error: 'Bad Request',
        error_description: error.message
      });
    }
    // 409 Conflict
    else if (error.code === 11000) { // DuplicateKey
      res.status(409).json({
        error: 'Conflict',
        error_description: 'An item with this text already exists.'
      });
    }
    // 500 Internal Server Error
    else {
      res.status(500).json({
        error: 'Internal Server Error',
        error_description: error.message
      });
    }
  }
});

// PATCH endpoint to update an item using a generic :id.
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body; // Any combination of fields

    // 400 Bad Request
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        error: 'Bad Request',
        error_description: 'Invalid ID format'
      });
    }

    const item = await ChecklistItem.findByIdAndUpdate(id, data, {
      new: true, // Return the modified document
      runValidators: true // Validate the update operation against the model's schema
    });

    // 404 Not Found
    if (!item) {
      return res.status(404).json({
        error: 'Not Found',
        error_description: `Item with ID ${id} not found`,
      });
    }

    // 200 OK
    res.json(item);
  } catch (error) {
    // 400 Bad Request
    if (error.name === 'ValidationError') {
      res.status(400).json({
        error: 'Bad Request',
        error_description: error.message
      });
    }
    // 500 Internal Server Error
    else {
      res.status(500).json({
        error: 'Internal Server Error',
        error_description: error.message
      });
    }
  }
});

// DELETE endpoint to delete an item using a generic :id.
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // 400 Bad Request
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        error: 'Bad Request',
        error_description: 'Invalid ID format'
      });
    }
    const item = await ChecklistItem.findByIdAndDelete(id);
    // 404 Not Found
    if (!item) {
      return res.status(404).json({
        error: 'Not Found',
        error_description: `Item with ID ${id} not found`,
      });
    }
    // 200 OK
    res.json(item);
  } catch (error) {
    // 500 Internal Server Error
    res.status(500).json({
      error: 'Internal Server Error',
      error_description: error.message
    });
  }
});

export default router;