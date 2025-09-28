import { Router } from 'express';
import { getItem, createItem } from '../services/checklistService.js';

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

// PUT endpoint to create an item.
router.post('/', async (req, res) => {
  try {
    const { text, quantity, price } = req.body;
    const item = createItem({
      text,
      quantity,
      price,
    });

    // 400 Bad Request
    if (!item) {
      return res.status(404).json({
        error: 'Bad Request',
        error_description: `Error creating item`,
      });
    }

    // 201 Created
    res.status(201).json(item);
  } catch (error) {
    // 500 Internal Server Error
    res.status(500).json({
      error: 'Internal Server Error',
      error_description: error.message
    });
  }
});

export default router;