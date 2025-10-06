const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');

async function run() {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) throw new Error('MONGO_URI not set');

  await mongoose.connect(mongoUri);
  console.log('Connected to MongoDB for seeding');

  const email = 'seed@example.com';
  const existing = await User.findOne({ email });
  if (existing) {
    console.log('Seed user already exists:', existing.email);
  } else {
    const passwordHash = await bcrypt.hash('pass1234', 10);
    const user = await User.create({ name: 'Seed User', email, passwordHash });
    console.log('Created seed user:', { id: user._id.toString(), email: user.email });
  }

  await mongoose.disconnect();
  console.log('Seeding complete');
}

run().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});


