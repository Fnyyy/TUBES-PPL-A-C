import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const USER_UPLOADED_DIR = 'C:\\Users\\MUHAMMAD RADITYA\\.gemini\\antigravity-ide\\brain\\a0f10eab-362f-48ea-8fdf-1dba62dbd7e5\\.user_uploaded';

const FILE_MAP: Record<string, string> = {
  'slide2.jpg': 'media_1791724391901.jpg',
  'slide2-target.jpg': 'media_1791724391901.jpg',
  'target-student.jpg': 'media_1791724391901.jpg',
  'slide3-curled.jpg': 'media_1791664508985.jpg',
  'curled-student.jpg': 'media_1791664508985.jpg',
  'cyberbullying.jpg': 'media_1791664505622.jpg',
};

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ filename: string }> | { filename: string } }
) {
  try {
    const resolvedParams = await Promise.resolve(context.params);
    const filename = resolvedParams?.filename || '';
    const targetFile = FILE_MAP[filename] || filename;
    const filePath = path.join(USER_UPLOADED_DIR, targetFile);

    if (!fs.existsSync(filePath)) {
      return new NextResponse('Asset not found', { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);
    const ext = path.extname(filePath).toLowerCase();
    const contentType = ext === '.png' ? 'image/png' : 'image/jpeg';

    // Also copy to public/images if possible
    try {
      const publicDir = path.join(process.cwd(), 'public', 'images');
      if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
      }
      const publicDest = path.join(publicDir, filename);
      if (!fs.existsSync(publicDest)) {
        fs.writeFileSync(publicDest, fileBuffer);
      }
    } catch {
      // Ignore background sync errors
    }

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=43200',
      },
    });
  } catch (error) {
    return new NextResponse('Internal error', { status: 500 });
  }
}
