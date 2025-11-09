import { Client, GatewayIntentBits, Partials, Events, Message } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config(); // Load BOT_TOKEN from .env

// Create the client instance with intents and partials
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,           // Track guilds
    GatewayIntentBits.GuildMessages,    // Receive messages
    GatewayIntentBits.MessageContent,   // Access message content
    GatewayIntentBits.GuildMembers,     // Track member updates
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction], // Handle uncached events
});

// Event: bot ready
client.once(Events.ClientReady, (c) => {
  console.log(`✅ Logged in as ${c.user.tag}`);
});

// Event: message received
client.on(Events.MessageCreate, (message: Message) => {
  if (message.author.bot) return; // Ignore bot messages

  console.log(`📩 Message from ${message.author.tag}: ${message.content}`);
});

// Login with token
client.login(process.env.BOT_TOKEN)
  .then(() => console.log('🔑 Bot logged in successfully'))
  .catch((err) => console.error('❌ Failed to login:', err));

export default client;
