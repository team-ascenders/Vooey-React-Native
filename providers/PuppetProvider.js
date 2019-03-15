

export default class PuppetProvider {
  static transcripts = [
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

  static removeTranscript = (index) => {
    this.transcripts.splice(index, 1);
  }
}