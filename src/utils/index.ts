import { Client, GatewayIntentBits, Collection, Events, WebhookClient, ThreadChannel } from 'discord.js';
import 'dotenv/config';
import { CONFIG } from '../config';

// Create bot instance and intent information - will change later
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once('ready', () => {
    console.log('Bot is online!');
});

// Bot status check
client.on('messageCreate', message => {
    if (message.author.bot) return;
    if (message.content === '!ping') {
        message.reply('Pong!');
    }
});

client.login(process.env.DISCORD_TOKEN);

// Optional webhook for critical alerts
let alertWebhook: WebhookClient | null = null;
if (process.env.ALERT_WEBHOOK_URL) {
  alertWebhook = new WebhookClient({ url: process.env.ALERT_WEBHOOK_URL });
}