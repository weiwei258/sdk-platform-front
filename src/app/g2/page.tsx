"use client"
import { useEffect, useRef } from "react";
import { Chart } from '@antv/g2';

export default function G2Demo() {

  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    (() => {
      const chart = new Chart({
        container: domRef.current!,
        width: 500,
        height: 500,
      });

      chart
        .data([
          { time: '2023-12-12', 'color': '1-3秒', value: 1, file: 'file1' },
          { time: '2023-12-12', 'color': '1-3秒', value: 2, file: 'file1' },
          { time: '2023-12-12', 'color': '4-5秒', value: 4, file: 'file1' },
          { time: '2023-12-12', 'color': '样本数', value: 20, file: 'file1' },
          { time: '2023-12-13', 'color': '1-3秒', value: 3, file: 'file1' },
          { time: '2023-12-14', 'color': '4-5秒', value: 4, file: 'file1' }
        ])
        .scale(
          {
            y: {
              independent: true
            }
          })

      chart.interval()
        .encode('x', 'time')
        .encode('y', 'value')
        .encode('color', 'color')
        .transform({ type: 'stackY' })
        .transform({ type: 'normalizeY' })
        .axis('y', { labelFormatter: '.0%', title: false })
        .axis('x', { tickCount: 24 })

      chart
        .line()
        .data([
          { time: '2023-12-12', 'color': '请求成功率', value: 0.9, file: 'file1' },
          { time: '2023-12-13', 'color': '请求成功率', value: 0.8, file: 'file1' },
          { time: '2023-12-14', 'color': '请求成功率', value: 0.85, file: 'file1' }
        ])
        .encode('x', 'time')
        .encode('y', 'value')
        .encode('color', 'color')
        .scale('y', {
          type: 'linear',
          domainMin: 0,
          domainMax: 1
          /* 其他配置项 */
        })
        .axis('y', false)


      // chart.point()
      //   .encode('x', 'time')
      //   .encode('y', 'value')
      //   .encode('color', 'color')

      chart.render();

    })();
  }, [])

  return <div ref={domRef} />
}