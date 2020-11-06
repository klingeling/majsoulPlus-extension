if (game) {
  let character = ["kawei", "zeniya"]
  let pro = Promise.resolve();
  class PaiSound {
    constructor() {
      this.index = 0;
      this.readSetting()
      this.init()
    }
    init() {
      const _this = this;

      const AddQiPai = view.Block_QiPai.prototype.AddQiPai;
      view.Block_QiPai.prototype.AddQiPai = function (t, i, n, a) {
        if (_this._qipaisound) {
          if (view.DesktopMgr.Inst.mode == view.EMJMode.play) {
            // pro = pro.then(p => new Promise(ret => {
            _this.currentSound && _this.currentSound.stop();
            _this.currentSound = _this._PlayPaiSound(t)
            // }));
          }
        }
        return AddQiPai.call(this, t, i, n, a);
      };

      const play = view.ActionNewRound.play;
      view.ActionNewRound.play = function (e) {
        if (_this._dorasound) {
          pro = pro.then(p => new Promise(ret => {
            _this._PlaySound("fan_dora1", {
              "run": () => {
                _this._PlayPaiSound(_this._toDora(e.doras[0]), {
                  run: () => ret()
                });
              }
            })
          }))
        }
        return play.call(this, e)
      }

      const WhenDoras = view.DesktopMgr.prototype.WhenDoras;
      view.DesktopMgr.prototype.WhenDoras = function (e, i) {
        if (_this._dorasound) {
          if (view.DesktopMgr.Inst.mode == view.EMJMode.play) {
            if (e.length > this.dora.length) {
              _this._PlayDoraSound(e);
            }
          }
        }
        return WhenDoras.call(this, e, i)
      }
    }
    readSetting() {
      this._qipaisound = !!Number(localStorage.getItem("QiPaiSound"));
      this._dorasound = !!Number(localStorage.getItem("DoraSound"));
      this.index = Number(localStorage.getItem("SoundIndex"));
      this.index = character[this.index] ? 0 : this.index;
    }
    writeSetting() {
      localStorage.setItem("QiPaiSound", Number(this._qipaisound))
      localStorage.setItem("DoraSound", Number(this._dorasound))
      localStorage.setItem("SoundIndex", Number(this.index))
    }
    set QiPaiSound(bool) {
      alert("打牌报牌" + (bool ? "打开" : "关闭"), true);
      this._qipaisound = !!bool;
    }
    get QiPaiSound() {
      return !!this._qipaisound;
    }
    set DoraSound(bool) {
      alert("宝牌报牌" + (bool ? "打开" : "关闭"), true);
      this._dorasound = !!bool;
    }
    get DoraSound() {
      return !!this._dorasound;
    }
    changeSound() {
      if (++this.index >= character.length) this.index -= character.length;
      alert("更换成功,当前播报角色为" + character[this.index], true);
      this.writeSetting();
    }
    _toDora(dora) {
      dora = mjcore.MJPai.Create(dora.toString().replace(/0/, "5"));
      let n = dora.index + 1;
      view.DesktopMgr.Inst.rule_mode == view.ERuleMode.Liqi4 ?
        dora.type == 3 ? dora.index <= 4 ? 5 == n && (n = 1) : 8 == n && (n = 5) : 10 == n && (n = 1) :
        view.DesktopMgr.Inst.rule_mode == view.ERuleMode.Liqi3 &&
        dora.type == 3 ? dora.index <= 4 ? 5 == n && (n = 1) : 8 == n && (n = 5) :
        (dora.type == 2 || dora.type == 0) ? 10 == n && (n = 1) : (10 == n && (n = 1), 2 == n && (n = 9))
      dora.index = n;
      return dora
    }
    _PlaySound(t, fun) {
      return view.AudioMgr.PlaySound(`audio/sound/${character[this.index]}/${t.toString()}`, 1, fun)
    }
    _PlayPaiSound(t, fun) {
      t = t.toString().replace(/0/, "5");
      console.log("报牌", t);
      return this._PlaySound("pai_" + t, fun)
    }
    _PlayDoraSound(doras) {
      const _this = this;
      if (view.DesktopMgr.Inst) {
        doras = doras ? doras : view.DesktopMgr.Inst.dora
        doras = doras.map(dora => _this._toDora(dora));
        let i = 0;
        let fun = (ret) => {
          if (i < doras.length) {
            _this._PlayPaiSound(doras[i++], {
              "run": () => fun(ret)
            })
          } else ret()
        };
        pro = pro.then(p => new Promise(ret => {
          _this._PlaySound("fan_dora1", {
            "run": () => fun(ret)
          })
        }))
      }
    }
  }

  if (!window.paiSound) {
    window.paiSound = new PaiSound();
    Majsoul_Plus["pais_sound"] = {
      name: '语音麻将',
      actions: {
        '开启/关闭打牌语音': () => window.paiSound.QiPaiSound = !window.paiSound.QiPaiSound,
        "开启/关闭宝牌语音": () => window.paiSound.DoraSound = !window.paiSound.DoraSound,
        "更换报牌语音": () => window.paiSound.changeSound(),
        "报当前宝牌": () => window.paiSound._PlayDoraSound(),
        "手动保存设置": () => window.paiSound.writeSetting()
      }
    }

    console.log("报牌器 加载完毕")
  } else {
    console.log("HideID 被占用")
  }
}