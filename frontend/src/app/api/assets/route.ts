import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const USER_UPLOADED_DIR = 'C:\\Users\\MUHAMMAD RADITYA\\.gemini\\antigravity-ide\\brain\\a0f10eab-362f-48ea-8fdf-1dba62dbd7e5\\.user_uploaded';

const FILE_MAP: Record<string, string> = {
  slide2: 'media_1791724391901.jpg',
  'slide2-target': 'media_1791724391901.jpg',
  slide3: 'media_1791664508985.jpg',
  'curled-student': 'media_1791664508985.jpg',
  cyberbullying: 'media_1791664505622.jpg',
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name') || 'slide2';
    const targetFile = FILE_MAP[name] || `${name}.jpg`;
    const filePath = path.join(USER_UPLOADED_DIR, targetFile);

    if (!fs.existsSync(filePath)) {
      return new NextResponse(`File not found: ${filePath}`, { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);
    const ext = path.extname(filePath).toLowerCase();
    const contentType = ext === '.png' ? 'image/png' : 'image/jpeg';

    // Also copy to public/images for permanent fast serving
    try {
      const publicDir = path.join(process.cwd(), 'public', 'images');
      if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
      }
      fs.writeFileSync(path.join(publicDir, 'slide2-target.jpg'), fs.readFileSync(path.join(USER_UPLOADED_DIR, 'media_1791724391901.jpg')));
      fs.writeFileSync(path.join(publicDir, 'slide3-curled.jpg'), fs.readFileSync(path.join(USER_UPLOADED_DIR, 'media_1791664508985.jpg')));
    } catch (e) {
      // ignore
    }

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (err: any) {
    return new NextResponse(`Error: ${err?.message}`, { status: 500 });
  }
}
