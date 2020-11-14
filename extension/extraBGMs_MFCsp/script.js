// 增强型BGM，作者 rin93 改造 青龙圣者
if (!!view && !!uiscript) {
	//h1为精算点正分,h2为Top,h3为精算点负分;r1为他家立直，r2为自家立直，r3为追立；连庄BGM为e1-e3.
  const _showBackup = uiscript.UI_GameEnd.prototype.show
  uiscript.UI_GameEnd.prototype.show = function () {
      var musicPlayerFlag = false
      view.DesktopMgr.Inst.gameEndResult.players.forEach((player, index) => {
        if (player.seat == view.DesktopMgr.Inst.seat) {
          if (index == 0) {
            view.AudioMgr.PlayMusic('my_music/h2.mp3', 1, false, true)
            musicPlayerFlag = true
          } else if (player.total_point >= 0) {
            view.AudioMgr.PlayMusic('my_music/h1.mp3', 1, false, true)
            musicPlayerFlag = true
          } else {
            view.AudioMgr.PlayMusic('my_music/h3.mp3', 1, false, true)
            musicPlayerFlag = true
          }
        }
      })
      if (!musicPlayerFlag) {
        view.AudioMgr.PlayMusic('my_music/h1.mp3', 1, false, true)
      }
      _showBackup.apply(this, arguments)
    }
	
	
  !(function(e = view, u = uiscript, i = view.DesktopMgr, am = view.AudioMgr) {
    var _cy_riched
    var _cy_myrich
    var _cy_cur_bgm
    var _cy_fc
    var _cy_bgmidx
    var _cy_tk
	var _cy_ben
    var tmp
    ;(am.PlayMusic = (() => {
      var o = am.PlayMusic
      return function(e, i) {
        return e != 'music/game.mp3' && !_cy_fc && o.apply(this, arguments)
      }
    })()),
      (paiRemain = () => {
        return i.Inst.left_tile_count <= 20
      }),
      (playMusic = () => {
        var t = ''
        if (_cy_riched) {
          t = _cy_riched > 1 ? 'r' + 3 : _cy_myrich ? 'r' + 2 : 'r' + 1
        }else if(_cy_ben > 0){
		  t = paiRemain() ? 'p' : _cy_ben < 4 ? 'e' +  _cy_ben : 'e' + 3
		}
		else{
          t = paiRemain() ? 'p' : (_cy_bgmidx % 8) + ''
        }
        _cy_cur_bgm = !t ? _cy_cur_bgm : 'my_music/' + t + '.mp3'
        !_cy_fc && _cy_cur_bgm && i.Inst.gameing && am.PlayMusic(_cy_cur_bgm)
      }),
      (e.ViewPlayer.prototype.AddQiPai = (function() {
        var o = e.ViewPlayer.prototype.AddQiPai
        return function(r, x, y, z) {
          return (
            x &&
              (++_cy_riched,
              (_cy_myrich = this.container_qipai.player.seat == i.Inst.seat),
              playMusic()),
            o.apply(this, arguments)
          )
        }
      })()),
      (newRound = function(t) {
        if (!_cy_tk && i.Inst) {
          _cy_tk = 1
          i.Inst.RefreshPaiLeft = (() => {
            var o = i.Inst.RefreshPaiLeft
            return function(a, b) {
              return paiRemain() && playMusic(), o.apply(this, arguments)
            }
          })()
        }
        _cy_cur_bgm = ''
		//t.ju为局数，t.ben为本场数
        _cy_bgmidx = t.chang*4 + t.ju
		_cy_ben=t.ben
        _cy_riched = 0
        new Error().stack.split('\n')[2].match(/fastrecord/) && (_cy_fc = 1)
        playMusic()
      }),
      'play fastplay record fastrecord'.split(' ').forEach(i => {
        e.ActionNewRound[i] = (() => {
          var o = e.ActionNewRound[i]
          return function(t) {
            return (tmp = o.apply(this, arguments)), newRound(t), tmp
          }
        })()
      }),
      Object.entries({
        Replay: '_refreshBarshow',
        Live_Broadcast: '_fastSync'
      }).forEach(([k, v]) => {
        u['UI_' + k]['prototype'][v] = (() => {
          var o = u['UI_' + k]['prototype'][v]
          return function() {
            return (
              (tmp = o.apply(this, arguments)),
              _cy_fc && ((_cy_fc = 0), playMusic()),
              tmp
            )
          }
        })()
      })
  })(view, uiscript, view.DesktopMgr, view.AudioMgr)
}
