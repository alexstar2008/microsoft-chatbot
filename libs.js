const RP = require('request-promise');
//
const header = {
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': '7e48bbdad09140f6a9da19749793bc23'
}

async function getLevelOfMood(message) {
    const options = {
        method: 'POST',
        uri: 'https://westeurope.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment',
        body: {
            documents: [{ id: '1', language: 'en', text: message }]
        },
        json: true,
        headers: header
    };
    return await RP(options);
}
async function getGiphy(str) {
    const options = {
        method: 'GET',
        uri: 'https://api.giphy.com/v1/gifs/translate',
        qs: {
            s: str,
            api_key: '9n8AIaWULVu37sA1k8eE38IwnCCjmXP9'
        }
    };
    const giph = await RP(options);
    return giph;
}

module.exports = {
    getLevelOfMood,
    getGiphy
};