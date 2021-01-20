requestAnimationFrame(function autoRun() {
  try {
    const arrBackup = cfg.voice.sound.groups_
    if (!arrBackup || arrBackup.length === 0) {
      throw new Error();
    }
    console.log('Hacked语音文本');
    Object.entries(cfg.voice.sound.groups_).forEach(([soundID, soundGroup]) => {
      if (soundID == 12) {
        const changeMap = {
          "获得语音": {
            "words": '私……佐城……雪美……。アイドル……私を……あなたが……？……手……つないで……ギュッって…………うん……大丈夫……わかった…………目指して……みる……',
          },
          "登录语音普通": {
            "words": '……ふあ……朝……ちょっと……眠……い……'
          },
          "登录语音满羁绊": {
            "words": '……ボーッとしてる……プロデューサー……だめ……'
          },
          "大厅交互语音1": {
            "words": 'プロデューサー……約束……覚えてる？うん……'
          },
          "大厅交互语音2": {
            "words": 'プロデューサー……元気じゃないと……だめ。ぜったい……約束'
          },
          "大厅交互语音3": {
            "words": '……私の……心……誰にも……見せない……知ってるの……猫……だけ……。でも……あなたには……見せる……。'
          },
          "大厅交互语音4": {
            "words": '……感じる……？……プロデューサー……私の……想い……あなたの……期待……裏切らない……きっと……。'
          },
          "大厅交互语音5": {
            "words": '……私の……望む……夢……プロデューサー……叶えてくれる……だから……私に……まかせて……。二人だけの…………約束……'
          },
          "大厅交互语音6": {
            "words": '……プロデューサー。ここまで……来られたね……。一緒に……。……約束したから……信じてた……。'
          },
          "大厅交互语音7": {
            "words": 'プロデューサーといっしょだと……楽しい……。だから……ムービーの私も……すごく楽しそう……。……見てると……今の私も……にこにこ……ふふ……。'
          },
          "大厅交互语音8": {
            "words": '……ふー……、ふーっ……。だいじょうぶ……味見、した……とっても、おいしい…………はい、プロデューサー…………あーん……。'
          },
          "送礼物语音普通": {
            "words": '……いい……気持ち……オトナの……気分……'
          },
          "送礼物语音喜好": {
            "words": '……プレゼント……きてる……いいな…………ほしい……'
          },
          "好感度升级语音1": {
            "words": '私のこと……最後まで……見てくれた……？ うん……うれしい……とっても……。私……みんなみたいに……すぐに……しゃべれない……。'
          },
          "好感度升级语音2": {
            "words": 'プロデューサーが……時間をくれる……。その……お返しに……私も……大切な気持ち…… 伝えられる……。ふふ……幸せ……。'
          },
          "好感度升级语音3": {
            "words": '大好きって……一緒にいたいって……気持ち…… プロデューサーに……届いてるよね……。もっとそばにいれば……きっと……もっと……。'
          },
          "好感度升级语音4": {
            "words": 'いつか……今までもらった分……プロデューサーに…… ううん……もっともっとたくさん……幸せ……あげる……。待ってて……約束……ずっと……。'
          },
          "好感度升级语音5": {
            "words": '私は……出逢えた……。だから……伝える……。プロデューサー……ここまで……ずっと、ありがとう……。これからも……あなたと私……ずっと一緒……約束だよ……。'
          },
          "契约语音": {
            "words": '佐城……雪美です。今日は……みんなに伝える……。小さな声……だけど……聞いてほしい……。お喋りも……歌も……ダンスも……練習したから……楽しんで……。……約束、ね'
          },
          "终局一位语音": {
            "words": '……約束…………忘れないで…………気を付けて……'
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
        case 200012:
          chr.name = '佐城雪美';
          chr.name_chs = '佐城雪美';
          chr.name_en = 'Yukimi Sajo';
          chr.name_jp = '佐城雪美';
          helper('desc_cv', '中泽美娜');
          helper('desc', '10岁的萝莉，安静又神秘。出身大户人家的大小姐，总是穿着哥特萝莉装。\n沉默寡言，平常像冰山美人一样面无表情，但有时也会露出可爱的微笑。如同这个年龄的许多女孩一样，雪美对轻飘飘的衣服感到喜悦、对工作好奇心十分旺盛。\n养有一只叫佩罗（ペロ）的黑猫，兴趣便是与自己的爱猫聊天，经常提到自己的猫。\n');
          helper('desc_age', '10');
          helper('desc_birth', '9月23日');
          helper('desc_bloodtype', 'AB');
          helper('desc_hobby', '与宠物（黑猫）聊天');
          helper('desc_stature', '137厘米');
          break;
      }
    });
  } catch (error) {
    raf = requestAnimationFrame(autoRun);
  }
});
