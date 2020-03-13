module.exports = {
  "presets": ["@babel/preset-env", "@babel/preset-react"],
  "plugins": [
    [
      "import",{
        "libraryName": "cr-react-ui",
        "camel2DashComponentName": false, // 是否需要驼峰转短线
        "camel2UnderlineComponentName": false, // 是否需要驼峰转下划线
        customName: (name) => {
          return `cr-react-ui/lib/${name}` // 核心配置 根据你自己的组件目录配置
        },
        // customStyleName: "css"
        style: (name) => {
          return `${name}/index.css`
        }
      },
    ]
  ]
}
