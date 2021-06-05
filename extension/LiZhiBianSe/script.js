// bin
class LiZhiBianSe {
  constructor() {
    this.color = [
      new Laya.Vector4(228 / 255, 160 / 255, 133 / 255, 1),
      new Laya.Vector4(252 / 255, 247 / 255, 154 / 255, 1),
      new Laya.Vector4(205 / 255, 255 / 255, 205 / 255, 1),
      new Laya.Vector4(1, 1, 1, 1)
    ];
    this._init();
  }
  _init() {
    const _this = this;
    const play = view.ActionLiqi.play;
    view.ActionLiqi.play = function (e) {
      _this.changeColor();
      return play.call(this, e);
    }
    const fastplay = view.ActionLiqi.fastplay;
    view.ActionLiqi.fastplay = function (e, i) {
      _this.changeColor();
      return fastplay.call(this, e, i);
    }
    const OnChoosedPai = view.ViewPai.prototype.OnChoosedPai;
    view.ViewPai.prototype.OnChoosedPai = function () {
      try {
        let e = view.DesktopMgr.Inst.choosed_pai;
        if (null == e || 0 != mjcore.MJPai.Distance(this.val, e)) {
          if (this.lastColor !== undefined) {
            this.model.meshRender.sharedMaterial.setColor(caps.Cartoon.COLOR, this.lastColor);
          } else if (this.isxuezhanhu || this.ispaopai) {
            this.model.meshRender.sharedMaterial.setColor(caps.Cartoon.COLOR, new Laya.Vector4(1, .78, .78, 1));
          } else if (this.ismoqie) {
            this.model.meshRender.sharedMaterial.setColor(caps.Cartoon.COLOR, new Laya.Vector4(.8, .8, .8, 1));
          } else {
            this.model.meshRender.sharedMaterial.setColor(caps.Cartoon.COLOR, this.GetDefaultColor());
          }
        } else {
          this.model.meshRender.sharedMaterial.setColor(caps.Cartoon.COLOR, new Laya.Vector4(.615, .827, .976, 1));
        }
      } catch (e) {
        OnChoosedPai.call(this);
        console.error(e)
      }
    }
    console.log("立直标注 开");
  }
  setColor(pai, color) {
    if (pai == null) return;
    if ((pai.lastColor !== undefined)) return;
    pai.lastColor = color;
    pai.model.meshRender.sharedMaterial.setColor(caps.Cartoon.COLOR, pai.lastColor);
  }
  changeColor() {
    try {
      let number = view.DesktopMgr.Inst.players.filter(p => p.trans_liqi.active).length;
      view.DesktopMgr.Inst.players.forEach(player => {
        this.setColor(player.container_qipai.last_pai, this.color[number]);
        player.container_qipai.pais.forEach(pai => {
          this.setColor(pai, this.color[number]);
        });
      });
    } catch (e) {
      console.log(e,)
    }
  }
}
(() => {
  window.liZhiBianSe = new LiZhiBianSe();
})();