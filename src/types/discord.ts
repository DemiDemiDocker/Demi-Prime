import { 
    Client, 
    Collection, 
    SlashCommandBuilder, 
    ChatInputCommandInteraction, 
    ClientEvents, 
    AutocompleteInteraction 
  } from 'discord.js';
  
  // Extend the Discord.js Client type to include a commands collection
  declare module 'discord.js' {
    export interface Client {
      commands: Collection<string, Command>;
    }
  }
  
  // Command interface
  export interface Command {
    data: SlashCommandBuilder | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
    execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
    cooldown?: number; // Cooldown in seconds
    autocomplete?: (interaction: AutocompleteInteraction) => Promise<void>; // Autocomplete handler
  }
  
  // Generic Event interface
  export interface Event<T extends any[] = any[]> {
    name: keyof ClientEvents;
    once?: boolean;
    execute: (client: Client, ...args: T) => void | Promise<void>;
  }  