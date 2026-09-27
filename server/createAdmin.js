const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');

async function createAdmin() {
  await mongoose.connect('mongodb://localhost:27017/authApp');
  // Plus besoin de passer les options dépréciées

  const email = 'admin@example.com';
  const password = 'AdminPassword123';

  const existingAdmin = await User.findOne({ email });
  if (existingAdmin) {
    console.log('Admin déjà existant');
    process.exit(0);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const adminUser = new User({
    email,
    password: hashedPassword,
    role: 'admin',
  });

  await adminUser.save();
  console.log('Admin créé avec succès');
  process.exit(0);
}

createAdmin().catch(err => {
  console.error(err);
  process.exit(1);
});
