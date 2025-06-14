const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  // Hash password for all users
  const hashed = await bcrypt.hash('Test@1234', 10);

  // 1. Create Admin User
  const admin = await prisma.user.create({
    data: {
      name: 'Admin User 12345678901234567890',
      email: 'admin@example.com',
      password: hashed,
      address: 'Admin Address',
      role: 'ADMIN'
    }
  });
  console.log('✅ Admin Created:', admin.email);

  // 2. Create Normal User
  const user = await prisma.user.create({
    data: {
      name: 'Normal User 12345678901234567890',
      email: 'user@example.com',
      password: hashed,
      address: 'User Address',
      role: 'USER'
    }
  });
  console.log('✅ Normal User Created:', user.email);

  // 3. Create Store Owner
  const storeOwner = await prisma.user.create({
    data: {
      name: 'Store Owner 12345678901234567890',
      email: 'owner@example.com',
      password: hashed,
      address: 'Owner Address',
      role: 'STORE_OWNER'
    }
  });
  console.log('✅ Store Owner Created:', storeOwner.email);

  // 4. Create Store owned by Store Owner
  const store = await prisma.store.create({
    data: {
      name: 'SuperMart',
      address: 'Store Location',
      ownerId: storeOwner.id  // foreign key to User
    }
  });
  console.log('✅ Store Created:', store.name);

  // 5. Add a Rating by the Normal User to the Store
  const rating = await prisma.rating.create({
    data: {
      userId: user.id,
      storeId: store.id,
      rating: 5
      
    }
  });
  console.log('✅ Rating Submitted:', rating.score);
}

main()
  .catch((e) => {
    console.error('❌ Error during test inserts:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
