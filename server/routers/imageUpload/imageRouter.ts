import { Router } from "express";
import { getPresignedUrl } from "../../controllers/cloudflare/cloudflare";

const imegaUpload = Router();

imegaUpload.get("/image/:count", async (req, res) => {
  const { count } = req.params;
  try {
    const result = await getPresignedUrl(count);

    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

export default imegaUpload;
