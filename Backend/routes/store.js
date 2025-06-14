const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

// Store owner dashboard: ratings for their store(s)
router.get('/my', auth(['STORE_OWNER']), async (req, res) => {
  const stores = await req.prisma.store.findMany({
    where: { ownerId: req.user.id },
    include: { ratings: { include: { user: true } } }
  });
  const result = stores.map(store => ({
    id: store.id,
    name: store.name,
    avgRating: store.ratings.length
      ? (store.ratings.reduce((a, b) => a + b.rating, 0) / store.ratings.length).toFixed(2)
      : null,
    ratings: store.ratings.map(r => ({
      user: { id: r.user.id, name: r.user.name, email: r.user.email },
      rating: r.rating
    }))
  }));
  res.json(result);
});

// ======= CREATE STORE ENDPOINT =======
router.post('/create', auth(['STORE_OWNER']), async (req, res) => {
  const { name, address } = req.body;

  // Validation
  if (!name || !address) return res.status(400).json({ error: "Name and address are required." });
  if (address.length > 400) return res.status(400).json({ error: "Address too long." });

  try {
    const store = await req.prisma.store.create({
      data: {
        name,
        address,
        ownerId: req.user.id
      }
    });
    res.status(201).json(store);
  } catch (err) {
    res.status(500).json({ error: "Could not create store." });
  }
});

module.exports = router;
