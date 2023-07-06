const simpleGit = require('simple-git');
const moment = require('moment');
const fs = require('fs');
require('dotenv').config();

// Specify the path to your local repository
const repoPath = process.env.REPO_PATH;

// Check if the repository path is provided
if (!repoPath) {
  console.error('Error: Repository path not provided in the .env file.');
  process.exit(1);
}

// Specify the file to modify
const filePath = `${repoPath}/commit.txt`;

// Create a SimpleGit instance
const git = simpleGit(repoPath);

// Get the current date
const today = moment().format('YYYY-MM-DD');

// Generate a random number of lines to add
const numLines = Math.floor(Math.random() * 4) + 1;

// Generate the content to append
let content = '';
for (let i = 0; i < numLines; i++) {
  content += `Commit ${i + 1} - ${today}\n`;
}

// Append the content to the file
fs.appendFileSync(filePath, content);

// Commit and push the changes
git.add(filePath)
  .commit(`Daily commit - ${today}`)
  .push();
