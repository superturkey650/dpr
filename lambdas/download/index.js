const request = require('request-promise-native');

const host = 'http://66.69.182.20:8181';
const username = 'supert650';
const password = 'supert650';

const baseSavePath = 'N:\\downloads\\';

exports.handler = async ({ magnetLink, fileName }) => {
  let cookie;
  try {
    const options = {
      uri: `${host}/login`,
      body: `username=${username}&password=${password}`,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      resolveWithFullResponse: true,
    };
    const resp = await request.post(options);
    cookie = resp.headers['set-cookie'];
    console.log(cookie);
  } catch (err) {
    console.log(err);
    return {
      StatusCode: 500,
      Payload: 'Error connecting to qbittorrent',
    };
  }

  try {
    const formData = {
      urls: magnetLink,
      savePath: `${baseSavePath}`,
      rename: `${fileName}`,
      cookie,
    };
    console.log(JSON.stringify(formData));

    const options = {
      uri: `${host}/command/download`,
      formData,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36',
        'Content-Type': 'multipart/form-data',
        Cookie: cookie,
      },
      json: true,
    };
    const resp = await request.post(options);

    console.log(resp);
  } catch (err) {
    console.log(`err: ${err}`);
    return {
      StatusCode: 500,
      Payload: `Error adding ${magnetLink} as ${fileName}: ${err}`,
    };
  }

  return {
    StatusCode: 200,
    Payload: `Successfuly added ${magnetLink} as ${fileName}`,
  };
};
