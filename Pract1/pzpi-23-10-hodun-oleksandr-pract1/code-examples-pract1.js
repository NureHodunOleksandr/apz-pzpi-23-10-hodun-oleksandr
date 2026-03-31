// З використанням Decorator
class Message {
  send(t) { console.log(`Надсилання повідомлення: ${t}`); }
}

class MessageDecorator {
  constructor(message) { this.message = message; }
  send(t) { this.message.send(t); }
}

class LoggingDecorator extends MessageDecorator {
  send(t) { console.log("[LOG] Спроба надсилання повідомлення"); super.send(t); }
}

class EncryptionDecorator extends MessageDecorator {
  send(t) { super.send(`***${t}***`); }
}

class AccessDecorator extends MessageDecorator {
  send(t) {
    if (!true) { console.log("[ACCESS] Доступ заборонено"); return; }
    super.send(t);
  }
}

class CacheDecorator extends MessageDecorator {
  constructor(message) { super(message); this.cache = new Set(); }
  send(t) {
    if (this.cache.has(t)) { console.log("[CACHE] Повідомлення вже було надіслане раніше"); return; }
    this.cache.add(t); super.send(t);
  }
}

const msg1 = new LoggingDecorator(new Message());
msg1.send("Привіт");

const msg2 = new LoggingDecorator(new EncryptionDecorator(new Message()));
msg2.send("Секретне повідомлення");

const msg3 = new CacheDecorator(new AccessDecorator(new LoggingDecorator(new EncryptionDecorator(new Message()))));
msg3.send("Важливий текст");
msg3.send("Важливий текст");

//Без використанням Decorator

// class Message {
//   send(t) { console.log(`Надсилання повідомлення: ${t}`); }
// }

// class LoggedMessage extends Message {
//   send(t) { console.log("[LOG] Спроба надсилання повідомлення"); super.send(t); }
// }

// class EncryptedMessage extends Message {
//   send(t) { super.send(`***${t}***`); }
// }

// class AccessCheckedMessage extends Message {
//   send(t) {
//     if (!true) return console.log("[ACCESS] Доступ заборонено");
//     super.send(t);
//   }
// }

// class CachedMessage extends Message {
//   constructor() { super(); this.cache = new Set(); }
//   send(t) {
//     if (this.cache.has(t)) return console.log("[CACHE] Повідомлення вже було надіслане раніше");
//     this.cache.add(t); super.send(t);
//   }
// }

// class LoggedEncryptedMessage extends Message {
//   send(t) {
//     console.log("[LOG] Спроба надсилання повідомлення");
//     super.send(`***${t}***`);
//   }
// }

// class LoggedEncryptedAccessCheckedMessage extends Message {
//   send(t) {
//     if (!true) return console.log("[ACCESS] Доступ заборонено");
//     console.log("[LOG] Спроба надсилання повідомлення");
//     super.send(`***${t}***`);
//   }
// }

// class LoggedEncryptedAccessCheckedCachedMessage extends Message {
//   constructor() { super(); this.cache = new Set(); }
//   send(t) {
//     if (!true) return console.log("[ACCESS] Доступ заборонено");
//     if (this.cache.has(t)) return console.log("[CACHE] Повідомлення вже було надіслане раніше");
//     this.cache.add(t);
//     console.log("[LOG] Спроба надсилання повідомлення");
//     super.send(`***${t}***`);
//   }
// }

// const msg1 = new LoggedMessage();
// msg1.send("Привіт");

// const msg2 = new LoggedEncryptedMessage();
// msg2.send("Секретне повідомлення");

// const msg3 = new LoggedEncryptedAccessCheckedCachedMessage();
// msg3.send("Важливий текст");
// msg3.send("Важливий текст");