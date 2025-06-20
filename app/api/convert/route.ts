import fs from "fs";
import { exec } from "child_process";
import path from "path";

const checkCommandAvailable = (cmd: string) => {
  return new Promise((resolve) => {
    exec(`${cmd} --version`, (error) => {
      resolve(!error); // If there's no error, the command exists
    });
  });
};

// Directory to store temporary files
const tempDir = path.join(__dirname, "temp");
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

/**
 * Function to convert a base64 JP2 file to PNG and return the PNG as base64.
 * @param {string} jp2ImageBase64 - JP2 image in base64.
 * @returns {Promise<string>} - PNG image in base64.
 */
const convertBase64JP2ToPNGBase64 = (jp2ImageBase64: string) => {
  return new Promise(async (resolve, reject) => {
    if (await checkCommandAvailable("convert")) {
      try {
        const jp2Filename = `input_${Date.now()}.jp2`;
        const jp2Path = path.join(tempDir, jp2Filename);
        const pngFilename = `output_${Date.now()}.png`;
        const pngPath = path.join(tempDir, pngFilename);
        const jp2Buffer = Buffer.from(jp2ImageBase64, "base64");
        // Save the JP2 file
        fs.writeFileSync(jp2Path, jp2Buffer);
        // Execute the conversion using ImageMagick
        const command = `convert "${jp2Path}" "${pngPath}"`;
        exec(command, (err, stdout, stderr) => {
          // Delete temporary jp2 file
          fs.unlinkSync(jp2Path);
          if (err) {
            // Delete temporary png file
            fs.unlinkSync(pngPath);
            return reject(stderr);
          }
          // Read the resulting JPG image and convert it to base64
          const pngImageBase64 = fs.readFileSync(pngPath, {
            encoding: "base64",
          });
          // Delete temporary png file
          fs.unlinkSync(pngPath);
          resolve(pngImageBase64);
        });
      } catch (error) {
        reject(`Error converting JP2 to PNG ${error}`);
      }
    } else {
      reject(
        "Your system does not have imagemagick installed. First, install it and try again",
      );
    }
  });
};

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { jp2ImageBase64 } = data;
    if (!jp2ImageBase64) {
      return new Response(JSON.stringify({ error: "No base 64 provided" }), {
        status: 400,
      });
    }
    const pngImageBase64 = await convertBase64JP2ToPNGBase64(jp2ImageBase64);
    return new Response(JSON.stringify({ pngImageBase64 }));
  } catch (error) {
    console.error("Error converting jp2 image: ", error);
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
}
