class EventGameMgr extends GameMgr {
  init(...args) {
    EventGameMgr.event.emit('before-init', this, ...args);
    super.init(...args);
    EventGameMgr.event.emit('after-init', this, ...args);
  }

  trasform_storage(...args) {
    EventGameMgr.event.emit('before-trasform_storage', this, ...args);
    super.trasform_storage(...args);
    EventGameMgr.event.emit('after-trasform_storage', this, ...args);
  }

  load0(...args) {
    EventGameMgr.event.emit('before-load0', this, ...args);
    super.load0(...args);
    EventGameMgr.event.emit('after-load0', this, ...args);
  }

  load1(...args) {
    EventGameMgr.event.emit('before-load1', this, ...args);
    super.load1(...args);
    EventGameMgr.event.emit('after-load1', this, ...args);
  }

  loadUStarLogin(...args) {
    EventGameMgr.event.emit('before-loadUStarLogin', this, ...args);
    super.loadUStarLogin(...args);
    EventGameMgr.event.emit('after-loadUStarLogin', this, ...args);
  }

  loadExcel(...args) {
    EventGameMgr.event.emit('before-loadExcel', this, ...args);
    super.loadExcel(...args);
    EventGameMgr.event.emit('after-loadExcel', this, ...args);
  }

  pendinglink(...args) {
    EventGameMgr.event.emit('before-pendinglink', this, ...args);
    super.pendinglink(...args);
    EventGameMgr.event.emit('after-pendinglink', this, ...args);
  }

  addScene(...args) {
    EventGameMgr.event.emit('before-addScene', this, ...args);
    super.addScene(...args);
    EventGameMgr.event.emit('after-addScene', this, ...args);
  }

  addUI(...args) {
    EventGameMgr.event.emit('before-addUI', this, ...args);
    super.addUI(...args);
    EventGameMgr.event.emit('after-addUI', this, ...args);
  }

  initUIRoot(...args) {
    EventGameMgr.event.emit('before-initUIRoot', this, ...args);
    super.initUIRoot(...args);
    EventGameMgr.event.emit('after-initUIRoot', this, ...args);
  }

  showEntrance(...args) {
    EventGameMgr.event.emit('before-showEntrance', this, ...args);
    super.showEntrance(...args);
    EventGameMgr.event.emit('after-showEntrance', this, ...args);
  }

  fetch_login_info(...args) {
    EventGameMgr.event.emit('before-fetch_login_info', this, ...args);
    super.fetch_login_info(...args);
    EventGameMgr.event.emit('after-fetch_login_info', this, ...args);
  }

  gameInit(...args) {
    EventGameMgr.event.emit('before-gameInit', this, ...args);
    super.gameInit(...args);
    EventGameMgr.event.emit('after-gameInit', this, ...args);
  }

  afterLogin(...args) {
    EventGameMgr.event.emit('before-afterLogin', this, ...args);
    super.afterLogin(...args);
    EventGameMgr.event.emit('after-afterLogin', this, ...args);
  }

  updateAccountInfo(...args) {
    EventGameMgr.event.emit('before-updateAccountInfo', this, ...args);
    super.updateAccountInfo(...args);
    EventGameMgr.event.emit('after-updateAccountInfo', this, ...args);
  }

  updateRoom(...args) {
    EventGameMgr.event.emit('before-updateRoom', this, ...args);
    super.updateRoom(...args);
    EventGameMgr.event.emit('after-updateRoom', this, ...args);
  }

  EnterMJ(...args) {
    EventGameMgr.event.emit('before-EnterMJ', this, ...args);
    super.EnterMJ(...args);
    EventGameMgr.event.emit('after-EnterMJ', this, ...args);
  }

  EnterLobby(...args) {
    EventGameMgr.event.emit('before-EnterLobby', this, ...args);
    super.EnterLobby(...args);
    EventGameMgr.event.emit('after-EnterLobby', this, ...args);
  }

  checkPaiPu(...args) {
    EventGameMgr.event.emit('before-checkPaiPu', this, ...args);
    super.checkPaiPu(...args);
    EventGameMgr.event.emit('after-checkPaiPu', this, ...args);
  }

  BehavioralStatistics(...args) {
    EventGameMgr.event.emit('before-BehavioralStatistics', this, ...args);
    super.BehavioralStatistics(...args);
    EventGameMgr.event.emit('after-BehavioralStatistics', this, ...args);
  }

  clientHeatBeat(...args) {
    EventGameMgr.event.emit('before-clientHeatBeat', this, ...args);
    super.clientHeatBeat(...args);
    EventGameMgr.event.emit('after-clientHeatBeat', this, ...args);
  }

  getHangUpTime(...args) {
    EventGameMgr.event.emit('before-getHangUpTime', this, ...args);
    super.getHangUpTime(...args);
    EventGameMgr.event.emit('after-getHangUpTime', this, ...args);
  }

  onFatalError(...args) {
    EventGameMgr.event.emit('before-onFatalError', this, ...args);
    super.onFatalError(...args);
    EventGameMgr.event.emit('after-onFatalError', this, ...args);
  }

  onXiangGongError(...args) {
    EventGameMgr.event.emit('before-onXiangGongError', this, ...args);
    super.onXiangGongError(...args);
    EventGameMgr.event.emit('after-onXiangGongError', this, ...args);
  }

  postInfo2Server(...args) {
    EventGameMgr.event.emit('before-postInfo2Server', this, ...args);
    super.postInfo2Server(...args);
    EventGameMgr.event.emit('after-postInfo2Server', this, ...args);
  }

  handleWindowError(...args) {
    EventGameMgr.event.emit('before-handleWindowError', this, ...args);
    super.handleWindowError(...args);
    EventGameMgr.event.emit('after-handleWindowError', this, ...args);
  }

  load_mjp_view(...args) {
    EventGameMgr.event.emit('before-load_mjp_view', this, ...args);
    super.load_mjp_view(...args);
    EventGameMgr.event.emit('after-load_mjp_view', this, ...args);
  }
}

EventGameMgr.event = new context.EventEmitter();
context.GameMgr = EventGameMgr;
Majsoul_Plus.Majsoul_Event_API = context;
