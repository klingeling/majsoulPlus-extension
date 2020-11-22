class EventUIConfig extends uiscript.UI_Config {
  onCreate(...args) {
    EventUIConfig.event.emit('before-onCreate', this, ...args);
    super.onCreate(...args);
    EventUIConfig.event.emit('after-onCreate', this, ...args);
  }

  refresh_tab(...args) {
    EventUIConfig.event.emit('before-refresh_tab', this, ...args);
    super.refresh_tab(...args);
    EventUIConfig.event.emit('after-refresh_tab', this, ...args);
  }

  show(...args) {
    EventUIConfig.event.emit('before-show', this, ...args);
    super.show(...args);
    EventUIConfig.event.emit('after-show', this, ...args);
  }

  hide(...args) {
    EventUIConfig.event.emit('before-hide', this, ...args);
    super.hide(...args);
    EventUIConfig.event.emit('after-hide', this, ...args);
  }

  onBgmChange(...args) {
    EventUIConfig.event.emit('before-onBgmChange', this, ...args);
    super.onBgmChange(...args);
    EventUIConfig.event.emit('after-onBgmChange', this, ...args);
  }
}

EventUIConfig.event = new context.EventEmitter();

uiscript.UI_Config = EventUIConfig;
context.UI_Config = EventUIConfig;
