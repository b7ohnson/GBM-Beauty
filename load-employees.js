// Run with: node ~/GBM-Beauty/load-employees.js
// Seeds 5 starter employees in Firebase.
// After running, open Admin → Employees to update names and PINs.

const https = require('https');

function genEmpId() {
  return 'GBM-' + String(Math.floor(1000 + Math.random() * 9000));
}

const employees = {
  emp_001: { name: 'Employee 1', role: 'Stylist',   employeeId: genEmpId(), pin: '1111', active: true },
  emp_002: { name: 'Employee 2', role: 'Braider',   employeeId: genEmpId(), pin: '2222', active: true },
  emp_003: { name: 'Employee 3', role: 'Colorist',  employeeId: genEmpId(), pin: '3333', active: true },
  emp_004: { name: 'Employee 4', role: 'Lash Tech', employeeId: genEmpId(), pin: '4444', active: true },
  emp_005: { name: 'Employee 5', role: 'Stylist',   employeeId: genEmpId(), pin: '5555', active: true },
};

console.log('Loading employees with IDs:');
Object.values(employees).forEach(e => console.log(` ${e.employeeId} — ${e.name} (${e.role})`));

const body = JSON.stringify(employees);
const options = {
  hostname: 'gbm-beauty-platform-default-rtdb.firebaseio.com',
  path: '/config/employees.json',
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(body),
  },
};

const req = https.request(options, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    if (res.statusCode === 200) {
      console.log('\n✅ 5 employees loaded into Firebase!');
      console.log('   → Open Admin → Employees tab to rename them and update PINs.');
    } else {
      console.log('❌ Error:', res.statusCode, data);
    }
  });
});

req.on('error', e => console.error('❌ Request failed:', e.message));
req.write(body);
req.end();
