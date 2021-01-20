requestAnimationFrame(function autoRun() {
  try {
    const arrBackup = cfg.voice.sound.groups_
    if (!arrBackup || arrBackup.length === 0) {
      throw new Error();
    }
    console.log('Hacked语音文本');
    Object.entries(cfg.voice.sound.groups_).forEach(([soundID, soundGroup]) => {
      if (soundID == 3) {
        const changeMap = {
          "获得语音": {
            "words": 'あたし、塩見周子。シューコって呼んでいいよ。ここでアイドルになったら寮で三食昼寝付きってホント？あはは、冗談だよ。大丈夫、お仕事はちゃんとやるからさ。ホントだって～',
          },
          "登录语音普通": {
            "words": 'おはよ～。ま、今日もほどほどにいこー'
          },
          "登录语音满羁绊": {
            "words": 'お疲れ。いつものことだけど熱心だね～。うふふ、シューコが癒してあげよっか♪'
          },
          "大厅交互语音1": {
            "words": 'この恰好、家の手伝いでさ。ウチ、昔からある和菓子屋だったからさ～'
          },
          "大厅交互语音2": {
            "words": 'ああ、ピアス？高校入ったときに開けたっけ。あのときは怒られたな～'
          },
          "大厅交互语音3": {
            "words": 'そんなに目を見られても、あたしの気持ちはわからないと思うよー'
          },
          "大厅交互语音4": {
            "words": '実家が和菓子屋なんだよね～。プロデューサーさんは和菓子好き？'
          },
          "大厅交互语音5": {
            "words": 'つんつんって…。いいの？また倒れたら大変…あはっ、冗談だって !'
          },
          "大厅交互语音6": {
            "words": '海ってゆーのはすごいよねー。広くて、深くて……なーんでも隠しちゃうような感じでさ。……人の心ってヤツも、そうなのかねー。'
          },
          "大厅交互语音7": {
            "words": '本当は、実家の和菓子屋の2階で寝てて…… 連れ出してほしいって願望が見せてるのが、プロデューサーさん。おー、こわ。'
          },
          "大厅交互语音8": {
            "words": 'どーも、黒髪シューコちゃんでーす。どう？だいぶ印象違うでしょ。髪の色だけで、けっこー変わるもんだよねー。'
          },
          "送礼物语音普通": {
            "words": 'プロデューサーさんとならやっていけるかも…ふふっ、なんてね'
          },
          "送礼物语音喜好": {
            "words": 'プロデューサーさんってあたしのために頑張ってるんだよね。なんか、そういうのって意外かも。'
          },
          "好感度升级语音1": {
            "words": 'これでも、プロデューサーさんのことは信用してるんだけど…ちゃんと分かってくれてる？ふふっ、本音よー？'
          },
          "好感度升级语音2": {
            "words": 'この感覚、知ってたんだよね。……いつものプロデューサーさんだったわ。何気なくそばにいて、あたしをあたしらしくいさせてくれんの。'
          },
          "好感度升级语音3": {
            "words": '自由気ままに生きてきたシューコちゃんが、誰かの世界を染めてあげたいだなんてさー、随分と変わったもんだよね。'
          },
          "好感度升级语音4": {
            "words": 'こんなこと、あんまり考えたことなかったけど…… 流れ者のシューコちゃんにも、できてたよ。ちっちゃいけど、歴史ってやつ。'
          },
          "好感度升级语音5": {
            "words": '今だけは、プロデューサーさんをシューコ色で独り占め。だから、視線は外しちゃダメだからねー。ふふっ、たまには不埒なワガママで振り回しちゃおうかなって。'
          },
          "契约语音": {
            "words": '和の伝統も、京の都も、千年を超える歴史を積み重ねて、今がある。それを装飾に使うんだから、残さなきゃね。次の千年、その先に…今のあたしたちの、この姿をさ'
          },
          "终局一位语音": {
            "words": 'ねぇ、食べさせてあげよっか？……あはっ、本気にした？'
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
        case 200003:
          chr.name = '盐见周子';
          chr.name_chs = '盐见周子';
          chr.name_en = 'Syuko Shiomi';
          chr.name_jp = '塩見周子';
          helper('desc_cv', '卢婷');
          helper('desc', '京都出生，拥有白皙的皮肤和一头很好看的银色头发。但是基本不说京都腔，一口轻松的年轻人用语。性格也是轻松随意。\n和式传统点心店的女儿，给人以看板娘的印象。因为之前「决定在家里舒舒服服地过日子」（也就是说什么也不做宅在家里面）而被父母赶出了家。\n有着献血和飞镖这种完全不协调的爱好（共同点是针头和飞镖都是尖锐的东西）。而周子喜欢献血是因为可以随便喝茶和吃点心。此外，肤色这么白好像也是献血这个爱好造成的……');
          helper('desc_age', '18');
          helper('desc_birth', '12月12日');
          helper('desc_bloodtype', 'B');
          helper('desc_hobby', '献血、飞镖');
          helper('desc_stature', '163厘米');
          break;
      }
    });
  } catch (error) {
    raf = requestAnimationFrame(autoRun);
  }
});
