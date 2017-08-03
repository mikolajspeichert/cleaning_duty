var SLACK_WEBHOOK = 'https://hooks.slack.com/services/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'
var slack = require('slack-notify')(SLACK_WEBHOOK);

module.exports = (channel, name, duties) => {
  let content = "Hi " + name + "!\n You got some work to do today! " +
    "Please, do the following activities: \n"

  for(let duty of duties){
    content += duty.name + " \n"
  }
  slack.send({
    channel: '@' + channel,
    icon_emoji: ':toilet:',
    username: 'Cleaning duty',
    text: content
  })
}