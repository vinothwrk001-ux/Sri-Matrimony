const { spawn } = require('child_process');
const path = require('path');

console.log('=======================================================');
console.log(' Starting Sri Matrimony Full-Stack Development Services');
console.log('=======================================================\n');

const isWindows = process.platform === 'win32';
const npmCmd = isWindows ? 'npm.cmd' : 'npm';

// Spawn Backend Server
const backend = spawn(npmCmd, ['run', 'dev'], {
  cwd: path.join(__dirname, 'backend'),
  stdio: 'inherit',
  shell: true,
});

// Spawn Frontend Vite Server
const frontend = spawn(npmCmd, ['run', 'dev'], {
  cwd: path.join(__dirname, 'frontend'),
  stdio: 'inherit',
  shell: true,
});

const cleanup = () => {
  console.log('\nShutting down Sri Matrimony services...');
  try { backend.kill(); } catch (e) {}
  try { frontend.kill(); } catch (e) {}
  process.exit();
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

