import Cache from "../../lib/cache";
import { get } from "../../lib/database";

const handler = async (req, res) => {
  const {
    query: {
      code
    }
  } = req

  // Check cache and return if available
  const cacheValue = await Cache.get(code);
  if (cacheValue !== null) {
    const record = JSON.parse(cacheValue);
    return res.status(200).json(record)
  }

  // Check database and return if available
  const result = await get(code);
  if (result.rows.length) {
    const record = result.rows[0];
    return res.status(200).json(record);
  }

  return res.status(404).json({ code, message: "The provided code could not be matched" })
}

export default handler;
