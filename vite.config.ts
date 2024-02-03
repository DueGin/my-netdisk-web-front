import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import {NaiveUiResolver} from 'unplugin-vue-components/resolvers';
import {resolve} from 'path';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
import {viteMockServe} from "vite-plugin-mock";
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
  resolve: {
    alias: {
      '@': resolve(__dirname, "src")
    },
    extensions: ['.js', '.json', '.ts', '.vue'] // 使用路径别名时想要省略的后缀名，可以自己 增减
  }
})
