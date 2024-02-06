import fs from 'fs';

interface IOptions {
  key?: Buffer;
  cert?: Buffer;
  ca?: Buffer;
}

const options: IOptions = {};

if (process.env.NODE_ENV === 'prod') {
  options.key = fs.readFileSync('/etc/letsencrypt/live/x/privkey.pem');
  options.cert = fs.readFileSync('/etc/letsencrypt/live/x/fullchain.pem');
  options.ca = fs.readFileSync('/etc/letsencrypt/live/x/chain.pem');
}

export default options;
