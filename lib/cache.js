import redis from "redis";

const Cache = () => {
  const client = redis.createClient({
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
  })

  client.on("error", function (error) {
    console.log("Problem faced with the redis client:")
    console.log(error);
  })

  const get = (key) =>  new Promise((resolve, reject) => {
    client.get(key, (err, value) => {
      if (err) return reject(err);

      return resolve(value);
    })
  })

  const set = (key, value) => new Promise((resolve, reject) => {
    client.set(key, value, err => {
      if (err) return reject(err)

      return resolve(true);
    })
  })

  return {
    get,
    set,
  }
}

export default Cache();
