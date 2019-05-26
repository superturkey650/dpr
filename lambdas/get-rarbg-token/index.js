const request = require('request-promise-native');

const appID = 'DREAD_PIRATE_ROBERTO';
const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36';

exports.handler = async () => {
  const options = {
    uri: 'https://torrentapi.org/pubapi_v2.php',
    qs: {
      get_token: 'get_token',
      app_id: appID,
    },
    headers: {
      'User-Agent': userAgent,
    },
    json: true,
  };

  let response;
  try {
    response = await request.get(options);
    console.log(`response: ${JSON.stringify(response)}`);
  } catch (err) {
    const errMessage = `Error on token request: ${err}`;
    console.log(errMessage);
    return errMessage;
  }

  const { token } = response;
  console.log(`token: ${token}`);
  return {
    StatusCode: 200,
    Payload: JSON.stringify(token),
  };
};
