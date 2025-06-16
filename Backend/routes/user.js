const express = require('express');
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs');
const router = express.Router();

// Update password
router.put('/password', auth(['USER', 'STORE_OWNER', 'ADMIN']), async (req, res) => {
  const { password } = req.body;
  if (!/.{8,16}/.test(password) || !/[A-Z]/.test(password) || !/[^A-Za-z0-9]/.test(password))
    return res.status(400).json({ error: "Password must be 8-16 chars, 1 uppercase, 1 special" });
  const hashed = await bcrypt.hash(password, 10);
  await req.prisma.user.update({ where: { id: req.user.id }, data: { password: hashed } });
  res.json({ message: "Password updated" });
});


// // GET /api/user/stores
// router.get('/stores', auth(['USER']), async (req, res) => {
//   const stores = await req.prisma.store.findMany({
//     include: {
//       ratings: true // fetch all ratings for each store
//     }
//   });

//   // Calculate average rating and userRating for current user
//   const result = stores.map(store => {
//     const ratings = store.ratings;
//     const avgRating =
//       ratings.length > 0
//         ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
//         : null;

//     // Find current user's rating if any
//     const userRatingObj = ratings.find(r => r.userId === req.user.id);

//     return {
//       id: store.id,
//       name: store.name,
//       address: store.address,
//       overallRating: avgRating ? avgRating.toFixed(1) : "No ratings",
//       userRating: userRatingObj ? userRatingObj.rating : null
//     };
//   });

//   res.json(result);
// });

// GET /api/user/stores with optional filtering by name and address
router.get('/stores', auth(['USER']), async (req, res) => {
  const { name, address } = req.query;

  const where = {};
  if (name) where.name = { contains: name, mode: 'insensitive' };
  if (address) where.address = { contains: address, mode: 'insensitive' };

  const stores = await req.prisma.store.findMany({
    where,
    include: {
      ratings: true
    }
  });

  const result = stores.map(store => {
    const ratings = store.ratings;
    const avgRating = ratings.length > 0
      ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
      : null;

    const userRatingObj = ratings.find(r => r.userId === req.user.id);

    return {
      id: store.id,
      name: store.name,
      address: store.address,
      overallRating: avgRating ? avgRating.toFixed(1) : "No ratings",
      userRating: userRatingObj ? userRatingObj.rating : null
    };
  });

  res.json(result);
});



// Submit or update rating
router.post('/rate', auth(['USER']), async (req, res) => {
  const { storeId, rating } = req.body;
  if (![1,2,3,4,5].includes(rating)) return res.status(400).json({ error: "Invalid rating" });

  // Upsert rating
  const existing = await req.prisma.rating.findUnique({
    where: { userId_storeId: { userId: req.user.id, storeId } }
  });
  if (existing) {
    await req.prisma.rating.update({
      where: { id: existing.id },
      data: { rating }
    });
    return res.json({ message: "Rating updated" });
  } else {
    await req.prisma.rating.create({
      data: { userId: req.user.id, storeId, rating }
    });
    return res.json({ message: "Rating submitted" });
  }
});

module.exports = router;
