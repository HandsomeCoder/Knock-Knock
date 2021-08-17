const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const onlineUsers = require("../../onlineUsers");

const { Op } = require("sequelize");

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, text, conversationId, sender } = req.body;

    if (conversationId !== null) {
        const message = await Message.create({ senderId, text, conversationId, readStatus: false });
        
        Conversation.update({ updatedByUserId: senderId},
            { where: { id: conversationId }})

        return res.json({ message, sender });
    }

    // if we already know conversation id, we can save time and just add it to message and return
    if (conversationId) {
      const message = await Message.create({ senderId, text, conversationId, readStatus: false  });
      
      Conversation.update({ updatedByUserId: senderId},
        { where: { id: conversationId }})
      
      return res.json({ message, sender });
    }
    // if we don't have conversation id, find a conversation to make sure it doesn't already exist
    let conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );

    if (!conversation) {
      // create conversation
      conversation = await Conversation.create({
        user1Id: senderId,
        user2Id: recipientId,
      });
      if (onlineUsers.includes(sender.id)) {
        sender.online = true;
      }
    }

    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id,
      readStatus: false
    });
    
    res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});

// expects { conversationId } in body 
router.post("/status/read", async (req, res, next) => {
    try {
      if (!req.user) {
        return res.sendStatus(401);
      }

      const userId = req.user.id;
      const { conversationId } = req.body;
  
      if (conversationId === null) {
        return res.json({ status: false })
      }

      const result = await Message.update({ readStatus: true  },
        { where: { conversationId: conversationId, 
                   readStatus: false,
                   senderId: { [Op.ne]: userId} }});
    
      res.json({ status: result[0] > 0 });
    } catch (error) {
      next(error);
    }
});

module.exports = router;
