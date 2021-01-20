if (game) {
	const refreshInfo = uiscript.UI_Lobby.prototype.refreshInfo;
	uiscript.UI_Lobby.prototype.refreshInfo = function () {
		if (!GameMgr.Inst.account_data.email) {
			GameMgr.Inst.account_data.email = "点击绑定";
		}
		if (!GameMgr.Inst.account_data.phone) {
			GameMgr.Inst.account_data.phone = "点击认证";
		}
		uiscript.UI_Lobby.Inst.top.refreshRedpoint();
		return refreshInfo.call(this);
	}
	console.log("右上角红点已关闭")
}
