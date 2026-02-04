/**
 * 图片优化脚本
 * 为资质证书生成 WebP 缩略图
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 配置
const CONFIG = {
  certifications: {
    srcDir: path.join(process.cwd(), 'public/assets/images/certifications'),
    thumbWidth: 300,
    thumbHeight: 200,
    suffix: '-thumb',
  },
  skills: {
    srcDir: path.join(process.cwd(), 'public/assets/images/skills'),
    thumbWidth: 320,  // 从 600x424 缩小
    thumbHeight: 214,
    suffix: '-sm',
  },
};

/**
 * 生成缩略图
 */
async function generateThumbnail(inputPath, outputPath, width, height) {
  await sharp(inputPath)
    .resize(width, height, {
      fit: 'cover',
      withoutEnlargement: true
    })
    .webp({ quality: 80 })
    .toFile(outputPath);
  const sizeKB = Math.round(fs.statSync(outputPath).size / 1024);
  console.log(`  ✓ ${path.basename(outputPath)} (${sizeKB}KB)`);
}

/**
 * 处理目录
 */
async function processDirectory(dir, options) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!['.png', '.jpg', '.jpeg'].includes(ext)) continue;

    const inputPath = path.join(dir, file);
    const name = path.parse(file).name;
    const outputPath = path.join(dir, `${name}${options.suffix}.webp`);

    // 检查输出目录是否存在
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // 如果缩略图已存在且比原图新，跳过
    if (fs.existsSync(outputPath)) {
      const thumbStat = fs.statSync(outputPath);
      const srcStat = fs.statSync(inputPath);
      if (thumbStat.mtime > srcStat.mtime) {
        console.log(`  - ${name} (已存在)`);
        continue;
      }
    }

    // 生成缩略图
    await generateThumbnail(
      inputPath,
      outputPath,
      options.thumbWidth,
      options.thumbHeight
    );
  }
}

/**
 * 主函数
 */
async function main() {
  console.log('🖼️  开始优化图片...\n');

  // 优化资质证书
  console.log('--- 资质证书 ---');
  await processDirectory(CONFIG.certifications.srcDir, CONFIG.certifications);

  // 优化技能证书（生成更小的缩略图）
  console.log('\n--- 技能证书 ---');
  await processDirectory(CONFIG.skills.srcDir, CONFIG.skills);

  console.log('\n✅ 优化完成！');
}

main().catch(console.error);
