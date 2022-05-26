import * as UAParser from 'ua-parser-js';

const clientInfo = (userAgent: string): string => {
  const ua = new UAParser(userAgent);

  return `${ua.getResult().browser.name} ${ua.getResult().browser.version} - ${
    ua.getResult().os.name
  }`;
};

export default clientInfo;
