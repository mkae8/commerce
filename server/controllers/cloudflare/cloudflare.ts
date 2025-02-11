import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 } from "uuid";
import env from "dotenv";
env.config();

if (
  !process.env.CLOUDFLARE_ACCESS_KEY_ID ||
  !process.env.CLOUDFLARE_SECRET_ACCESS_KEY
) {
  throw new Error(
    "Cloudflare access key ID and secret access key must be defined in environment variables."
  );
}

const S3 = new S3Client({
  endpoint: process.env.CLOUDFLARE_ENDPOINT,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID,
    secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY,
  },
  region: "auto",
});

export async function getPresignedUrl(count: string) {
  const keys = Array.from({ length: Number(count) }, () => v4());

  const urls = keys.map(async (id) => {
    const getPresignedUrl = await getSignedUrl(
      S3,
      new PutObjectCommand({ Bucket: "ecommerce", Key: id }),
      {
        expiresIn: 60 * 60,
      }
    );
    return getPresignedUrl;
  });

  const response = await Promise.all(urls);
  return {
    uploadUrl: response,
    accessUrls: keys.map(
      (key) => `https://pub-621a10d0ad4d40c3a7e7887d77db3da6.r2.dev/${key}` // "/" нэмсэн
    ),
  };
}
