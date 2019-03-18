import PubNub from 'pubnub';
import SoundPlayer from 'react-native-sound-player'

class _PuppetProvider {

  constructor() {
    this.pubnub = new PubNub({
      publishKey: 'pub-c-35c0a342-eb63-440b-b688-89d8ced6f499',
      subscribeKey: 'sub-c-634d2abe-28df-11e9-991a-bee2ac9fced0'
    });

    this.pubnub.addListener({
      status: function (statusEvent) {
      },
      message: (msg) => {
        let payload = JSON.parse(msg.message);

        if (payload.type === "terms") {
          this.terms = this.terms.concat(payload.terms);
        } else if (payload.type === "audio") {
          if (this.speechDelegate != null) {
            this.speechDelegate.handleReceived(payload);
            SoundPlayer.playUrl(payload.url);
          }
        } else if (payload.type === "command") {
        } else if (payload.type === "transcript") {
        }
      },
      presence: function (presenceEvent) {
      }
    });

    this.pubnub.subscribe({
      channels: ['default']
    });

    this.terms = [
      {
        word: "work",
        sentiment: 0
      }
    ];
  
    this.transcripts = [
      {
        timestamp: 1552627771,
        text: "My boss asked me to stay late again. This is really cutting into my familiy time and I don’t know how I am supposed to balance everything. I’m getting ot the point of desperation."
      },
      {
        timestamp: 1552627771,
        text: "I’m feeling really stressed. I feel like I just have no time for myself and its getting to me I just keep thinking. Am I prioritizing my time enough?"
      },
      {
        timestamp: 1552627771,
        text: "I just don’t feel like I have enough time. My work is so important to me but my family is also the most important thing right?"
      },
      {
        timestamp: 1552627771,
        text: "I am feeling a little stressed today. Not getting a lot of time off and I feel like that is really starting to cut into my happiness."
      },
    ];

    this.addNewTerms = this.addNewTerms.bind(this);
  }

  addNewTerms = (terms) => {
    this.terms = this.terms.concat(terms);
  }

  removeTranscript = (index) => {
    this.transcripts.splice(index, 1);
  }
}

export default new _PuppetProvider()