import { Router } from 'express';
import { getItem, createItem, updateItem } from '../services/checklistService.js';

const router = Router();

// GET endpoint to fetch an item using a generic :id.
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const item = await getItem(id);
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
    const { text, quantity, price } = req.body;
    const item = await createItem({
      text,
      quantity,
      price,
    });
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

// PUT endpoint to update an item.
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { text, quantity, price } = req.body;
    const item = await updateItem(id, {
      text,
      quantity,
      price,
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

export default router;