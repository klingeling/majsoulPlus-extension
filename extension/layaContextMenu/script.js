(() => {
  class LabelItem {
    constructor(node, value, index) {
      this.me = node;
      this.value = value[1];
      node.y = index * 100;
      this.btn_open = this.me.getChildByName("btn_open");
      this.title = this.btn_open.getChildByName("info_title");
      this.title.text = value.name;
      this.actions = Object.entries(value.actions);
      this.arrow = this.btn_open.getChildByName("arrow");
      this.container_content = this.btn_open.getChildByName("content");
      this.container_content.visible = false;
      this.contents = this.container_content._childs;
      this.contentHeight = this.actions.length * 60;
      this.container_content.removeChildAt(0);
      this.me.removeChildAt(1);
      this.btn_cd = 0;
      this.isopen = false;
      this._init();
    }
    _init() {
      this.actions.forEach((v, i) => {
        let content = new laya.ui.Label(v[0]);
        content.fontSize = 40;
        content.padding = "10,0,10,50";
        this.title.font = "sans-serif";
        content.color = "#e9c18a";
        content.y = i * 60;
        content.on("click", window, v[1])
        this.container_content.addChild(content);
      })
    }
    get height() {
      return this.contentHeight + 30;
    }
    destroy() {
      this.me.destroy()
    }
  }

  class InfoBox extends ui.lobby.infoUI {
    constructor() {
      super()
      this._init();
    }
    _init() {
      this.root = this.getChildByName("root");
      this.root.getChildByName("btn_close").clickHandler = Laya.Handler.create(this, this.close, null, false);
      this.title = this.root.getChildByName("title");
      this.title.text = "快捷菜单";
      this.title.font = "sans-serif";
      this.panel = this.root.getChildByName("info");
      this.item_templete = this.panel.getChildByName("templete");
      this.item_templete.visible = false;
      this.items = [];
    }
    show() {
      let obj = Object.entries(Majsoul_Plus).filter(v => v[1] && v[1].actions);
      if (obj.length > this.items.length) {
        this.items.forEach(v => v.destroy());
        this.items = [];
        obj.forEach(value => {
          if (value[1].actions) {
            let clone = this.item_templete.scriptMap["capsui.UICopy"].getNodeClone();
            let item = new LabelItem(clone, value[1], this.items.length)
            this.items.push(item);
            this.panel.addChild(clone);
            item.btn_open.clickHandler = Laya.Handler.create(item, this.switchShow, [item, this.items], false)
          }
        });
      }
      this.visible = true;
    }
    close() {
      this.visible = false;
    }
    switchShow(item, items) {
      let i = items.indexOf(item);
      if (Laya.timer.currTimer > item.btn_cd) {
        item.btn_cd = Laya.timer.currTimer + 200;
        Laya.timer.clearAll(item);
        item.isopen = !item.isopen;
        if (item.isopen) {
          item.container_content.visible = true;
          item.container_content.alpha = 1;
          item.arrow.rotation = 0;
          ball.infoui.panel.vScrollBar.max += item.height;
        } else {
          item.container_content.visible = false;
          item.container_content.alpha = 0;
          item.arrow.rotation = -180;
          ball.infoui.panel.vScrollBar.max -= item.height;
        }
      }
      for (i++; i < items.length; i++) {
        if (item.isopen) {
          items[i].me.y += item.height;
        } else {
          items[i].me.y -= item.height;
        }
      }
    }
  }

  class Ball extends laya.ui.Label {
    constructor() {
      super("⚙");
      Laya.stage.addChild(this);
      // this.midY = Laya.Browser.clientHeight >> 1
      // this.midX = Laya.Browser.clientWidth >> 1
      // this.x = -50;
      this.y = Laya.Browser.clientHeight >> 1;
      this._init();
    }
    _init() {
      this.color = "#ffffff";
      this.height = 100;
      this.width = 100;
      this.fontSize = 100;
      this.zOrder = 1000;
      this.on("mousedown", this, (ball, event) => {
        ball.downX = event.stageX
        ball.downY = event.stageY;
        ball.currentmove = 0;
        // clearTimeout(this.settime)
        Laya.stage.on("mousemove", ball, ball._onmove, [ball])
        ball.on("click", ball, ball._onclick, [ball])
      }, [this])
      this.on("mouseup", this, (ball, event) => {
        Laya.stage.off("mousemove", ball, ball._onmove)
        // this.settime = setTimeout(this._stayaway.bind(this), 3000);
      }, [this])
    }
    _onmove(ball, event) {
      let c = event.stageX - ball.downX;
      ball.x += c;
      ball.currentmove += Math.abs(c);
      c = event.stageY - ball.downY;
      ball.downX = event.stageX;
      ball.y += c;
      ball.downY = event.stageY;
      ball.currentmove += Math.abs(c);
      if (ball.currentmove > 50)
        ball.off("click", ball, ball._onclick)
    }
    _onclick(ball, event) {
      if (!ball.infoui) {
        ball.infoui = new InfoBox;
        Laya.stage.addChild(ball.infoui);
      }
      ball.infoui.show();
    }
    // _stayaway() {
    //   let height = Laya.Browser.height;
    //   this.settime = setInterval(this.y < (height >> 1) ? () => {
    //     if (this.y < 0) clearInterval(this.settime), this.y = 0
    //     else this.y -= 1;
    //   } : () => {
    //     if (this.y > (height >> 1)) clearInterval(this.settime), this.y = 0
    //     else this.y += 1;
    //   }, 100)
    //   this.y = this.y < (height >> 1) ? 0 : height
    // }
  }
  window.ball = new Ball;
})();