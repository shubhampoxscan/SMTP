// smtpServer.js
import { SMTPServer } from 'smtp-server';
import fs from 'fs';

const server = new SMTPServer({
  authOptional: true,
  onData(stream, session, callback) {
    let message = '';
    stream.on('data', chunk => {
      message += chunk.toString();
    });
    stream.on('end', () => {
      console.log('📨 New Email Received:\n', message);
      callback(null);
    });
  },
  onAuth(auth, session, callback) {
    // optional authentication
    return callback(null, { user: 'anonymous' });
  },
});

server.listen(2525, () => {
  console.log('📡 SMTP Server is listening on port 2525');
});
