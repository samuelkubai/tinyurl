import { encode } from "../../lib/b62";
import { save } from "../../lib/database";
import Cache from "../../lib/cache";

const handler = async (req, res) => {
  const {
    query: { url }
  } = req

  while (true) {
    try {
      const code = encode((new Date()))
      const result = await save(code, url)
      const record = result.rows[0]
      await Cache.set(record.code, JSON.stringify(record));
      return res.status(200).json(record);
    } catch(error) {
      console.log("Failed to create or save the shorten code")
      console.log(error)
    }
  }
}

export default handler;
