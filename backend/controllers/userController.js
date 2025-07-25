const Message = require("../db/models/Message");

exports.postMessage = async ({ name, message }) => {
  try {
    const newMessage = await Message.create({
      name,
      message,
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
