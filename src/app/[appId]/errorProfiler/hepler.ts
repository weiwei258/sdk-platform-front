import { message } from 'antd';
import sourceMap from 'source-map-js';

// 将所有的空格转化为实体字符
function repalceAll(str: string) {
  return str.replace(new RegExp(' ', 'gm'), '&nbsp;');
}

// 找到以.js结尾的fileName
function matchStr(str: string) {
  if (str.endsWith('.js')) return str.substring(str.lastIndexOf('/') + 1);
}

function loadSourceMap(fileName: string,appId:string) {
  let file = matchStr(fileName);
  if (!file) return;
  return new Promise((resolve) => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/static/uploads/mapFile/${appId}/${file}.map`).then((response) => {
      console.log(response)
      resolve(response.json());
    });
  });
}

type FindCodeBySourceMapParams = {
  fileName: string;
  line: number;
  column: number;
  appId:string;
}
export const findCodeBySourceMap = async ({ fileName, line, column,appId }: FindCodeBySourceMapParams) => {
  // console.log('findCodeBySourceMap', { fileName, line, column })
  // console.log('fileName', fileName);
  let sourceData: any = await loadSourceMap(fileName,appId);
  if (!sourceData) return;
  let { sourcesContent, sources } = sourceData;
  // console.log('sourceData', sourceData)
  let consumer = await new sourceMap.SourceMapConsumer(sourceData);
  let result = consumer.originalPositionFor({
    line: Number(line),
    column: Number(column)
  });
  // console.log('result', result)
  /**
   * result结果
   * {
   *   "source": "webpack://myapp/src/views/HomeView.vue",
   *   "line": 24,  // 具体的报错行数
   *   "column": 0, // 具体的报错列数
   *   "name": null
   * }
   * */
  if (result.source && result.source.includes('node_modules')) {
    // 三方报错解析不了，因为缺少三方的map文件，
    // 比如echart报错 webpack://web-see/node_modules/.pnpm/echarts@5.4.1/node_modules/echarts/lib/util/model.js
     message.error({
      content: `源码解析失败: 因为报错来自三方依赖，报错文件为 ${result.source}`
    });
    return
  }

  let index = sources.indexOf(result.source);

  // 未找到，将sources路径格式化后重新匹配 /./ 替换成 /
  // 测试中发现会有路径中带/./的情况，如 webpack://web-see/./src/main.js
  if (index === -1) {
    let copySources = JSON.parse(JSON.stringify(sources)).map((item: any) =>
      item.replace(/\/.\//g, '/')
    );
    index = copySources.indexOf(result.source);
  }
  // console.log('index', index);
  if (index === -1) {
     message.error({
      content: `源码解析失败`
    });
    return
  }

  let code = sourcesContent[index];
  let codeList = code.split('\n');
  var row = result.line,
    len = codeList.length - 1;
  var start = row - 5 >= 0 ? row - 5 : 0, // 将报错代码显示在中间位置
    end = start + 9 >= len ? len : start + 9; // 最多展示10行
  let newLines = [];
  let j = 0;
  for (var i = start; i <= end; i++) {
    j++;
    newLines.push(
      `<div class="code-line ${i + 1 == row ? 'heightlight' : ''}" title="${i + 1 == row ? result.source : ''
      }">${j}. ${repalceAll(codeList[i])}</div>`
    );
  }

  let innerHTML = `<div class="errdetail"><div class="errheader">${result.source} at line ${result.column
    }:${row}</div><div class="errdetail">${newLines.join('')}</div></div>`;

  return innerHTML
};
