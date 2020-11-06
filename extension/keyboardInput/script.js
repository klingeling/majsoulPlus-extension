let now = -1;
let leaveMode = false;

function setPai(index) {
  const len = view.ViewPlayer_Me.Inst.hand.length;
  if (index < 0) {
    index = len - 1;
  } else if (index > len - 1) {
    index = 0;
  }

  now = index;
  view.ViewPlayer_Me.Inst.setChoosePai(view.ViewPlayer_Me.Inst.hand[index]);
}

function movePai(add) {
  const len = view.ViewPlayer_Me.Inst.hand.length;
  let index = now + add;
  if (index < 0) {
    index += len;
  } else if (index > len - 1) {
    index -= len;
  }
  setPai(index);
}

function executeAction(i, lengthLimit = false) {
  if (
    uiscript.UI_ChiPengHu.Inst.enable &&
    (!lengthLimit || uiscript.UI_ChiPengHu.Inst._oplist.length === 2) &&
    i >= 0 &&
    i < uiscript.UI_ChiPengHu.Inst._oplist.length
  ) {
    // others' action
    const actionMap = {
      btn_chi: "onBtn_Chi",
      btn_peng: "onBtn_Peng",
      btn_gang: "onBtn_Gang",
      btn_hu: "onBtn_Hu",
      btn_cancel: "onBtn_Cancel"
    };
    uiscript.UI_ChiPengHu.Inst[
      actionMap[uiscript.UI_ChiPengHu.Inst._oplist[i]]
    ]();
    return true;
  } else if (
    uiscript.UI_LiQiZiMo.Inst.enable &&
    (!lengthLimit || uiscript.UI_LiQiZiMo.Inst._oplist.length === 2) &&
    i >= 0 &&
    i < uiscript.UI_LiQiZiMo.Inst._oplist.length
  ) {
    // your own action
    const actionMap = {
      btn_jiuzhongjiupai: "onBtn_Liuju",
      btn_babei: "onBtn_BaBei",
      btn_gang: "onBtn_Gang",
      btn_lizhi: "onBtn_Liqi",
      btn_zimo: "onBtn_Zimo",
      btn_cancel: "onBtn_Cancel"
    };
    uiscript.UI_LiQiZiMo.Inst[
      actionMap[uiscript.UI_LiQiZiMo.Inst._oplist[i]]
    ]();
    return true;
  }
  return false;
}

window.addEventListener(
  "keydown",
  event => {
    if (
      view &&
      view.ViewPlayer_Me &&
      view.ViewPlayer_Me.Inst &&
      Array.isArray(view.ViewPlayer_Me.Inst.hand) &&
      view.ViewPlayer_Me.Inst.hand.length > 0
    ) {
      // in game
      switch (event.keyCode) {
        case 13:
          // enter
          if (leaveMode) {
            uiscript.UI_SecondConfirm.Inst.root
              .getChildByName("btn_confirm")
              .clickHandler.run();
            leaveMode = false;
          } else if (!executeAction(0, true) && uiscript.UI_Win.Inst.enable) {
            uiscript.UI_Win.Inst.onConfirm();
          } else if (view.ViewPlayer_Me.Inst.can_discard && now >= 0) {
            view.ViewPlayer_Me.Inst.DoDiscardTile();
            now = -1;
          }
          break;
        case 27:
          // esc
          if (uiscript.UI_ChiPengHu.Inst.enable) {
            uiscript.UI_ChiPengHu.Inst.onBtn_Cancel();
          } else if (uiscript.UI_LiQiZiMo.Inst.enable) {
            uiscript.UI_LiQiZiMo.Inst.onBtn_Cancel();
          } else if (leaveMode) {
            // avoid leave
            uiscript.UI_SecondConfirm.Inst.root
              .getChildByName("btn_cancel")
              .clickHandler.run();
            leaveMode = false;
          } else if (now >= 0) {
            view.ViewPlayer_Me.Inst.resetMouseState();
            now = -1;
          } else {
            uiscript.UI_DesktopInfo.Inst._btn_leave.clickHandler.method();
            leaveMode = true;
          }
          break;
        case 36:
          // Home
          setPai(0);
          break;
        case 35:
          // End
          setPai(13);
          break;
        case 33:
          // Page Up
          movePai(-2);
          break;
        case 34:
          // Page Down
          movePai(2);
          break;
        case 37:
          // left
          movePai(-1);
          break;
        case 39:
          // right
          movePai(1);
          break;
        case 192:
          // pai 0, key ~
          setPai(0);
          break;
        case 49:
          // pai 1, key 1
          if (!executeAction(0)) setPai(1);
          break;
        case 50:
          // pai 2, key 2
          if (!executeAction(1)) setPai(2);
          break;
        case 51:
          // pai 3, key 3
          if (!executeAction(2)) setPai(3);
          break;
        case 52:
          // pai 4, key 4
          setPai(4);
          break;
        case 53:
          // pai 5, key 5
          setPai(5);
          break;
        case 54:
          // pai 6, key 6
          setPai(6);
          break;
        case 55:
          // pai 7, key 7
          setPai(7);
          break;
        case 56:
          // pai 8, key 8
          setPai(8);
          break;
        case 57:
          // pai 9, key 9
          setPai(9);
          break;
        case 48:
          // pai 10, key 0
          setPai(10);
          break;
        case 189:
          // pai 11, key -
          setPai(11);
          break;
        case 187:
          // pai 12, key +
          setPai(12);
          break;
        case 8:
          // pai 13, key Backspace
          setPai(13);
          break;
        default:
          break;
      }
    }
  },
  true
);
