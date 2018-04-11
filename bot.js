const builder = require('botbuilder');
//
const { chatbot } = require('./config');
const { getGiphy, getLevelOfMood } = require('./libs');


const connector = new builder.ChatConnector({
    appId: chatbot.MICROSOFT_APP_ID,
    appPassword: chatbot.MICROSOFT_APP_PASSWORD
});

const bot = new builder.UniversalBot(connector);
bot.on('conversationUpdate', function (message) {
    if (message.membersAdded[0].id === message.address.bot.id) {
        const reply = new builder.Message().address(message.address).text('Hello!');
        bot.send(reply);
    }
});
bot.dialog('/', async function (session) {
    const moodProbability = await getLevelOfMood(session.message.text);
    const score = moodProbability.documents[0].score;
    let mood = '';
    if (score > 0.8) {
        mood = 'happy';
    } else if (score > 0.1) {
        mood = 'stressed';
    } else {
        mood = 'crisis';
    }
    // session.send(`Your mood: ${mood}`);
    session.beginDialog('/' + mood);
});

bot.dialog('/happy', [
    function (session) {
        builder.Prompts.text(session, 'What makes you happy?');
    }, async function (session, res) {
        const giphRes = await getGiphy(res.response);
        session.send({
            text: 'We have something interesting for you:',
            attachments: [{
                contentType: 'image/gif',
                contentUrl: JSON.parse(giphRes).data.images.original.url
            }]
        });
    }
]);


module.exports = { bot, connector };