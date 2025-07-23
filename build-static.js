import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function buildStatic() {
  console.log('🏗️  Building Remix app...');
  execSync('npm run build', { stdio: 'inherit' });

  console.log('📁 Creating static output directory...');
  const outputDir = path.join(__dirname, 'dist');
  await fs.ensureDir(outputDir);
  await fs.emptyDir(outputDir);

  // Copy public assets
  console.log('📋 Copying public assets...');
  const publicDir = path.join(__dirname, 'public');
  if (await fs.pathExists(publicDir)) {
    await fs.copy(publicDir, outputDir);
  }

  // Copy build assets
  console.log('📦 Copying build assets...');
  const buildPublicDir = path.join(__dirname, 'build/client');
  if (await fs.pathExists(buildPublicDir)) {
    await fs.copy(buildPublicDir, outputDir);
  }

  // Create index.html for static hosting
  console.log('📄 Creating static HTML...');
  const indexHtml = `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FastFive 남부터미널 - 프리미엄 공유오피스</title>
    <meta name="description" content="남부터미널역 도보 10분, 최신 시설과 쾌적한 환경의 프리미엄 공유오피스 FastFive">
    <meta property="og:title" content="FastFive 남부터미널 - 프리미엄 공유오피스">
    <meta property="og:description" content="남부터미널역 도보 10분, 최신 시설과 쾌적한 환경의 프리미엄 공유오피스">
    <meta property="og:type" content="website">
    <link rel="stylesheet" href="/assets/root-*.css">
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
    <div id="root">
        <div class="min-h-screen bg-gray-50">
            <!-- Header -->
            <header class="bg-white shadow-sm sticky top-0 z-50">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex justify-between items-center h-16">
                        <h1 class="text-2xl font-bold text-gray-900">FastFive 남부터미널</h1>
                        <nav class="flex space-x-8">
                            <a href="#gallery" class="text-gray-700 hover:text-gray-900">시설 갤러리</a>
                            <a href="#location" class="text-gray-700 hover:text-gray-900">위치 안내</a>
                        </nav>
                    </div>
                </div>
            </header>

            <!-- Hero Section -->
            <section class="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="text-center">
                        <h2 class="text-4xl font-bold mb-4">프리미엄 공유오피스의 새로운 기준</h2>
                        <p class="text-xl mb-8">남부터미널역에서 도보 10분, 최고의 업무 환경을 경험하세요</p>
                    </div>
                </div>
            </section>

            <!-- Gallery Section -->
            <section id="gallery" class="py-16">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 class="text-3xl font-bold text-center mb-12">시설 갤러리</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div class="bg-white rounded-lg shadow-md overflow-hidden">
                            <img src="/images/11층라운지_신축이라_깨끗하고_인테리어가_깔끔하다.jpg" alt="11층 라운지" class="w-full h-64 object-cover">
                            <div class="p-4">
                                <h3 class="font-semibold text-lg">11층 라운지</h3>
                                <p class="text-gray-600">신축 건물의 깔끔한 인테리어</p>
                            </div>
                        </div>
                        <div class="bg-white rounded-lg shadow-md overflow-hidden">
                            <img src="/images/배정받은자리_넓고_쾌적하였다.jpg" alt="개인 업무공간" class="w-full h-64 object-cover">
                            <div class="p-4">
                                <h3 class="font-semibold text-lg">개인 업무공간</h3>
                                <p class="text-gray-600">넓고 쾌적한 개인 공간</p>
                            </div>
                        </div>
                        <div class="bg-white rounded-lg shadow-md overflow-hidden">
                            <img src="/images/각층마다_이러한_집기류가_구비되어_있었다.jpg" alt="층별 편의시설" class="w-full h-64 object-cover">
                            <div class="p-4">
                                <h3 class="font-semibold text-lg">층별 편의시설</h3>
                                <p class="text-gray-600">완벽한 사무 집기 구비</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Location Section -->
            <section id="location" class="py-16 bg-gray-100">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 class="text-3xl font-bold text-center mb-12">위치 안내</h2>
                    <div class="bg-white rounded-lg shadow-md p-8">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h3 class="text-xl font-semibold mb-4">찾아오시는 길</h3>
                                <ul class="space-y-2 text-gray-600">
                                    <li>• 지하철 남부터미널역에서 도보 10분</li>
                                    <li>• 주차 공간 완비 (승인된 차량만 이용 가능)</li>
                                    <li>• 장애인 주차 공간 구비</li>
                                </ul>
                            </div>
                            <div>
                                <h3 class="text-xl font-semibold mb-4">운영 시간</h3>
                                <ul class="space-y-2 text-gray-600">
                                    <li>• 평일: 08:00 - 22:00</li>
                                    <li>• 주말: 09:00 - 18:00</li>
                                    <li>• 공휴일: 휴무</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Footer -->
            <footer class="bg-gray-800 text-white py-8">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p>&copy; 2024 FastFive 남부터미널. All rights reserved.</p>
                </div>
            </footer>
        </div>
    </div>
</body>
</html>`;

  await fs.writeFile(path.join(outputDir, 'index.html'), indexHtml);

  console.log('✅ Static build complete! Output in ./dist directory');
}

buildStatic().catch(console.error);