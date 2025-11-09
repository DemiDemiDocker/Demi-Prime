import fs from 'node:fs';
import path from 'node:path';
import { Client, Collection } from 'discord.js';
import { Command } from '../types/discord';

export async function loadCommands(client: Client & { commands?: Collection<string, Command> }): Promise<number> {
  const commandsPath = path.join(__dirname, '../commands');
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts') || file.endsWith('.js'));

  let loadedCount = 0;

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const commandModule = await import(filePath);
    const command: Command = commandModule.default;

    if (!command || !command.data || !command.execute) {
      console.warn(`Command at ${filePath} is missing required properties.`);
      continue;
    }

    client.commands?.set(command.data.name, command);
    loadedCount++;
  }

  console.log(`Loaded ${loadedCount} commands.`);
  return loadedCount;
}
