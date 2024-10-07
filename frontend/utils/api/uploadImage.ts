import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { imageFile, metadata } = req.body;
        const filePath = path.join(process.cwd(), 'uploads', path.basename(metadata.image));

        // Example: Save the file or perform other server-side operations
        fs.writeFileSync(filePath, imageFile);

        res.status(200).json({ message: 'File uploaded successfully' });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}