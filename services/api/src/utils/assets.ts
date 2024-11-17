import { Readable } from 'stream';
import ApiError from '../error/ApiError';

async function getAsset(filePath: string) {
  const apiKey = process.env.ASSET_SERVICE_PASSWORD;
  let response: Response | null;
  try {
    response = await fetch(
      `http://asset.service:4000/assets?file=${filePath}`,
      {
        method: 'GET',
        headers: {
          apiKey: apiKey ?? '',
        },
      },
    );
  } catch (error) {
    response = null;
  }

  if (!response) {
    throw new ApiError(500, 'Asset service error');
  }

  if (!response.ok || !response.body) {
    throw new ApiError(response.status, response.statusText);
  }

  const reader = response.body.getReader();
  const stream = new Readable({
    read() {
      reader
        .read()
        .then(({ done, value }) => {
          if (done) {
            this.push(null);
          } else {
            this.push(Buffer.from(value));
          }
        })
        .catch((error) => {
          this.emit('error', error);
          this.push(null);
        });
    },
  });

  return { stream, response };
}

export { getAsset };
