/**
 * HTML 图片引用更新脚本
 * 批量更新图片引用以使用缩略图 + srcset + lazy loading
 */

import fs from 'fs';
import path from 'path';

/**
 * 替换 HTML 中的图片引用
 */
function updateHtmlFile(filePath, rules) {
  let content = fs.readFileSync(filePath, 'utf-8');

  let modified = false;
  for (const { pattern, replacement } of rules) {
    const newContent = content.replace(pattern, replacement);
    if (newContent !== content) {
      modified = true;
    }
    content = newContent;
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✓ ${path.basename(filePath)}`);
  } else {
    console.log(`- ${path.basename(filePath)} (无需更新)`);
  }
}

// 规则配置
const RULES = [
  // 资质证书 PNG -> WebP 缩略图 + srcset
  {
    pattern: /src="assets\/images\/certifications\/([^"]+)\.png"/g,
    replacement: 'src="/assets/images/certifications/$1-thumb.webp"\n' +
                '          srcset="/assets/images/certifications/$1-thumb.webp 300w,\n' +
                '                  /assets/images/certifications/$1.png 800w"\n' +
                '          sizes="(max-width: 768px) 150px, 300px"',
  },
  // 为没有 loading 属性的 cert-image 添加 loading="lazy"
  {
    pattern: /class="cert-image"(\s*)>/g,
    replacement: 'class="cert-image"$1\n          loading="lazy">',
  },
  // 为没有 loading 属性的 credential-image 添加 loading="lazy"
  {
    pattern: /class="credential-image"(\s*)>/g,
    replacement: 'class="credential-image"$1\n                  loading="lazy">',
  },
];

// 处理文件
const files = [
  'src/html/sections/trust.html',
  'src/html/pages/contest.html',
  'src/html/pages/skills.html',
];

console.log('📝 开始更新 HTML...\n');
for (const file of files) {
  updateHtmlFile(file, RULES);
}
console.log('\n✅ 更新完成！');
