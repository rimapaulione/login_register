export function getTokenAndEmail(message: string) {
  console.log(message);
  const uuidRegex =
    /\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/;
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  const uuidMatch = message.match(uuidRegex);
  const verificationToken = uuidMatch ? uuidMatch[0] : null;
  const emailMatch = message.match(emailRegex);
  const email = emailMatch ? emailMatch[0] : null;
  return { email, verificationToken };
}
