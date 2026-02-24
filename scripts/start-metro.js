const { exec } = require("child_process");

exec("npx react-native start", (error, stdout, stderr) => {
  if (error) {
    console.error(`Error starting Metro bundler: ${error}`);
    return;
  }
  if (stderr) {
    console.error(`Metro stderr: ${stderr}`);
  }
  console.log(`Metro stdout: ${stdout}`);
});
