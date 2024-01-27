const amqplib = require("amqplib");

const { MESSAGE_BROKER_URL, EXCHANGE_NAME } = require("../config/serverConfig");

const messageChannel = async () => {
  try {
    //channel creation
    const connection = await amqplib.connect(MESSAGE_BROKER_URL);
    const channel = await connection.createChannel();

    //asserting the channel to the queue
    //purpose of assertQueue is to make sure that the queue exists
    //before we try to consume messages from it

    await channel.assertExchange(EXCHANGE_NAME, "direct", false);
    return channel;
  } catch (error) {
    console.log("Error in creating message channel", error);
  }
};

const subscribeToQueue = async (channel, service, binding_key) => {
  try {
    const appQueue = await channel.assertQueue("QUEUE_NAME");

    channel.bindQueue(appQueue.queue, EXCHANGE_NAME, binding_key);

    channel.consume(appQueue.queue, (msg) => {
      console.log("Message received");
      console.log(msg.content.toString());
      channel.ack(msg);
    });
  } catch (error) {
    console.log("Error in subscribing to queue", error);
  }
};

/** channel.publish()
 * param 1: give a distributor name i.e. EXCHANGE_NAME which will distribute the message to the queue
 * param 2: give a key, which is used by distributor to know to which queue the message should be sent
 * param 3: give the message, it is generally wrapped in a buffer for security
 */
const publishToQueue = async (channel, binding_key, message) => {
  try {
    await channel.assertQueue("QUEUE_NAME");
    await channel.publish(EXCHANGE_NAME, binding_key, Buffer.from(message));
  } catch (error) {
    console.log("Error in publishing message to queue", error);
  }
};

module.exports = {
  messageChannel,
  subscribeToQueue,
  publishToQueue,
};
