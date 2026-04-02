require('dotenv').config();
const { Client, GatewayIntentBits, SlashCommandBuilder, REST, Routes, EmbedBuilder } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

// ===== COMANDO =====
const ipCommand = new SlashCommandBuilder()
  .setName('ip')
  .setDescription('Muestra la información del servidor');

// ===== REGISTRAR COMANDOS =====
async function registerCommands() {
  const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

  try {
    console.log('🔄 Registrando slash commands...');

    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      {
        body: [ipCommand.toJSON()]
      }
    );

    console.log('✅ Comandos registrados');
  } catch (err) {
    console.error('❌ Error registrando comandos:', err);
  }
}

// ===== BOT READY =====
client.once('ready', async () => {
  console.log(`✅ Conectado como ${client.user.tag}`);
  await registerCommands();
});

// ===== INTERACCIONES =====
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ip') {

    const embed = new EmbedBuilder()
      .setColor(0x2b2d31)
      .setTitle('📡 Información del servidor')
      .setDescription(
        `La información del servidor se desplegara en la siguiente linea:\n\n` +
        `IP: **Lordmc.net**\n` +
        `Tienda: **tienda.lordmc.net**\n` +
        `Discord: https://dsc.gg/lordmc`
      )
      .setFooter({ text: 'Hecho por soysergio_.vg' });

    await interaction.reply({ embeds: [embed] });
  }
});

// ===== LOGIN =====
client.login(process.env.TOKEN);
