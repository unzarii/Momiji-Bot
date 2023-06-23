# Momiji-Bot
Yet another bot, this time in the theme of a popular Touhou character

# Required Stuff
- Node v16.10.0
- discord.js@13.1.0
- moment@2.29.1
- seedrandom@3.0.5
- mysql@2.18.1

For hosting on Linux:
- pm2 v4.2.3

For convenience on either OS (and to use dev.bat on Windows)
- Nodemon v2.19.13

# Before You Run
- You will need to configure the bot via "config - base.json". Rename the file to "config.json" when you are finished.

# How to host via Linux
- Follow this guide: https://youtu.be/kpci6V8969g (this works for hosted VMs also)
- Ensure that you run pm2 from the ROOT DIRECTORY of this bot otherwise it will not detect the .env file

Tips:
- The --watch option may be useful if you want it to automatically restart when you update the files via git pull
- "pm2 log" will display the console log from the bot

# How to host via Windows
- Run dev.bat
