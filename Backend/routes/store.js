const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

// Store owner dashboard 
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


// Create a new store and assign a store owner
router.post('/stores', auth(['ADMIN']), async (req, res) => {
  const { name, address, ownerId } = req.body;
  if (!name || !address || !ownerId) {
    return res.status(400).json({ error: "Missing fields" });
  }
  if (address.length > 400) {
    return res.status(400).json({ error: "Address too long" });
  }

  try {
    const store = await req.prisma.store.create({
      data: {
        name,
        address,
        ownerId: Number(ownerId) // Ensure ownerId is an integer
      }
    });
    res.json(store);
  } catch (err) {
    console.error("Error creating store:", err);
    res.status(500).json({ error: "Failed to create store" });
  }
});


module.exports = router;
