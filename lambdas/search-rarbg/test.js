const { handler } = require('./index.js');

const event =  {
    queryStringParameters: {
        imdbID: 'tt0068646',
        token: '3rfujwd9qz'
    }
}

handler(event);
