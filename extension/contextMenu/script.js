// 作者: bin
if (game) {
  /** 自定义样式表 */
  const style = "./majsoul_plus/extension/contextMenu/contextMenu.css";
  /** 自定义功能菜单,通过2.0特有属性动态获取 */
  const body = {};
  let promise = Promise.resolve();

  function JSON2Div(node, json) {
    for (let key in json) {
      if (!json[key] || typeof json[key] === "function") {
        let e = document.createElement("div")
        e.className = "menu menuitem";
        e.innerHTML = key;
        e.onclick = json[key];
        node.appendChild(e);
      } else if (typeof json[key] === "object") {
        let e = document.createElement("div")
        e.className = "menu";
        e.innerHTML = key;
        node.appendChild(e);
        JSON2Div(e, json[key])
      }
    }
    return node;
  }
  class ContextMenu {
    constructor() {
      /** 添加css样式 */
      this.styleE = document.createElement("style");
      this.styleE.type = "text/css";
      promise = promise.then(fetch(style).then(css => css.text()).then(css => this.styleE.innerHTML = css))
      document.head.appendChild(this.styleE);
      /**	添加菜单框本体 */
      this.menuE = document.createElement("div");
      this.menuE.className = "mainmenu";
      document.body.appendChild(this.menuE);
      /** ie? */
      window.addEventListener("click", this._onclick.bind(this));
      window.addEventListener("contextmenu", this._oncontextmenu.bind(this));
      // window.addEventListener("keyup", this._onkeypress.bind(this));
    }
    /**
     * 刷新菜单
     */
    reflashMenu() {
      this.menuE.innerHTML = "";
      return this;
    }
    /**
     * 添加菜单
     * @param {string} name 名字,与已有名字重复时会被覆盖,长度为0时则不显示名字
     * @param {JSON} json json
     */
    setMenu(name, json) {
      body[name] = json;
      return this.reflashMenu();
    }
    /**
     * 移除菜单
     * @param {string[]} names 节点最上层名字
     */
    removeMenu(...names) {
      names.forEach(name => delete body[name])
      return this.reflashMenu();
    }

    /**
     * 显示右键菜单
     * @param {MouseEvent} e 
     * @private
     */
    _oncontextmenu(e) {
      e.preventDefault();
      if (!this.menuE.innerHTML) { //(相对较耗时)在显示时初始化,留充分时间让其他插件修改body
        JSON2Div(this.menuE, body);
      }
      this.menuE.style.left = e.clientX + 'px';
      this.menuE.style.top = e.clientY + 'px';
      this.menuE.style.display = "block";
    }
    /**	
     * 关闭右键菜单
     *  @private
     */
    _onclick() {
      //绑定在window上，按事件冒泡处理，不会影响菜单的功能
      this.menuE.style.display = "none";
    }
    /**
     * 按键事件
     * @param {KeyboardEvent} e 
     */
    _onkeypress(e) {
      if (!e.altKey || !e.ctrlKey || !e.shiftKey) {

        console.log(e);
      }
    }
  }
  // 不再注册到window中,通过
  let contextMenu = /*window.contextMenu =*/ new ContextMenu();
  Majsoul_Plus["contextMenu"] = {
    name: "右键菜单主功能",
    actions: {
      帮助: () => uiscript.UIMgr.Inst.ShowErrorInfo("刷新按钮: 刷新按钮页面\n初始化菜单: 重新获取插件快捷菜单指令"),
      刷新按钮: () => contextMenu.reflashMenu(),
      初始化菜单: () => {
        for (let extension in Majsoul_Plus) {
          promise = promise.then(
            new Promise(res => {
              // console.log(extension, "读取成功");
              let shortcut = Majsoul_Plus[extension];
              let name, actions;
              if (!!shortcut.actions) {
                name = shortcut.name ? shortcut.name : extension;
                actions = shortcut.actions;
              }
              res(name ? contextMenu.setMenu(name, actions) : null)
            })
            .catch(e => console.error(e))
          )
        }
      }
    }
  };
  contextMenu.setMenu(Majsoul_Plus["contextMenu"].name, Majsoul_Plus["contextMenu"].actions)

}