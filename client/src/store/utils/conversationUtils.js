export function getOtherUserLastMessageReadId(messages, otherUserId) {
  if (!messages) {
    return -1;
  }

  for (let i = messages.length - 1; i >= 0; i--) {
    let msg = messages[i];
    if (msg.senderId !== otherUserId && msg.readStatus) {
      return msg.id;
    }
  }

  return -1;
}

export function getUnreadMessageCount(messages, otherUserId) {
  return messages
    .filter((msg) => msg.senderId === otherUserId)
    .reduce((acc, curr) => (curr.readStatus ? acc : acc + 1), 0)
}