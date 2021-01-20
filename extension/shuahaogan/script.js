var RoomID = 19;//13乱斗东,14乱斗南,19三银东,20三银南,33宝牌狂热,34配牌明牌,35龙之目力
var auto = false;
if (game) {
	const resetFunc = uiscript.UI_DesktopInfo.prototype.resetFunc;
	uiscript.UI_DesktopInfo.prototype.resetFunc = function () {
		if (auto) {
			view.DesktopMgr.Inst.setAutoHule(true);
			view.DesktopMgr.Inst.setAutoNoFulu(true);
		}
		return resetFunc.call(this);
	}

	const play = view.ActionNewRound.play;
	view.ActionNewRound.play = function (e) {
		if (auto && e.ju == view.ViewPlayer_Me.Inst.seat) {
			e.al ? DiscardTile(3000) : DiscardTile(1700);
		}
		return play.call(this, e)
	}

	const _play = view.ActionDealTile.play
		view.ActionDealTile.play = function (e) {
		if (auto && e.seat == view.ViewPlayer_Me.Inst.seat) {
			DiscardTile(1700);
		}
		return _play.call(this, e)
	}

	const show = uiscript.UI_ScoreChange.prototype.show;
	uiscript.UI_ScoreChange.prototype.show = function (t) {
		if (auto) {
			uiscript.UI_ScoreChange.Inst.onBtnConfirm();
		} else {
			return show.call(this, t);
		}
	}

	const _showHule = uiscript.UI_Win.prototype._showHule;
	uiscript.UI_Win.prototype._showHule = function (t) {
		if (auto) {
			uiscript.UI_Win.Inst.onConfirm();
		}
		return _showHule.call(this, t);
	}

	const _showInfo_mj = uiscript.UI_Win.prototype._showInfo_mj;
	uiscript.UI_Win.prototype._showInfo_mj = function (e) {
		if (auto) {
			uiscript.UI_Win.Inst.onConfirm();
		}
		return _showInfo_mj.call(this, e);
	}

	const GameEnd_show = uiscript.UI_GameEnd.prototype.show;
	uiscript.UI_GameEnd.prototype.show = function () {
		if (auto) {
			uiscript.UI_GameEnd.Inst.step = 81;
			uiscript.UI_GameEnd.Inst.onConfirm();
			if (uiscript.UI_Sushe.main_chara_info.level != 5 && GameMgr.Inst.account_data.gold > coin) {
				Laya.timer.once(10000, this, function () {
					startPiPei(RoomID);
				})
			}
		}
		return GameEnd_show.call(this)
	}

	const startPiPei = function (a) {
		app.NetAgent.sendReq2Lobby("Lobby", "matchGame", {
			match_mode: a
		}, function (e, n) {
			(e || n.error) && (uiscript.UIMgr.Inst.showNetReqError("matchGame", e, n), uiscript.UIBase.anim_alpha_out(r.bg, {
					x: 60,
					alpha: 0
				}, 150, 0, Laya.Handler.create(r, function () {
						var t = r.match_id,
						e = r.pos;
						r.match_id = -1,
						r.pos = -1,
						r.me.visible = !1
					})))
		})
	}

	//去挂机验证
	uiscript.UI_Hanguplogout.prototype.show = function () {}
	const sendReq2Lobby = app.NetAgent.sendReq2Lobby;
	app.NetAgent.sendReq2Lobby = function (k, u, s, a) {
		if (k === "Lobby" && u === "heatbeat") {
			s.no_operation_counter = (Math.random() * 160).toFixed(3);
		}
		return sendReq2Lobby.call(this, k, u, s, a);
	}
	const gameInit = GameMgr.prototype.gameInit;
	GameMgr.prototype.gameInit = function () {
		Laya.timer.loop(1e3, this, function () {
			GameMgr.Inst._pre_mouse_point.x = -1;
			GameMgr.Inst._pre_mouse_point.y = -1;
		})
		return gameInit.call(this);
	}
	//随机出牌
	const DiscardTile = function (e) {
		a = Math.floor(Math.random() * 3500); //过出牌时间验证（可能有吧）
		a += e
		Laya.timer.once(a, this, function () {
			hand_index = Math.floor(Math.random() * 13) //防止模切导致封号
				view.ViewPlayer_Me.Inst.setChoosePai(view.ViewPlayer_Me.Inst.hand[hand_index]);
			view.ViewPlayer_Me.Inst.DoDiscardTile();
		})
	}

	window.startFarm = function (a) {
		auto = true;
		coin = a;
		if (auto && uiscript.UI_Sushe.main_chara_info.level != 5) {
			startPiPei(RoomID);
		}
	}

	window.stopFarm = function () {
		auto = false;
		view.DesktopMgr.Inst.setAutoNoFulu(false);
	}
	console.log("自动刷好感度机方法加载完毕");
}
//万能注入UI方法
(function () {
	const injectHaoGanUI = function () {
		if (
			typeof uiscript === 'undefined' ||
			!uiscript.UI_DesktopInfo ||
			typeof ui === 'undefined' ||
			!Laya.View.uiMap['lobby/lobby'] ||
			!Laya.View.uiMap['lobby/friend']) {
			console.log('Majsoul ShuaHaoGanUIScript inject failed, Retring.')
			return setTimeout(injectHaoGanUI, 1000)
		}
		console.log('Majsoul ShuaHaoGanUIScript injected.');
		//注入ui
		(() => {
			Laya.loader.load("auto.png", null);
			let e = Laya.View.uiMap["lobby/lobby"].child[5].child;
			let t = {
				child: [{
						type: "Script",
						props: {
							runtime: "capsui.CButton"
						}
					}, {
						type: "Image",
						props: {
							anchorX: 0.5,
							anchorY: 0.5,
							height: 75,
							skin: "auto.png",
							width: 75,
							x: 50,
							y: 50
						}
					}
				],
				props: {
					anchorX: 0.5,
					anchorY: 0.5,
					height: 100,
					name: "btn_auto",
					width: 100,
					x: 1848,
					y: 800,
					clickHandler: Laya.Handler.create(this, function () {
						uiscript.UI_SecondConfirm.Inst.show("是否开始刷好感度", Laya.Handler.create(this, function () {
							window.startFarm(RoomID);
							}), null)
					}, null, !1)
				},
				type: "Button"
			}
			e.push(t);
		})();
	}
	injectHaoGanUI()
})()
// 1848 513