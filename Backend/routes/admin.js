const express = require('express');
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs');
const router = express.Router();

// Dashboard stats
router.get('/dashboard', auth(['ADMIN']), async (req, res) => {
  const userCount = await req.prisma.user.count();
  const storeCount = await req.prisma.store.count();
  const ratingCount = await req.prisma.rating.count();
  res.json({ userCount, storeCount, ratingCount });
});

// Add new user (admin or normal)
router.post('/users', auth(['ADMIN']), async (req, res) => {
  const { name, email, password, address, role } = req.body;
  if (!['ADMIN', 'USER', 'STORE_OWNER'].includes(role)) return res.status(400).json({ error: "Invalid role" });
  if (!/^.{20,60}$/.test(name)) return res.status(400).json({ error: "Name must be 20-60 chars" });
  if (!/.{8,16}/.test(password) || !/[A-Z]/.test(password) || !/[^A-Za-z0-9]/.test(password))
    return res.status(400).json({ error: "Password must be 8-16 chars, 1 uppercase, 1 special" });
  if (!/\S+@\S+\.\S+/.test(email)) return res.status(400).json({ error: "Invalid email" });
  if (address && address.length > 400) return res.status(400).json({ error: "Address too long" });
  const hashed = await bcrypt.hash(password, 10);
  try {
    const user = await req.prisma.user.create({
      data: { name, email, password: hashed, address, role }
    });
    res.json({ id: user.id, email: user.email });
  } catch (e) {
    res.status(400).json({ error: "Email already exists" });
  }
});

// Add new store
router.post('/stores', auth(['ADMIN']), async (req, res) => {
  const { name, address, ownerId } = req.body;
  if (!name || !address || !ownerId) return res.status(400).json({ error: "Missing fields" });
  if (address.length > 400) return res.status(400).json({ error: "Address too long" });
  const store = await req.prisma.store.create({
    data: { name, address, ownerId }
  });
  res.json(store);
});

// List stores (with filters)
router.get('/stores', auth(['ADMIN']), async (req, res) => {
  const { name, email, address } = req.query;
  const where = {};
  if (name) where.name = { contains: name, mode: 'insensitive' };
  if (address) where.address = { contains: address, mode: 'insensitive' };
  const stores = await req.prisma.store.findMany({
    where,
    include: {
      owner: { select: { id: true, name: true, email: true, address: true } },
      ratings: true
    }
  });
  const result = stores.map(store => ({
    id: store.id,
    name: store.name,
    email: store.owner.email,
    address: store.address,
    rating: store.ratings.length
      ? (store.ratings.reduce((a, b) => a + b.rating, 0) / store.ratings.length).toFixed(2)
      : null
  }));
  res.json(result);
});

// List users (with filters)
router.get('/users', auth(['ADMIN']), async (req, res) => {
  const { name, email, address, role } = req.query;
  const where = {};
  if (name) where.name = { contains: name, mode: 'insensitive' };
  if (email) where.email = { contains: email, mode: 'insensitive' };
  if (address) where.address = { contains: address, mode: 'insensitive' };
  if (role) where.role = role;
  const users = await req.prisma.user.findMany({
    where,
    include: {
      stores: { include: { ratings: true } }
    }
  });
  const result = users.map(user => ({
    id: user.id,
    name: user.name,
    email: user.email,
    address: user.address,
    role: user.role,
    rating: user.role === 'STORE_OWNER' && user.stores.length
      ? (user.stores.reduce((acc, store) => {
        const sum = store.ratings.reduce((a, b) => a + b.rating, 0);
        return acc + (store.ratings.length ? sum / store.ratings.length : 0);
      }, 0) / user.stores.length).toFixed(2)
      : null
  }));
  res.json(result);
});

module.exports = router;
