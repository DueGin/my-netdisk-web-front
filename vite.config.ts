import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import {NaiveUiResolver} from 'unplugin-vue-components/resolvers';
import {resolve} from 'path';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
import {viteMockServe} from "vite-plugin-mock";
import {viteStaticCopy} from "vite-plugin-static-copy";
// import requireTransform from 'vite-plugin-require-transform';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueSetupExtend(),
    viteMockServe({
      mockPath: "./src/mock/source", // 指向mock下的文件
      localEnabled: true // 是否开启开发环境
    }),
    // requireTransform({
    //   fileRegex: /.js$|.vue$/
    // }),
    viteStaticCopy({
      targets: [
        {
          src: './_redirects',
          dest: '',
        },
      ],
    }),
    AutoImport({
      imports: [
        'vue',
        {
          'naive-ui': [
            'useDialog',
            'useMessage',
            'useNotification',
            'useLoadingBar'
          ]
        }
      ]
    }),
    Components({
      resolvers: [NaiveUiResolver()]
    })
  ],
  server: {
    host: '0.0.0.0',
    cors: true,
    open: false,
    hmr: true,
    port: 5173,
    proxy: {
      "/api": {
        // 允许跨域
        changeOrigin: true,
        // 忽略安全证书
        secure: true,
        // 重写路径吧路径变为空字符
        rewrite: (path) => path.replace(/^api/, '')
      }
    }
  },
  build: {
    outDir: 'dist', // 生成输出的根目录。如果该目录存在，则会在生成之前将其删除。 默认文件夹名称为dist
    target: 'esnext',
    terserOptions: {
      compress: {
        drop_console: true, // 生产环境去掉控制台 console
        drop_debugger: true, // 生产环境去掉控制台 debugger 默认就是true
        dead_code: true, // 删除无法访问的代码 默认就是true
      }
    },
    chunkSizeWarningLimit: 2000, // 调整区块大小警告限制
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, "src")
    },
    extensions: ['.js', '.json', '.ts', '.vue'] // 使用路径别名时想要省略的后缀名，可以自己 增减
  }
})
