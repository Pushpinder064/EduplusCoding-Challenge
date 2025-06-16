const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET; 

// Register for USER
router.post('/register', async (req, res) => {
  const { name, email, password, address } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    const existingUser = await req.prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ error: 'Email already exists' });

    const hashed = await bcrypt.hash(password, 10);

    const user = await req.prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
        address: address || '',
        role: 'USER'
      }
    });

    res.json({ id: user.id, email: user.email });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login FOR USER
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await req.prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });

    // 👇 Add email here!
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
});


// Register Admin
router.post('/register-admin', async (req, res) => {
  const { name, email, password, address } = req.body;
  if (!/^.{20,60}$/.test(name)) return res.status(400).json({ error: "Name must be 20-60 chars" });
  if (!/.{8,16}/.test(password) || !/[A-Z]/.test(password) || !/[^A-Za-z0-9]/.test(password))
    return res.status(400).json({ error: "Password must be 8-16 chars, 1 uppercase, 1 special" });
  if (!/\S+@\S+\.\S+/.test(email)) return res.status(400).json({ error: "Invalid email" });
  if (address && address.length > 400) return res.status(400).json({ error: "Address too long" });
  const hashed = await bcrypt.hash(password, 10);
  try {
    const user = await req.prisma.user.create({
      data: { name, email, password: hashed, address, role: 'ADMIN' }
    });
    res.json({ id: user.id, email: user.email });
  } catch (e) {
    res.status(400).json({ error: "Email already exists" });
  }
});

// Login Admin
router.post('/login-admin', async (req, res) => {
  const { email, password } = req.body;
  const user = await req.prisma.user.findUnique({ where: { email } });
  if (!user || user.role !== 'ADMIN') return res.status(401).json({ error: "Invalid credentials" });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: "Invalid credentials" });
  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
});


// ========== STORE OWNER REGISTRATION ==========
router.post('/register-store-owner', async (req, res) => {
  const { name, email, password, address } = req.body;
  if (!/^.{20,60}$/.test(name)) return res.status(400).json({ error: "Name must be 20-60 chars" });
  if (!/.{8,16}/.test(password) || !/[A-Z]/.test(password) || !/[^A-Za-z0-9]/.test(password))
    return res.status(400).json({ error: "Password must be 8-16 chars, 1 uppercase, 1 special" });
  if (!/\S+@\S+\.\S+/.test(email)) return res.status(400).json({ error: "Invalid email" });
  if (address && address.length > 400) return res.status(400).json({ error: "Address too long" });

  try {
    const existingUser = await req.prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ error: 'Email already exists' });

    const hashed = await bcrypt.hash(password, 10);

    const user = await req.prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
        address: address || '',
        role: 'STORE_OWNER'
      }
    });

    res.json({ id: user.id, email: user.email });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// ========== STORE OWNER LOGIN ==========
router.post('/login-store-owner', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await req.prisma.user.findUnique({ where: { email } });
    if (!user || user.role !== 'STORE_OWNER') return res.status(401).json({ error: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
});

module.exports = router;