import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

// Disable bodyParser so Next.js can handle file uploads
export const config = {
    api: {
      bodyParser: false,
    },
  };

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        console.log("ERROR -----------------------")
        console.log(req.body)
        const { imageFile, metadata } = req.body;
        const filePath = path.join(process.cwd(), 'uploads', path.basename(metadata.image));

        // Example: Save the file or perform other server-side operations
        fs.writeFileSync(filePath, imageFile);

        res.status(200).json({ message: 'File uploaded successfully' });
    } else if (req.method === 'GET') {
        // Handle GET request logic here if needed
        res.status(200).json({ message: 'GET request received' });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}