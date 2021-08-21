const { Op } = require("sequelize");
const db = require("../db");

const Conversation = db.define("conversation", {});

// find conversation given two user Ids

Conversation.findConversation = async function (user1Id, user2Id) {
  const conversation = await Conversation.findOne({
    where: {
      user1Id: {
        [Op.or]: [user1Id, user2Id],
      },
      user2Id: {
        [Op.or]: [user1Id, user2Id],
      },
    },
  });

  // return conversation or null if it doesn't exist
  return conversation;
};

Conversation.isConversationExists = async function (id, userId) {
  return await Conversation.findOne({
    where: {
      id: id,
      [Op.or]: {
        user1Id: userId,
        user2Id: userId,
      },
    },
  });
};

module.exports = Conversation;
