import express from 'express';
import type { Request, Response } from 'express';
import mongoose from 'mongoose';
import ChecklistItem from '../models/checklistItem.ts';

const router = express.Router();

// GET endpoint to fetch all items.
router.get('/', async (_req: Request, res: Response) => {
  try {
    const items = await ChecklistItem.find({});
    // 200 OK
    res.json(items);
  } catch (err) {
    // 500 Internal Server Error
    res.status(500).json({
      error: 'Internal Server Error',
      error_description: err.message
    });
  }
});

// GET endpoint to fetch an item using a generic :id.
router.get('/:id', async (req: Request, res: Response) => {
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
  } catch (err) {
    // 500 Internal Server Error
    res.status(500).json({
      error: 'Internal Server Error',
      error_description: err.message
    });
  }
});

// POST endpoint to create an item.
router.post('/', async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const item = await ChecklistItem.create(data);
    // 201 Created
    res.status(201).json(item);
  } catch (err) {
    // 400 Bad Request
    if (err.name === 'ValidationError') {
      res.status(400).json({
        error: 'Bad Request',
        error_description: err.message
      });
    }
    // 409 Conflict
    else if (err.code === 11000) { // DuplicateKey
      res.status(409).json({
        error: 'Conflict',
        error_description: 'An item with this text already exists.'
      });
    }
    // 500 Internal Server Error
    else {
      res.status(500).json({
        error: 'Internal Server Error',
        error_description: err.message
      });
    }
  }
});

// PATCH endpoint to update an item using a generic :id.
router.patch('/:id', async (req: Request, res: Response) => {
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
  } catch (err) {
    // 400 Bad Request
    if (err.name === 'ValidationError') {
      res.status(400).json({
        error: 'Bad Request',
        error_description: err.message
      });
    }
    // 500 Internal Server Error
    else {
      res.status(500).json({
        error: 'Internal Server Error',
        error_description: err.message
      });
    }
  }
});

// DELETE endpoint to delete an item using a generic :id.
router.delete('/:id', async (req: Request, res: Response) => {
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
  } catch (err) {
    // 500 Internal Server Error
    res.status(500).json({
      error: 'Internal Server Error',
      error_description: err.message
    });
  }
});

export default router;