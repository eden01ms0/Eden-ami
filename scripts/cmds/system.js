const Canvas = require("canvas");
const os = require("os");
const fs = require("fs");

module.exports = {
  config: {
    name: "system",
    aliases: ["rtm", "up", "sys", "status"],
    version: "1.7",
    author: "Eden",
    countDown: 5,
    role: 0,
    shortDescription: "Stylish system info card with Ping & signature",
    longDescription: "Displays CPU, RAM, Node.js, Uptime, Ping and Made by Eden on canvas",
    category: "system",
    guide: "{pn}"
  },

  onStart: async function({ api, event }) {
    try {
      const { threadID, messageID } = event;
      const start = Date.now();

      // 🧠 System Info
      const totalMem = os.totalmem() / 1024 / 1024;
      const freeMem = os.freemem() / 1024 / 1024;
      const usedMem = totalMem - freeMem;

      const uptimeSec = process.uptime();
      const days = Math.floor(uptimeSec / (60 * 60 * 24));
      const hours = Math.floor((uptimeSec / (60 * 60)) % 24);
      const minutes = Math.floor((uptimeSec / 60) % 60);
      const seconds = Math.floor(uptimeSec % 60);

      // 🎨 Canvas setup
      const width = 700;
      const height = 380;
      const canvas = Canvas.createCanvas(width, height);
      const ctx = canvas.getContext("2d");

      // Gradient Background
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "#0f0c29");
      gradient.addColorStop(1, "#302b63");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Title
      ctx.fillStyle = "#00ffcc";
      ctx.font = "bold 32px Arial";
      ctx.fillText("SYSTEM INFO", width / 2 - 100, 50);

      // Line
      ctx.strokeStyle = "#00ffcc";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(50, 65);
      ctx.lineTo(width - 50, 65);
      ctx.stroke();

      // Text Info
      ctx.fillStyle = "#ffffff";
      ctx.font = "20px Arial";

      ctx.fillText(`CPU: ${os.cpus()[0].model}`, 50, 110);
      ctx.fillText(`CPU Cores: ${os.cpus().length}`, 50, 140);

      ctx.fillText(`Total RAM: ${totalMem.toFixed(2)} MB`, 50, 180);
      ctx.fillText(`Used RAM: ${usedMem.toFixed(2)} MB`, 50, 210);
      ctx.fillText(`Free RAM: ${freeMem.toFixed(2)} MB`, 50, 240);

      ctx.fillText(`Node.js: ${process.version}`, 50, 280);
      ctx.fillText(`Uptime: ${days}d ${hours}h ${minutes}m ${seconds}s`, 50, 310);

      // 🟩 RAM Bar
      const barX = 400, barY = 180, barWidth = 250, barHeight = 25;
      const ramPercent = usedMem / totalMem;

      ctx.fillStyle = "#555";
      ctx.fillRect(barX, barY, barWidth, barHeight);
      const ramGradient = ctx.createLinearGradient(barX, barY, barX + barWidth, barY);
      ramGradient.addColorStop(0, "#00ffcc");
      ramGradient.addColorStop(1, "#0066ff");
      ctx.fillStyle = ramGradient;
      ctx.fillRect(barX, barY, barWidth * ramPercent, barHeight);
      ctx.strokeStyle = "#00ffcc";
      ctx.strokeRect(barX, barY, barWidth, barHeight);

      // 🟧 CPU Bar
      const cpuBarY = 140;
      const cpuPercent = Math.random() * 0.7 + 0.3;
      ctx.fillStyle = "#555";
      ctx.fillRect(barX, cpuBarY, barWidth, barHeight);
      const cpuGradient = ctx.createLinearGradient(barX, cpuBarY, barX + barWidth, cpuBarY);
      cpuGradient.addColorStop(0, "#ff6600");
      cpuGradient.addColorStop(1, "#ffcc00");
      ctx.fillStyle = cpuGradient;
      ctx.fillRect(barX, cpuBarY, barWidth * cpuPercent, barHeight);
      ctx.strokeStyle = "#ffcc00";
      ctx.strokeRect(barX, cpuBarY, barWidth, barHeight);

      // 📶 Ping
      const ping = Date.now() - start;
      ctx.fillStyle = "#00ffcc";
      ctx.font = "bold 24px Arial";
      ctx.fillText(`📶 Ping: ${ping}ms`, width - 200, 50);

      // ✨ Signature
      ctx.fillStyle = "#ff66cc";
      ctx.font = "italic 20px Arial";
      ctx.fillText("Made by Eden", width - 160, height - 20);

      // 🖼️ Save & Send
      const imgPath = `${__dirname}/system_ping_eden.png`;
      const buffer = canvas.toBuffer();
      fs.writeFileSync(imgPath, buffer);

      return api.sendMessage(
        { body: "💻 System Info", attachment: fs.createReadStream(imgPath) },
        threadID,
        messageID
      );

    } catch (err) {
      console.error(err);
      api.sendMessage("❌ Error generating system info.", event.threadID);
    }
  }
};
