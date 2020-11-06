!function(){
    const inject = function() {
        if (GameMgr && GameMgr.Inst && GameMgr.Inst.checkPaiPu) {
            console.log("checkPaiPu injected.");
            GameMgr.Inst.checkPaiPu=function(t, e, i) {
        var n = this;
        app.Log.log("checkPaiPu game_uuid:" + t + " account_id:" + e.toString() + " paipu_config:" + i), this.duringPaipu ? app.Log.Error("已经在看牌谱了") : (this.duringPaipu = !0, uiscript.UI_Loading.Inst.show("enter_mj"), 2 & i && (t = game.Tools.DecodePaipuUUID(t)), app.NetAgent.sendReq2Lobby("Lobby", "fetchGameRecord", {
            game_uuid: t
        }, function(t, a) {
            if (t || a.error) uiscript.UIMgr.Inst.showNetReqError("fetchGameRecord", t, a), uiscript.UI_Loading.Inst.close(null), uiscript.UIMgr.Inst.showLobby(), n.duringPaipu = !1;
            else {
                uiscript.UI_Loading.Inst.setProgressVal(.1);
                var r = a.head,
                    s = [null, null, null, null],
                    o = game.Tools.strOfLocalization(2003),
                    l = r.config.mode;
                //if (l.testing_environment) return uiscript.UIMgr.Inst.ShowErrorInfo(game.Tools.strOfLocalization(3162)), uiscript.UI_Loading.Inst.close(null), uiscript.UIMgr.Inst.showLobby(), void(n.duringPaipu = !1);
                l.extendinfo && (o = game.Tools.strOfLocalization(2004)), l.detail_rule && l.detail_rule.ai_level && (1 === l.detail_rule.ai_level && (o = game.Tools.strOfLocalization(2003)), 2 === l.detail_rule.ai_level && (o = game.Tools.strOfLocalization(2004)));
                var h = !1;
                r.end_time && r.end_time > 1576112400 && (h = !0);
                for (x = 0; x < r.accounts.length; x++) {
                    var c = r.accounts[x];
                    if (c.character) {
                        var _ = c.character,
                            u = {};
                        if (h) {
                            var d = c.views;
                            if (d)
                                for (p = 0; p < d.length; p++) u[d[p].slot] = d[p].item_id
                        } else {
                            var f = _.views;
                            if (f)
                                for (var p = 0; p < f.length; p++) {
                                    var m = f[p].slot,
                                        g = f[p].item_id;
                                    u[m - 1] = g
                                }
                        }
                        var y = [];
                        for (var v in u) y.push({
                            slot: parseInt(v),
                            item_id: u[v]
                        });
                        c.views = y, s[c.seat] = c
                    } else c.character = {
                        charid: c.avatar_id,
                        level: 0,
                        exp: 0,
                        views: [],
                        skin: cfg.item_definition.character.get(c.avatar_id).init_skin,
                        is_upgraded: !1
                    }, c.avatar_id = c.character.skin, c.views = [], s[c.seat] = c
                }
                for (var b = game.GameUtility.get_default_ai_skin(), w = game.GameUtility.get_default_ai_character(), x = 0; x < s.length; x++) null == s[x] && (s[x] = {
                    nickname: o,
                    avatar_id: b,
                    level: {
                        id: 10101
                    },
                    level3: {
                        id: 20101
                    },
                    character: {
                        charid: w,
                        level: 0,
                        exp: 0,
                        views: [],
                        skin: b,
                        is_upgraded: !1
                    }
                });
                var I = Laya.Handler.create(n, function(t) {
                        game.Scene_Lobby.Inst.active && (game.Scene_Lobby.Inst.active = !1), game.Scene_MJ.Inst.openMJRoom(r.config, s, Laya.Handler.create(n, function() {
                            n.duringPaipu = !1, view.DesktopMgr.Inst.paipu_config = i, view.DesktopMgr.Inst.initRoom(JSON.parse(JSON.stringify(r.config)), s, e, view.EMJMode.paipu, Laya.Handler.create(n, function() {
                                uiscript.UI_Replay.Inst.initData(t), uiscript.UI_Replay.Inst.enable = !0, Laya.timer.once(1e3, n, function() {
                                    n.EnterMJ()
                                }), Laya.timer.once(1500, n, function() {
                                    view.DesktopMgr.player_link_state = [view.ELink_State.READY, view.ELink_State.READY, view.ELink_State.READY, view.ELink_State.READY], uiscript.UI_DesktopInfo.Inst.refreshLinks(), uiscript.UI_Loading.Inst.close()
                                }), Laya.timer.once(1e3, n, function() {
                                    uiscript.UI_Replay.Inst.nextStep(!0)
                                })
                            }))
                        }), Laya.Handler.create(n, function(t) {
                            return uiscript.UI_Loading.Inst.setProgressVal(.1 + .9 * t)
                        }, null, !1))
                    }),
                    C = {};
                C.record = r, a.data && a.data.length ? (C.game = net.MessageWrapper.decodeMessage(a.data), I.runWith(C)) : game.LoadMgr.httpload(a.data_url, "arraybuffer", !1, Laya.Handler.create(n, function(t) {
                    if (t.success) {
                        var e = new Laya.Byte;
                        e.writeArrayBuffer(t.data);
                        var i = net.MessageWrapper.decodeMessage(e.getUint8Array(0, e.length));
                        C.game = i, I.runWith(C)
                    } else uiscript.UIMgr.Inst.ShowErrorInfo(game.Tools.strOfLocalization(2005) + a.data_url), uiscript.UI_Loading.Inst.close(null), uiscript.UIMgr.Inst.showLobby(), n.duringPaipu = !1
                }))
            }
        }))
    }
        } else setTimeout(inject, 1000);
    }
    inject();
    console.log("checkPaiPu inited");
}()
