requestAnimationFrame(function autoRun() {
  try {
    const arrBackup = cfg.voice.sound.groups_
    if (!arrBackup || arrBackup.length === 0) {
      throw new Error();
    }
    console.log('Hacked语音文本');
    Object.entries(cfg.voice.sound.groups_).forEach(([soundID, soundGroup]) => {
      if (soundID == 15) {
        const changeMap = {
          "获得语音": {
            "words": 'か、神谷奈緒だよっ。ホ、ホントにあたしがアイドルなんてなれんのかよ…？無理じゃないかな…いや、可愛いカッコとかしたいわけじゃないし…ホ、ホントだってば！',
          },
          "登录语音普通": {
            "words": 'おはよっ。朝はやっぱり眠いよな…ふわぁ'
          },
          "登录语音满羁绊": {
            "words": 'んっ、んー、なんかあっというまにお昼だな。頑張ってる？'
          },
          "大厅交互语音1": {
            "words": 'なーんだよー！眉毛はいいだろ眉毛はー！個性だよー！'
          },
          "大厅交互语音2": {
            "words": 'わぁっ！いきなり肩を叩くなよっ。驚くだろっ…怒りはしないけどさ'
          },
          "大厅交互语音3": {
            "words": 'なんだよ、あたしの顔になんかついて…え、紙くず？あ、ありがと'
          },
          "大厅交互语音4": {
            "words": 'プロデューサーさん、責任取れよな。あたしも…やってみせるから'
          },
          "大厅交互语音5": {
            "words": 'あ、あたしのこと心配してくれてるんだよな。わかってるよ、ありがとな'
          },
          "大厅交互语音6": {
            "words": 'はーっ……気持ちいいなー……。ここまでやりきることって、昔はなかった気がするよ。元から、わりと適当に生きてた方だしさ。'
          },
          "大厅交互语音7": {
            "words": '……はぁ！？似合い過ぎて直視できない！？アンタ、なに言ってんだ！？え、おい、マジか！？ふ、ふーん……そ、そういうことなら……よーし。'
          },
          "大厅交互语音8": {
            "words": '世の中にはたくさんの漫画があるけど、この同人誌だけは、あたしたちがいなかったらこの世に生まれなかった……。そう考えると、何だか誇らしい気持ちになるよ。へへっ♪'
          },
          "送礼物语音普通": {
            "words": 'うわ、これ可愛い…い、いや、なんでもないぞっ'
          },
          "送礼物语音喜好": {
            "words": '……き、今日は………… 可愛いって、言ってくれてもいいんだぞ……。'
          },
          "好感度升级语音1": {
            "words": 'だから、プロデューサーさんにスカウトしてもらって実は嬉しかったんだ。…なかなか感謝を伝えられなかったけど。'
          },
          "好感度升级语音2": {
            "words": '別れることが哀しいんじゃない…もうこの手で触れられないことが、名前を呼ばれないことが哀しいんだ…。なぁ…あたしたちは、いつまで一緒にいられるのかな…'
          },
          "好感度升级语音3": {
            "words": '景色も抜群、気持ちのいい風も出てきたし…へへっ、思いっきり走ってみるか！おっと、その前に、靴紐をぎゅっと結んで…よし、オッケー！全速力でいくぞっ！'
          },
          "好感度升级语音4": {
            "words": '信じていれば、夢はきっと叶う……。諦めずに立ち向かえば、どんな困難でも乗り越えられる……。ありがちなメッセージだけど、大事なことだと思うんだ。'
          },
          "好感度升级语音5": {
            "words": '夢を叶えるって気持ちが、嘘じゃないことを知ってる。だからみんなにも、同じ気持ちを感じてほしい！あたしたちの熱い心を、みんなにも届けたいんだ！'
          },
          "契约语音": {
            "words": 'あ、あたし、こんなカッコ似合うワケ…。うぅ…べ、べつに嬉しくなんかないからなっ。喜んでないっ！ポ、ポーズくらいならとってやるけど…わ、笑うなよっ！笑うなってばっ～！！'
          },
          "终局一位语音": {
            "words": '[Producer]さんも、この虹、見てるよな…！'
          },
          "特殊语音 - 连续打出多张相同牌": {
            "words": '（待补）'
          },
          "特殊语音 - 打出宝牌": {
            "words": '（待补）'
          },
          "特殊语音 - 余牌少于10": {
            "words": '（待补）'
          },
          "特殊语音 - 役满听牌": {
            "words": '（待补）'
          },
          "特殊语音 - 倍满/三倍满听牌": {
            "words": '（待补）'
          }
        };
        soundGroup.forEach(soundObject => {
          soundObject.level_limit = 0;
          if (changeMap.hasOwnProperty(soundObject.name_chs)) {
            for (let [key, val] of Object.entries(changeMap[soundObject.name_chs])) {
              ['_chs', '_en', '_jp'].forEach(suffix => soundObject[key + suffix] = val)
            }
          }
        });
      }
    });
    console.log('Hacked简介文本');
    cfg.item_definition.character.rows_.forEach(chr => {
      const helper = (key, val) => {
        ['', '_chs', '_en', '_jp'].forEach(suffix => chr[key + suffix] = val)
      };
      switch (chr.id) {
        case 200015:
          chr.name = '神谷奈绪';
          chr.name_chs = '神谷奈绪';
          chr.name_en = 'Nao Kamiya';
          chr.name_jp = '神谷奈緒';
          helper('desc_cv', '松井惠理子');
          helper('desc', '17岁的高中二年级生，一头乱蓬蓬的卷发，还有着特征性的粗眉毛和齐刘海。\n拥有很常见的傲娇性格。其实想要变得更少女一些，但是却往往不能很好地表达自己，以至于会把情况变得尴尬。');
          helper('desc_age', '17');
          helper('desc_birth', '9月16日');
          helper('desc_bloodtype', 'AB');
          helper('desc_hobby', '看动画');
          helper('desc_stature', '154厘米');
          break;
      }
    });
  } catch (error) {
    raf = requestAnimationFrame(autoRun);
  }
});
