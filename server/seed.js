const http = require('http');

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/auth/seed',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
};

const adminData = JSON.stringify({
  username: "admin",
  password: "password123",
  adminSecret: "my_secure_admin_creation_key"
});

const req = http.request(options, (res) => {
  res.on('data', (d) => process.stdout.write(d));
  
  if(res.statusCode === 200) {
      console.log("\nAdmin Seeded successfully!");
  } else {
      console.log("\nAdmin already exists or failed.");
  }
});

req.on('error', (e) => console.error(e));
req.write(adminData);
req.end();
