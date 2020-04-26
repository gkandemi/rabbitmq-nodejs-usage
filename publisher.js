const amqp = require("amqplib");
const message = {
  description: "Bu bir test mesajıdır.."
};
const data = require("./data.json")
const queueName = process.argv[2] || "jobsQueue";

connect_rabbitmq();

async function connect_rabbitmq() {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    const assertion = await channel.assertQueue(queueName);

    data.forEach(i => {
        message.description = i.id;
        channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
        console.log("Gonderilen Mesaj", i.id);    
    })



    /* ============= Interval.==========================================================
    setInterval(() => {
        message.description = new Date().getTime();
        channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
        console.log("Gonderilen Mesaj", message);
    }, 1);
    // ============= Interval.========================================================== */

  } catch (error) {
    console.log("Error", error);
  }
}
