const Message = require("../db/models/Message");

exports.postMessage = async ({ name, message }) => {
  try {
    const newMessage = await Message.create({
      name: name.trim(),
      message: message.trim(),
    });
    return {
      success: true,
      message: "Message créé avec succès",
      data: newMessage,
    };
  } catch (error) {
    console.error("Erreur dans postMessage :", error.message);
    throw new Error("Impossible de créer le message");
  }
};

exports.getMessages = async () => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    return { success: true, messages };
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des messages :",
      error.message
    );
    throw new Error("Impossible de récupérer les messages");
  }
};
