# CrossBan

CrossBan is a simple, fast, and secure syncronised ban system for Discord.

## How do I get access to the main bot?
Currently, I am only giving access to the main bot to servers I own and servers of which the owners I trust. As this bot bans people across all servers the bot it is in, it can be used for malicious purposes. If you are not sure if you can trust a server owner, you should not use this bot.

## Installation

To install CrossBan, run the following commands:

```bash
git clone https://github.com/gatelogic/CrossBan.git
cd CrossBan

npm install
npm install -g typescript ts-node @types/node

touch .env
nano .env
```

In the .env file, you will need to set the following variables:
```
TOKEN=(your discord bot token here)
MONGO_URI=(your mongo uri here)
```

> Make sure to replace the TOKEN and MONGO_URI with your own and to make sure your IP is allowed to access the database.

## Running the Bot

```bash
npm run dev
```

## Setup

After running the above commands, you will change the following lines of code in main.ts:
```typescript
new WOKCommands(client, {
    commandsDir: path.join(__dirname, 'commands'),
    featuresDir: path.join(__dirname, 'events'),
    typeScript: true,
    testServers: ['your server id here'],
    botOwners: ['your user id here'],
    disabledDefaultCommands: [
        'command',
        'slash'
    ],
})
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Read me before releasing
If you plan on using this bot I only ask you to do a few things:

> Credit me and WornOffKeys for the bot and command handler.
> Do not sell the bot or command handler. This could be private or subscription based. If theres payment, I will ask for it to be taken down in agreement with the license.

## License
[AGPL v3](https://choosealicense.com/licenses/agpl-3.0/)

[Command Handler](docs.wornoffkeys.com)

## Dislaimer
When hosting this bot yourself, please be wary of the security of your server and others that you add the bot to. Under no circumstances do I accept responsibility for any misuse of this bot.