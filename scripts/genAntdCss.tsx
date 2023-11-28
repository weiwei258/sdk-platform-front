// scripts/genAntdCss.tsx
import fs from 'fs';
import { extractStyle } from '@ant-design/static-style-extract';
import { ConfigProvider } from 'antd';

const outputPath = './public/antd.min.css';

const css = extractStyle((node) => {
  return <ConfigProvider>{node}</ConfigProvider>
});

fs.writeFileSync(outputPath, css);
