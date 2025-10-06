module.exports = {
  config: {
    name: "eden",
    version: "2.0.0",
    author: "Eden",
    role: 0,
    shortDescription: "Eden pro bot",
    longDescription: "Auto chat bot with Eden's personality",
    category: "chat",
  },

  onStart: async function () {},

  onChat: async function ({ message, event, args, api }) {
    const userMsg = event.body?.toLowerCase();
    if (!userMsg) return;

    // ✅ All responses
    const responses = {
      "hi": "ওই মামা_আর ডাকিস না প্লিজ 😒\n✨ Made by Eden",
      "hello": "এই যে মামা, কী খবর 😌\n✨ Made by Eden",
      "i love you": "Bby 😚\n✨ Made by Eden",
      "bby": "__ভালো হয়ে যাও 😔\n✨ Made by Eden",
      "kemon aso": "আমি ভালো আছি, তুমি কেমন? 💫\n✨ Made by Eden",
      "valo aso": "তাই নাকি! খুশি হলাম 😊\n✨ Made by Eden",
      "miss you": "আমিও তোমায় মিস করি 🥺\n✨ Made by Eden",
      "bye": "ভালো থেকো মামা 😔\n✨ Made by Eden",
      "ok": "ঠিক আছে, হাসি মুখে থাকো 😄\n✨ Made by Eden",
      "love you too": "আহা, অনেক মিষ্টি বলেছো 💕\n✨ Made by Eden",
      "good night": "শুভ রাত্রি 🌙 সুন্দর স্বপ্ন দেখো 😴\n✨ Made by Eden",
      "good morning": "শুভ সকাল ☀️ হাসিখুশি থাকো সারাদিন!\n✨ Made by Eden",
      "hmm": "এইভাবে ‘hmm’ কইরো না, মন খারাপ লাগে 🥲\n✨ Made by Eden",
      "ki koro": "তোমার সাথেই তো আছি এখন 😌\n✨ Made by Eden",
      "haha": "এই হাসিটাই ভালো লাগে 😊\n✨ Made by Eden",
      "😒": "এই মুখটা কেন করছো রে 😶\n✨ Made by Eden",
      "😔": "মন খারাপ কোরো না, আমি আছি 💫\n✨ Made by Eden",
      "🙂": "এই হাসিটা রেখো চিরদিন 🙂\n✨ Made by Eden",
      "😂": "তুমি তো একদম পাগলাটে 😆\n✨ Made by Eden",
      "🥺": "এইভাবে তাকিও না প্লিজ 🥹\n✨ Made by Eden",
      "😏": "এই দৃষ্টি কিছু একটা বলছে 😉\n✨ Made by Eden",
      "😴": "ঘুমাও বেবি, সুইট ড্রিমস 😴💤\n✨ Made by Eden",
      "tmi ke": "আমি Eden pro bot 😎 তোমার digital friend 💬\n✨ Made by Eden",
    };

    // ✅ Check match
    let reply = responses[userMsg];
    if (!reply) return;

    // ✅ Send reply
    api.sendMessage(reply, event.threadID, event.messageID);
  },
};
