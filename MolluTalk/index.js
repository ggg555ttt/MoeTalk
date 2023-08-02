///https://www.bejson.com/
///import charface from './JSON/CharFace.json' assert {type:'json'};//@差分表情列表
const charface = JSON.parse('{"1.1":"Abydos_Countermeasure_Shiroko.8.webp","<=":"砂狼 白子-1","1.2":"Abydos_Countermeasure_Shiroko_Bandit.8.webp","<=":"砂狼 白子-2","1.3":"1.1","<=":"砂狼 白子-3","1.4":"Abydos_Countermeasure_Shiroko_Cycling.8.webp","<=":"砂狼 白子-4","1.5":"1.4","<=":"砂狼 白子-5","1.6":"Abydos_Countermeasure_Shiroko_Swimsuit.8.webp","<=":"砂狼 白子-6","1.7":"1.6","<=":"砂狼 白子-7","1.8":"Abydos_Countermeasure_Shiroko_SwimsuitB.8.webp","<=":"砂狼 白子-8","1.9":"Abydos_Countermeasure_Shiroko_Track.9.webp","<=":"砂狼 白子-9","2.1":"Abydos_Countermeasure_Hoshino.19.webp","<=":"小鸟游 星野-1","2.2":"Abydos_Countermeasure_Hoshino_Bandit.8.webp","<=":"小鸟游 星野-2","2.3":"2.1","<=":"小鸟游 星野-3","2.4":"Abydos_Countermeasure_Hoshino_Swimsuit.23.webp","<=":"小鸟游 星野-4","2.5":"Abydos_Countermeasure_Hoshino_SwimsuitB.23.webp","<=":"小鸟游 星野-5","2.6":"2.4","<=":"小鸟游 星野-6","2.7":"Abydos_Countermeasure_Hoshino_Track.19.webp","<=":"小鸟游 星野-7","3.1":"Abydos_Countermeasure_Serika.15.webp","<=":"黑见 芹香-1","3.2":"Abydos_Countermeasure_Serika_Bandit.15.webp","<=":"黑见 芹香-2","3.3":"Abydos_Countermeasure_Serika_Working.15.webp","<=":"黑见 芹香-3","3.4":"3.1","<=":"黑见 芹香-4","3.5":"Abydos_Countermeasure_Serika_NewYear.16.webp","<=":"黑见 芹香-5","3.6":"3.5","<=":"黑见 芹香-6","3.7":"Abydos_Countermeasure_Serika_Swimsuit.19.webp","<=":"黑见 芹香-7","3.8":"Abydos_Countermeasure_Serika_SwimsuitB.19.webp","<=":"黑见 芹香-8","3.9":"Abydos_Countermeasure_Serika_Track.15.webp","<=":"黑见 芹香-9","4.1":"Abydos_Countermeasure_Nonomi.20.webp","<=":"十六夜 野宫-1","4.2":"Abydos_Countermeasure_Nonomi_Bandit.8.webp","<=":"十六夜 野宫-2","4.3":"4.1","<=":"十六夜 野宫-3","4.4":"Abydos_Countermeasure_Nonomi_Swimsuit.24.webp","<=":"十六夜 野宫-4","4.5":"Abydos_Countermeasure_Nonomi_SwimsuitB.24.webp","<=":"十六夜 野宫-5","4.6":"4.4","<=":"十六夜 野宫-6","4.7":"Abydos_Countermeasure_Nonomi_Track.21.webp","<=":"十六夜 野宫-7","5.1":"Abydos_Countermeasure_Ayane.16.webp","<=":"奥空 绫音-1","5.2":"Abydos_Countermeasure_Ayane_Bandit.16.webp","<=":"奥空 绫音-2","5.3":"5.1","<=":"奥空 绫音-3","5.4":"Abydos_Countermeasure_Ayane_Swimsuit.18.webp","<=":"奥空 绫音-4","5.5":"Abydos_Countermeasure_Ayane_Track.16.webp","<=":"奥空 绫音-5","5.6":"Abydos_Countermeasure_Ayane_SwimsuitB.18.webp","<=":"奥空 绫音-6","5.7":"5.4","<=":"奥空 绫音-7","5.8":"Abydos_Countermeasure_Ayane_Navigator.16.webp","<=":"奥空 绫音-8","6.1":"Gehenna_Fuuki_Member.9.webp","<=":"风纪委员-1","7.1":"Gehenna_Fuuki_Hina.22.webp,Gehenna_Fuuki_Hina_Wounded.7.webp","<=":"空崎 日奈-1","7.2":"7.1","<=":"空崎 日奈-2","7.3":"Gehenna_Fuuki_Hina_Swimsuit.12.webp","<=":"空崎 日奈-3","7.4":"7.3","<=":"空崎 日奈-4","7.5":"Gehenna_Fuuki_Hina_Nightware.7.webp","<=":"空崎 日奈-5","8.1":"Gehenna_Fuuki_Iori.8.webp","<=":"银镜 伊织-1","8.2":"8.1","<=":"银镜 伊织-2","8.3":"Gehenna_Fuuki_Iori_Swimsuit.11.webp","<=":"银镜 伊织-3","8.4":"8.3","<=":"银镜 伊织-4","9.1":"Gehenna_Fuuki_Ako.17.webp,Gehenna_Fuuki_Ako_Wounded.17.webp","<=":"天雨 亚子-1","9.2":"9.1","<=":"天雨 亚子-2","9.3":"Gehenna_Fuuki_Ako_Track.18.webp","<=":"天雨 亚子-3","9.4":"Gehenna_Fuuki_Ako_Navigator.15.webp","<=":"天雨 亚子-4","10.1":"Gehenna_Fuuki_Chinatsu.9.webp","<=":"火宫 千夏-1","10.2":"10.1","<=":"火宫 千夏-2","10.3":"Gehenna_Fuuki_Chinatsu_HotSpring.11.webp","<=":"火宫 千夏-3","10.4":"10.3","<=":"火宫 千夏-4","11.1":"Gehenna_Kohshinjo68_Mutsuki.15.webp","<=":"浅黄 睦月-1","11.2":"11.1","<=":"浅黄 睦月-2","11.3":"Gehenna_Kohshinjo68_Mutsuki_NewYear.11.webp","<=":"浅黄 睦月-3","11.4":"11.3","<=":"浅黄 睦月-4","12.1":"Gehenna_Kohshinjo68_Haruka.15.webp","<=":"伊草 遥香-1","12.2":"12.1","<=":"伊草 遥香-2","12.3":"Gehenna_Kohshinjo68_Haruka_NewYear.14.webp","<=":"伊草 遥香-3","12.4":"12.3","<=":"伊草 遥香-4","13.1":"Gehenna_Kohshinjo68_Kayoko.8.webp","<=":"鬼方 佳代子-1","13.2":"13.1","<=":"鬼方 佳代子-2","13.3":"Gehenna_Kohshinjo68_Kayoko_NewYear.9.webp","<=":"鬼方 佳代子-3","13.5":"13.3","<=":"鬼方 佳代子-5","13.4":"Gehenna_Kohshinjo68_Kayoko_Navigator.9.webp","<=":"鬼方 佳代子-4","14.1":"Gehenna_Kohshinjo68_Aru.16.webp","<=":"陆八魔 阿露-1","14.2":"14.1","<=":"陆八魔 阿露-2","14.3":"Gehenna_Kohshinjo68_Aru_NewYear.19.webp","<=":"陆八魔 阿露-3","14.4":"14.3","<=":"陆八魔 阿露-4","15.1":"Gehenna_GourmetClub_Izumi.11.webp","<=":"狮子堂 泉-1","15.2":"15.1","<=":"狮子堂 泉-2","15.3":"Gehenna_GourmetClub_Izumi_Swimsuit.12.webp","<=":"狮子堂 泉-3","15.4":"15.3","<=":"狮子堂 泉-4","15.5":"Gehenna_GourmetClub_Izumi_Track.11.webp","<=":"狮子堂 泉-5","15.6":"Gehenna_GourmetClub_Izumi_NewYear.12.webp","<=":"狮子堂 泉-6","16.1":"Gehenna_GourmetClub_Junko.17.webp","<=":"赤司 淳子-1","16.2":"16.1","<=":"赤司 淳子-2","16.3":"Gehenna_GourmetClub_Junko_Track.17.webp","<=":"赤司 淳子-3","16.4":"Gehenna_GourmetClub_Junko_NewYear.19.webp","<=":"赤司 淳子-4","16.5":"16.4","<=":"赤司 淳子-5","17.1":"Gehenna_GourmetClub_Akari.7.webp","<=":"鳄渊 明里-1","17.2":"17.1","<=":"鳄渊 明里-2","17.3":"Gehenna_GourmetClub_Akari_Track.7.webp","<=":"鳄渊 明里-3","17.4":"Gehenna_GourmetClub_Akari_NewYear.14.webp","<=":"鳄渊 明里-4","18.1":"Gehenna_GourmetClub_Haruna.9.webp","<=":"黑馆 晴奈-1","18.2":"18.1","<=":"黑馆 晴奈-2","18.3":"Gehenna_GourmetClub_Haruna_Track.16.webp","<=":"黑馆 晴奈-3","18.4":"Gehenna_GourmetClub_Haruna_NewYear.15.webp","<=":"黑馆 晴奈-4","18.5":"18.4","<=":"黑馆 晴奈-5","19.1":"Gehenna_PandemoniumSociety_Makoto.13.webp","<=":"羽沼 真琴-1","20.1":"Gehenna_PandemoniumSociety_Iroha.9.webp","<=":"枣 伊吕波-1","20.2":"20.1","<=":"枣 伊吕波-2","21.1":"Gehenna_PandemoniumSociety_Ibuki.11.webp","<=":"伊吹-1","22.1":"Gehenna_PandemoniumSociety_Satsuki.13.webp","<=":"皋月-1","23.1":"Gehenna_PandemoniumSociety_Member.9.webp","<=":"万魔殿干部-1","24.1":"Gehenna_FoodService_Fuuka.10.webp","<=":"爱清 枫香-1","24.2":"24.2","<=":"爱清 枫香-2","24.3":"Gehenna_FoodService_Fuuka_NewYear.19.webp","<=":"爱清 枫香-3","24.4":"24.3","<=":"爱清 枫香-4","25.1":"Gehenna_FoodService_Juri.14.webp","<=":"牛牧 朱莉-1","25.2":"25.1","<=":"牛牧 朱莉-2","26.1":"Gehenna_HotSpringsDepartment_Kasumi.10.webp","<=":"霞-1","27.1":"Gehenna_HotSpringsDepartment_Megu.9.webp","<=":"下仓 惠-1","27.2":"27.2","<=":"下仓 惠-2","28.1":"Gehenna_HotSpringsDepartment_Member.8.webp","<=":"温泉开发部成员-1","29.1":"Gehenna_Emergentology_Sena.8.webp","<=":"冰室 濑名-1","29.2":"29.1","<=":"冰室 濑名-2","30.1":"Gehenna_Emergentology_Member.7.webp","<=":"急救医学人员-1","31.1":"Gehenna_GoHomeClub_Erika.17.webp","<=":"旗见 绘梨香-1","32.1":"Gehenna_GoHomeClub_Kilala.13.webp","<=":"绮良-1","33.1":"Gehenna_Student_Member.10.webp","<=":"格黑娜-学生-1","34.1":"Millennium_CleanNClearing_Akane.8.webp","<=":"室笠 朱音-1","34.2":"34.2","<=":"室笠 朱音-2","34.3":"Millennium_CleanNClearing_Akane_Bunny.8.webp","<=":"室笠 朱音-3","34.4":"34.4","<=":"室笠 朱音-4","35.1":"Millennium_CleanNClearing_Neru.12.webp,Millennium_CleanNClearing_Neru_wounded.24.webp","<=":"美甘 尼禄-1","35.2":"35.1","<=":"美甘 尼禄-2","35.3":"Millennium_CleanNClearing_Neru_Bunny.11.webp","<=":"美甘 尼禄-3","35.4":"35.4","<=":"美甘 尼禄-4","36.1":"Millennium_CleanNClearing_Asuna.8.webp","<=":"一之濑 明日奈-1","36.2":"36.1","<=":"一之濑 明日奈-2","36.3":"Millennium_CleanNClearing_Asuna_Bunny.9.webp","<=":"一之濑 明日奈-3","36.4":"36.3","<=":"一之濑 明日奈-4","36.5":"Millennium_CleanNClearing_Asuna_Uniform.9.webp","<=":"一之濑 明日奈-5","37.1":"Millennium_CleanNClearing_Karin.7.webp","<=":"角楯 花凛-1","37.2":"37.1","<=":"角楯 花凛-2","37.3":"Millennium_CleanNClearing_Karin_Bunny.8.webp","<=":"角楯 花凛-3","37.4":"37.3","<=":"角楯 花凛-4","37.5":"Millennium_CleanNClearing_Karin_Uniform.9.webp","<=":"角楯 花凛-5","175.1":"Millennium_CleanNClearing_Toki.18.webp,Millennium_CleanNClearing_Toki_wounded.8.webp","<=":"飞鸟马 时-1","175.2":"1712","<=":"飞鸟马 时-2","175.3":"Millennium_CleanNClearing_Toki_Mecha.13.webp","<=":"飞鸟马 时-3","175.4":"Millennium_CleanNClearing_Toki_Bunny.9.webp","<=":"飞鸟马 时-4","175.5":"175.4","<=":"飞鸟马 时-5","38.1":"Millennium_GameDev_Aris.28.webp","<=":"天童 爱丽丝-1","38.2":"38.1","<=":"天童 爱丽丝-2","38.3":"Millennium_GameDev_Aris_Maid.11.webp","<=":"天童 爱丽丝-3","38.4":"38.3","<=":"天童 爱丽丝-4","188.1":"Millennium_GameDev_Kei.2.webp","<=":"Key-1","39.1":"Millennium_GameDev_Momoi.9.webp","<=":"才羽 桃井-1","39.2":"39.1","<=":"才羽 桃井-2","39.3":"Millennium_GameDev_Momoi_Maid.13.webp","<=":"才羽 桃井-3","40.1":"Millennium_GameDev_Midori.8.webp","<=":"才羽 绿-1","40.2":"40.1","<=":"才羽 绿-2","40.3":"Millennium_GameDev_Midori_Maid.15.webp","<=":"才羽 绿-3","41.1":"Millennium_GameDev_Yuzu.10.webp","<=":"花冈 柚子-1","41.2":"41.1","<=":"花冈 柚子-2","41.3":"Millennium_GameDev_Yuzu_Maid.12.webp","<=":"花冈 柚子-3","41.4":"41.3","<=":"花冈 柚子-4","42.1":"Millennium_SPTF_Himari.13.webp","<=":"明星 日鞠-1","42.2":"42.1","<=":"明星 日鞠-2","42.3":"Millennium_SPTF_Himari_Navigator.13.webp","<=":"明星 日鞠-3","43.1":"Millennium_Veritas_Hare.8.webp","<=":"小钩 晴-1","43.2":"43.1","<=":"小钩 晴-2","44.1":"Millennium_Veritas_Kotama.7.webp","<=":"音濑 小玉-1","44.2":"44.1","<=":"音濑 小玉-2","45.1":"Millennium_Veritas_Chihiro.7.webp","<=":"各务 千寻-1","45.2":"45.1","<=":"各务 千寻-2","46.1":"Millennium_Veritas_Maki.9.webp","<=":"小涂 真纪-1","46.2":"46.1","<=":"小涂 真纪-2","46.3":"Millennium_Veritas_Maki_Track.8.webp","<=":"小涂 真纪-3","47.1":"Millennium_Engineer_Hibiki.14.webp","<=":"猫塚 响-1","47.2":"47.1","<=":"猫塚 响-2","47.3":"Millennium_Engineer_Hibiki_Cheerleader.23.webp","<=":"猫塚 响-3","47.4":"47.4","<=":"猫塚 响-4","48.1":"Millennium_Engineer_Utaha.9.webp","<=":"白石 歌原-1","48.2":"48.2","<=":"白石 歌原-2","48.3":"Millennium_Engineer_Utaha_Cheerleader.17.webp","<=":"白石 歌原-3","48.4":"48.3","<=":"白石 歌原-4","49.1":"Millennium_Engineer_Kotori.8.webp","<=":"丰见 小鸟-1","49.2":"49.1","<=":"丰见 小鸟-2","49.3":"Millennium_Engineer_Kotori_Track.8.webp","<=":"丰见 小鸟-3","49.4":"Millennium_Engineer_Kotori_Cheerleader.23.webp","<=":"丰见 小鸟-4","50.1":"NO","<=":"歌原的炮台-1","176.1":"Millennium_TheSeminar_Rio.11.webp","<=":"调月 莉音-1","51.1":"Millennium_TheSeminar_Yuuka.8.webp","<=":"早濑 优香-1","51.2":"51.1","<=":"早濑 优香-2","51.3":"Millennium_TheSeminar_Yuuka_Track.17.webp","<=":"早濑 优香-3","51.4":"51.3","<=":"早濑 优香-4","51.5":"Millennium_TheSeminar_Yuuka_Navigator.8.webp","<=":"早濑 优香-5","52.1":"Millennium_TheSeminar_Koyuki_Bunny.13.webp","<=":"黑崎 小雪-1","52.2":"Millennium_TheSeminar_Koyuki.17.webp","<=":"黑崎 小雪-2","52.3":"52.3","<=":"黑崎 小雪-3","172.1":"Millennium_TheSeminar_Noa.8.webp","<=":"生盐 诺亚-1","172.2":"172.1","<=":"生盐 诺亚-2","172.3":"Millennium_TheSeminar_Noa_Track.9.webp","<=":"生盐 诺亚-3","53.1":"Millennium_SPTF_Eimi.8.webp","<=":"和泉元 艾米-1","53.2":"53.1","<=":"和泉元 艾米-2","54.1":"Millennium_TrainingClub_Sumire.14.webp","<=":"乙花 菫-1","54.2":"54.1","<=":"乙花 菫-2","54.3":"Millennium_TrainingClub_Sumire_Track.14.webp","<=":"乙花 菫-3","173.1":"Millennium_Student_MemberB.7.webp","<=":"千禧-学生-1","173.2":"Millennium_Student_MemberA.15.webp","<=":"千禧-学生-2","55.1":"Trinity_HoukagoDessert_Natsu.9.webp","<=":"柚鸟 夏-1","55.2":"55.1","<=":"柚鸟 夏-2","55.3":"Trinity_HoukagoDessert_Natsu_Track.9.webp","<=":"柚鸟 夏-3","56.1":"Trinity_HoukagoDessert_Yoshimi.12.webp","<=":"伊原木 喜美-1","56.2":"56.2","<=":"伊原木 喜美-2","57.1":"Trinity_HoukagoDessert_Airi.9.webp","<=":"栗村 爱莉-1","57.2":"57.1","<=":"栗村 爱莉-2","58.1":"Trinity_HoukagoDessert_Kazusa.14.webp,Trinity_HoukagoDessert_Kazusa_Old.9.webp","<=":"杏山 和纱-1","58.2":"58.1","<=":"杏山 和纱-2","59.1":"Trinity_TeaParty_MemberB.9.webp","<=":"茶会-1","59.2":"Trinity_TeaParty_MemberA.9.webp","<=":"茶会-2","60.1":"Trinity_TeaParty_Mika.30.webp,Trinity_TeaParty_Mika_NoHawl.30.webp,Trinity_TeaParty_Mika_woundedN.30.webp","<=":"圣园 未花-1","60.2":"Trinity_TeaParty_Mika_Track.30.webp,Trinity_TeaParty_Mika_Sukumizu.29.webp","<=":"圣园 未花-2","61.1":"Trinity_TeaParty_Seia.10.webp","<=":"百合园 圣娅-1","62.1":"Trinity_TeaParty_Nagisa.17.webp,Trinity_TeaParty_Nagisa_Old.11.webp","<=":"桐藤 渚-1","62.2":"62.1","<=":"桐藤 渚-2","63.1":"Trinity_RemedialClass_Azusa.10.webp,Trinity_RemedialClass_Azusa_wounded.10.webp","<=":"白洲 梓-1","63.2":"Trinity_RemedialClass_Azusa_Track.10.webp,Trinity_RemedialClass_Azusa_Sukumizu.10.webp","<=":"白洲 梓-2","63.3":"Trinity_RemedialClass_Azusa_Swimsuit.9.webp","<=":"白洲 梓-3","63.4":"63.4","<=":"白洲 梓-4","64.1":"Trinity_RemedialClass_Koharu.14.webp","<=":"下江 小春-1","64.2":"Trinity_RemedialClass_Koharu_Track.14.webp,Trinity_RemedialClass_Koharu_Sukumizu.14.webp","<=":"下江 小春-2","64.3":"Trinity_RemedialClass_Koharu_Swimsuit.22.webp","<=":"下江 小春-3","64.4":"64.3","<=":"下江 小春-4","65.1":"Trinity_RemedialClass_Hifumi.14.webp","<=":"阿慈谷 日富美-1","65.2":"Trinity_RemedialClass_Hifumi_Bandit.7.webp","<=":"阿慈谷 日富美-2","65.3":"Trinity_RemedialClass_Hifumi_Track.8.webp,Trinity_RemedialClass_Hifumi_Sukumizu.8.webp","<=":"阿慈谷 日富美-3","65.4":"Trinity_RemedialClass_Hifumi_Swimsuit.12.webp","<=":"阿慈谷 日富美-4","65.5":"65.4","<=":"阿慈谷 日富美-5","66.1":"Trinity_RemedialClass_Hanako.8.webp","<=":"浦和 花子-1","66.2":"Trinity_RemedialClass_Hanako_Track.7.webp,Trinity_RemedialClass_Hanako_Sukumizu.7.webp","<=":"浦和 花子-2","66.3":"Trinity_RemedialClass_Hanako_Navigator.7.webp","<=":"浦和 花子-3","66.4":"Trinity_RemedialClass_Hanako_Swimsuit.11.webp","<=":"浦和 花子-4","66.5":"66.4","<=":"浦和 花子-5","67.1":"Trinity_Justice_Member.8.webp","<=":"正义实现委员会部员-1","67.2":"Trinity_Justice_Member_Track.7.webp","<=":"正义实现委员会部员-2","68.1":"Trinity_Justice_Mashiro.7.webp","<=":"静山 真白-1","68.2":"68.1","<=":"静山 真白-2","68.3":"Trinity_Justice_Mashiro_Swimsuit.8.webp","<=":"静山 真白-3","68.4":"68.3","<=":"静山 真白-4","68.5":"Trinity_Justice_Mashiro_Track.8.webp","<=":"静山 真白-5","69.1":"Trinity_Justice_Tsurugi.16.webp","<=":"剑先 鹤城-1","69.2":"69.1","<=":"剑先 鹤城-2","69.3":"Trinity_Justice_Tsurugi_Swimsuit.12.webp","<=":"剑先 鹤城-3","69.4":"69.3","<=":"剑先 鹤城-4","69.5":"Trinity_Justice_Tsurugi_Track.16.webp","<=":"剑先 鹤城-5","70.1":"Trinity_Justice_Hasumi.10.webp","<=":"羽川 莲见-1","70.2":"70.1","<=":"羽川 莲见-2","70.3":"Trinity_Justice_Hasumi_Track.12.webp","<=":"羽川 莲见-3","70.4":"70.3","<=":"羽川 莲见-4","71.1":"Trinity_Justice_Ichika.15.webp","<=":"一花-1","72.1":"Trinity_SisterHood_Member.9.webp","<=":"修女会-1","73.1":"Trinity_SisterHood_Hinata.8.webp","<=":"若叶 日向-1","73.2":"73.1","<=":"若叶 日向-2","73.3":"Trinity_SisterHood_Hinata_Swimsuit.13.webp","<=":"若叶 日向-3","73.4":"73.3","<=":"若叶 日向-4","74.1":"Trinity_SisterHood_Mari.10.webp","<=":"伊落 玛丽-1","74.2":"74.1","<=":"伊落 玛丽-2","74.3":"Trinity_SisterHood_Mari_Track.11.webp","<=":"伊落 玛丽-3","74.4":"74.3","<=":"伊落 玛丽-4","75.1":"Trinity_SisterHood_Sakurako.12.webp,Trinity_SisterHood_Sakurako_Kakugo.14.webp,Trinity_SisterHood_Sakurako_Old.8.webp","<=":"歌住 樱子-1","75.2":"75.1","<=":"歌住 樱子-2","76.1":"Trinity_KnightsHospitaller_Serina.7.webp","<=":"鹫见 芹娜-1","76.2":"76.1","<=":"鹫见 芹娜-2","76.3":"Trinity_KnightsHospitaller_Serina_Nurse.9.webp","<=":"鹫见 芹娜-3","76.4":"Trinity_KnightsHospitaller_Serina_Christmas.12.webp","<=":"鹫见 芹娜-4","76.5":"76.4","<=":"鹫见 芹娜-5","77.1":"Trinity_KnightsHospitaller_Hanae.8.webp","<=":"朝颜 花绘-1","77.2":"77.1","<=":"朝颜 花绘-2","77.3":"Trinity_KnightsHospitaller_Hanae_Cheerleader.10.webp","<=":"朝颜 花绘-3","77.4":"Trinity_KnightsHospitaller_Hanae_Christmas.11.webp","<=":"朝颜 花绘-4","77.5":"77.4","<=":"朝颜 花绘-5","78.1":"Trinity_KnightsHospitaller_Mine.10.webp","<=":"苍森 美弥-1","78.2":"78.1","<=":"苍森 美弥-2","79.1":"Trinity_BookClub_Shimiko.8.webp","<=":"円堂 志美子-1","79.2":"79.1","<=":"円堂 志美子-2","80.1":"Trinity_BookClub_Ui.25.webp","<=":"古关 忧-1","80.2":"80.1","<=":"古关 忧-2","80.3":"Trinity_BookClub_Ui_Swimsuit.54.webp","<=":"古关 忧-3","80.4":"80.3","<=":"古关 忧-4","81.1":"Trinity_TrinityVigilance_Suzumi.7.webp","<=":"守月 铃美-1","81.2":"81.1","<=":"守月 铃美-2","171.1":"Trinity_TrinityVigilance_Reisa.20.webp","<=":"宇泽 玲纱-1","171.2":"171.1","<=":"宇泽 玲纱-2","82.1":"Trinity_Student_Member.10.webp","<=":"圣三一-学生-1","83.1":"Hyakkiyako_MatsuriOffice_Pina.10.webp","<=":"朝日奈 菲娜-1","83.2":"83.1","<=":"朝日奈 菲娜-2","84.1":"Hyakkiyako_MatsuriOffice_Shizuko.8.webp","<=":"河和 静子-1","84.2":"84.1","<=":"河和 静子-2","84.3":"Hyakkiyako_MatsuriOffice_Shizuko_Swimsuit.11.webp","<=":"河和 静子-3","84.4":"84.3","<=":"河和 静子-4","84.5":"Hyakkiyako_MatsuriOffice_Shizuko_Track.8.webp","<=":"河和 静子-5","85.1":"Hyakkiyako_MatsuriOffice_Umika.18.webp","<=":"海夏-1","86.1":"Hyakkiyako_Shugyobu_Mimori.11.webp","<=":"水羽 三森-1","86.2":"86.1","<=":"水羽 三森-2","86.3":"Hyakkiyako_Shugyobu_Mimori_Swimsuit.10.webp","<=":"水羽 三森-3","87.1":"Hyakkiyako_Shugyobu_Tsubaki.12.webp","<=":"春日 椿-1","87.2":"87.1","<=":"春日 椿-2","88.1":"Hyakkiyako_Shugyobu_Kaede.17.webp","<=":"勇美 枫-1","88.2":"88.1","<=":"勇美 枫-2","88.3":"Hyakkiyako_Shugyobu_Kaede_Track.17.webp","<=":"勇美 枫-3","89.1":"Hyakkiyako_Onmyobu_Chise.11.webp","<=":"和乐 知世-1","89.2":"89.1","<=":"和乐 知世-2","89.3":"Hyakkiyako_Onmyobu_Chise_Swimsuit.16.webp","<=":"和乐 知世-3","89.4":"89.3","<=":"和乐 知世-4","89.5":"Hyakkiyako_Onmyobu_Chise_Track.11.webp","<=":"和乐 知世-5","90.1":"Hyakkiyako_Onmyobu_Niya.9.webp","<=":"天地 妮娅-1","91.1":"Hyakkiyako_Onmyobu_Kaho.19.webp","<=":"桑上 果穗-1","91.2":"91.1","<=":"桑上 果穗-2","92.1":"Hyakkiyako_NinpoKenkyubu_Izuna.9.webp","<=":"久田 泉奈-1","92.2":"92.1","<=":"久田 泉奈-2","92.3":"Hyakkiyako_NinpoKenkyubu_Izuna_Swimsuit.13.webp","<=":"久田 泉奈-3","92.4":"92.3","<=":"久田 泉奈-4","92.5":"Hyakkiyako_NinpoKenkyubu_Izuna_Track.9.webp","<=":"久田 泉奈-5","93.1":"Hyakkiyako_NinpoKenkyubu_Michiru.11.webp","<=":"千鸟 满-1","93.2":"93.1","<=":"千鸟 满-2","94.1":"Hyakkiyako_NinpoKenkyubu_Tsukuyo.9.webp","<=":"大野 月咏-1","94.2":"94.1","<=":"大野 月咏-2","94.3":"Hyakkiyako_NinpoKenkyubu_Tsukuyo_Track.8.webp","<=":"大野 月咏-3","95.1":"Hyakkiyako_EmptyClub_Wakamo.13.webp","<=":"狐坂 若藻-1","95.2":"95.1","<=":"狐坂 若藻-2","95.3":"95.1","<=":"狐坂 若藻-3","95.4":"Hyakkiyako_EmptyClub_Wakamo_Swimsuit.17.webp","<=":"狐坂 若藻-4","95.5":"95.4","<=":"狐坂 若藻-5","95.6":"95.4","<=":"狐坂 若藻-6","95.7":"Hyakkiyako_EmptyClub_Wakamo_Wafuku.9.webp","<=":"狐坂 若藻-7","97.1":"Hyakkiyako_EmptyClub_Kuzunoha.13.webp","<=":"葛叶-1","192.1":"Hyakkiyako_Hyakkayouran_Nagusa.9.webp","<=":"五陵 名草-1","183.1":"Shanhaijing_Genryumon_Kissaki.10.webp","<=":"妃咲-1","184.1":"Shanhaijing_Genryumon_Mina.17.webp","<=":"近卫 南-1","184.2":"184.1","<=":"近卫 南-2","185.1":"Shanhaijing_Genryumon_Member.16.webp","<=":"玄龙门高级管理人员-1","98.1":"Shanhaijing_Endanbou_Saya.9.webp","<=":"药子 纱绫-1","98.2":"98.1","<=":"药子 纱绫-2","98.3":"Shanhaijing_Endanbou_Saya_Casual.8.webp","<=":"药子 纱绫-3","98.4":"98.3","<=":"药子 纱绫-4","99.1":"Shanhaijing_BlackTortoisePromenade_Rumi.9.webp","<=":"朱城 瑠美-1","99.2":"99.1","<=":"朱城 瑠美-2","100.1":"Shanhaijing_BlackTortoisePromenade_Reizyo.19.webp","<=":"鹿山 丽情-1","101.1":"Shanhaijing_BlackTortoisePromenade_Member.10.webp","<=":"玄武商会职员-1","102.1":"Shanhaijing_Meihuayuan_Shun.16.webp","<=":"春原 瞬-1","102.2":"102.1","<=":"春原 瞬-2","102.3":"Shanhaijing_Meihuayuan_Shun_Small.31.webp","<=":"春原 瞬-3","102.4":"102.3","<=":"春原 瞬-4","103.1":"Shanhaijing_Meihuayuan_Kokona.14.webp","<=":"春原 心奈-1","103.2":"103.1","<=":"春原 心奈-2","96.1":"NO","<=":"裴-1","198.1":"Shanhaijing_EmptyClub_Kai.15.webp","<=":"申谷 启-1","104.1":"RedWinter_RedwinterSecretary_Cherino.7.webp,RedWinter_RedwinterSecretary_Cherino_NoBeard.7.webp","<=":"连河 切里诺-1","104.2":"104.1","<=":"连河 切里诺-2","104.3":"RedWinter_RedwinterSecretary_Cherino_HotSpring.16.webp,RedWinter_RedwinterSecretary_Cherino_HotSpringN.11.webp","<=":"连河 切里诺-3","104.4":"104.3","<=":"连河 切里诺-4","105.1":"RedWinter_RedwinterSecretary_Tomoe.8.webp","<=":"佐城 智惠-1","105.2":"105.1","<=":"佐城 智惠-2","106.1":"RedWinter_RedwinterSecretary_Marina.13.webp","<=":"池仓 玛丽娜-1","106.2":"106.1","<=":"池仓 玛丽娜-2","107.1":"RedWinter_RedwinterSecretary_Member.1.webp","<=":"亲卫队员-1","108.1":"RedWinter_Class227_Shigure.13.webp","<=":"间宵 时雨-1","108.3":"108.1","<=":"间宵 时雨-3","108.2":"RedWinter_Class227_Shigure_HotSpring.11.webp","<=":"间宵 时雨-2","109.1":"RedWinter_Class227_Nodoka.8.webp","<=":"天见 和香-1","109.2":"109.1","<=":"天见 和香-2","109.3":"RedWinter_Class227_Nodoka_HotSpring.37.webp","<=":"天见 和香-3","109.4":"109.3","<=":"天见 和香-4","110.1":"RedWinter_KnowledgeLiberationFront_Meru.13.webp","<=":"姬木 梅露-1","110.2":"RedWinter_KnowledgeLiberationFront_Meru_HotSpring.11.webp","<=":"姬木 梅露-2","111.1":"RedWinter_KnowledgeLiberationFront_Momiji.8.webp","<=":"秋泉 红叶-1","112.1":"RedWinter_LaborParty_Minori.11.webp,RedWinter_LaborParty_Minori_Old.11.webp","<=":"安守 实里-1","112.2":"112.1","<=":"安守 实里-2","113.1":"ETC_Worker_Youhei.3.webp","<=":"工务部员-1","113.2":"RedWinter_LaborParty_Member.3.webp","<=":"工务部员-2","114.1":"Valkyrie_Anzenkyoku_Kirino.11.webp","<=":"中务 桐乃-1","114.2":"114.1","<=":"中务 桐乃-2","115.1":"Valkyrie_Anzenkyoku_Fubuki.12.webp","<=":"合欢垣 吹雪-1","115.2":"115.1","<=":"合欢垣 吹雪-2","116.1":"Valkyrie_PublicPeaceBureau_Kanna.10.webp,Valkyrie_PublicPeaceBureau_Kanna_wounded.11.webp","<=":"尾刃 康纳-1","116.2":"116.1","<=":"尾刃 康纳-2","117.1":"Valkyrie_PublicPeaceBureau_Member.11.webp","<=":"瓦尔基里学生-1","117.2":"Valkyrie_PublicPeaceBureau_Member_Swimsuit.10.webp","<=":"瓦尔基里学生-2","118.1":"SRT_RabbitPlatoon_Saki.15.webp","<=":"空井 咲-1","118.2":"118.1","<=":"空井 咲-2","118.4":"118.1","<=":"空井 咲-4","118.3":"SRT_RabbitPlatoon_Saki_Track.28.webp","<=":"空井 咲-3","118.5":"SRT_RabbitPlatoon_Saki_Swimsuit.30.webp","<=":"空井 咲-5","118.6":"118.5","<=":"空井 咲-6","119.1":"SRT_RabbitPlatoon_Miyako.14.webp","<=":"月雪 宫子-1","119.2":"119.1","<=":"月雪 宫子-2","119.3":"SRT_RabbitPlatoon_Miyako_Track.11.webp","<=":"月雪 宫子-3","119.4":"SRT_RabbitPlatoon_Miyako_Swimsuit.25.webp","<=":"月雪 宫子-4","119.5":"119.4","<=":"月雪 宫子-5","120.1":"SRT_RabbitPlatoon_Miyu.14.webp","<=":"霞泽 美游-1","120.2":"120.1","<=":"霞泽 美游-2","120.3":"SRT_RabbitPlatoon_Miyu_Track.13.webp","<=":"霞泽 美游-3","120.4":"SRT_RabbitPlatoon_Miyu_Swimsuit.28.webp","<=":"霞泽 美游-4","120.5":"120.4","<=":"霞泽 美游-5","121.1":"SRT_RabbitPlatoon_Moe.20.webp","<=":"风仓 萌惠-1","121.2":"121.1","<=":"风仓 萌惠-2","121.3":"SRT_RabbitPlatoon_Moe_Track.19.webp","<=":"风仓 萌惠-3","121.4":"SRT_RabbitPlatoon_Moe_Swimsuit.27.webp","<=":"风仓 萌惠-4","122.1":"SRT_FoxPlatoon_Yukino.17.webp","<=":"雪乃-1","123.1":"SRT_FoxPlatoon_Niko.13.webp","<=":"妮可-1","186.1":"SRT_FoxPlatoon_Otogi.17.webp","<=":"音葵-1","187.1":"SRT_FoxPlatoon_Kurumi.14.webp","<=":"胡桃-1","124.1":"Arius_AriusSqud_Saori.30.webp,Arius_AriusSqud_Saori_wounded.29.webp","<=":"锭前 纱织-1","124.2":"Arius_AriusSqud_Saori_NoMask.29.webp,Arius_AriusSqud_Saori_woundedN.29.webp","<=":"锭前 纱织-2","124.3":"24.2","<=":"锭前 纱织-3","125.1":"Arius_AriusSqud_Atsuko.9.webp,Arius_AriusSqud_Atsuko_Oblation.10.webp,Arius_AriusSqud_Atsuko_wounded.7.webp","<=":"秤 亚津子-1","125.2":"125.1","<=":"秤 亚津子-2","125.3":"125.1","<=":"秤 亚津子-3","126.1":"Arius_AriusSqud_Hiyori.11.webp","<=":"槌永 日和-1","126.2":"126.1","<=":"槌永 日和-2","127.1":"Arius_AriusSqud_Misaki.9.webp","<=":"戒野 美咲-1","127.2":"Arius_AriusSqud_Misaki_NoMask.10.webp","<=":"戒野 美咲-2","127.3":"127.2","<=":"戒野 美咲-3","128.1":"Arius_EmptyClub_Member.1.webp","<=":"阿里乌斯学生-1","129.1":"DU_GSC_Kaichou.25.webp","<=":"联邦学生会长-1","130.1":"DU_GSC_Rin.94.webp","<=":"七神 凛-1","130.2":"DU_GSC_Rin_Navigator.17.webp","<=":"七神 凛-2","131.1":"DU_GSC_Momoka.48.webp","<=":"由良木 桃香-1","131.2":"DU_GSC_Momoka_Navigator.13.webp","<=":"由良木 桃香-2","132.1":"DU_GSC_Ayumu.16.webp","<=":"岩柜 步梦-1","132.2":"DU_GSC_Ayumu_Navigator.16.webp","<=":"岩柜 步梦-2","133.1":"DU_GSC_Kaya.25.webp","<=":"不知火 花耶-1","178.1":"DU_GSC_Aoi.8.webp","<=":"扇喜 葵-1","179.1":"DU_GSC_MemberB.10.webp","<=":"联邦学生会成员-1","179.2":"DU_GSC_MemberA.10.webp","<=":"联邦学生会成员-2","200.1":"DU_GSC_Heine.21.webp","<=":"灰音-1","201.1":"DU_GSC_Sumomo.13.webp","<=":"李-1","134.1":"Cronos_PressDepartment_Mai.8.webp","<=":"舞-1","135.1":"Cronos_PressDepartment_Shinon.10.webp","<=":"川流 诗乃-1","136.1":"ETC_BunnyGuard_Member.8.webp","<=":"兔女郎守卫-1","138.1":"ETC_Gematria_blacksuit.1.webp","<=":"黑服-1","138.2":"ETC_Gematria_blacksuit_Terror.1.webp","<=":"黑服-2","139.1":"ETC_Gematria_Golconde.1.webp","<=":"戈尔孔达-1","140.1":"ETC_Gematria_Décalcomanie.1.webp","<=":"印花釉法-1","141.1":"ETC_Gematria_maestro.1.webp","<=":"巨匠-1","141.2":"ETC_Gematria_maestro_Terror.1.webp","<=":"巨匠-2","142.1":"ETC_Gematria_Beatrice.3.webp","<=":"贝阿朵莉切-1","143.1":"NO","<=":"佩洛洛斯拉-1","144.1":"NO","<=":"自动机兵-1","144.2":"NO","<=":"自动机兵-2","144.3":"NO","<=":"自动机兵-3","145.1":"NO","<=":"龟岛 五郎-1","146.1":"ETC_Thugs_MemberB.8.webp","<=":"小混混-1","146.2":"ETC_Thugs_MemberA.8.webp","<=":"小混混-2","146.3":"ETC_Thugs_MemberC.8.webp","<=":"小混混-3","146.4":"ETC_Thugs_MemberD.8.webp","<=":"小混混-4","146.5":"ETC_Thugs_MemberE.8.webp","<=":"小混混-5","147.1":"NO","<=":"霍德-1","148.1":"NO","<=":"凯赛德-1","149.1":"NO","<=":"薇娜-1","150.1":"NO","<=":"佩洛洛大人-1","151.1":"ETC_CommercialDistrict_Nyantenmaru.1.webp","<=":"喵天丸-1","152.1":"NO","<=":"白-1","153.1":"NO","<=":"黑-1","174.1":"NO","<=":"戈兹-1","154.1":"NO","<=":"基沃托斯市民-1","154.2":"NO","<=":"基沃托斯市民-2","154.3":"NO","<=":"基沃托斯市民-3","154.4":"NO","<=":"基沃托斯市民-4","154.5":"NO","<=":"基沃托斯市民-5","154.6":"NO","<=":"基沃托斯市民-6","154.7":"NO","<=":"基沃托斯市民-7","155.1":"NO","<=":"机器人-1","155.2":"NO","<=":"机器人-2","155.3":"NO","<=":"机器人-3","156.1":"ETC_Sibaseki_ShibasekiMaster.1.webp","<=":"柴大将-1","158.1":"DU_Angel24_Sora.29.webp","<=":"空-1","159.1":"Hyakkiyako_ChimiIchiza_MemberA.7.webp","<=":"二流魅剧团-1","159.2":"Hyakkiyako_ChimiIchiza_MemberB.1.webp","<=":"二流魅剧团-2","160.1":"ETC_Kaiser_Director.1.webp","<=":"凯撒PMC理事-1","160.2":"ETC_Kaiser_Director_Idle.1.webp","<=":"凯撒PMC理事-2","180.1":"ETC_Kaiser_General.1.webp","<=":"凯撒PMC将军-1","181.1":"ETC_Kaiser_President.1.webp","<=":"凯撒总裁-1","182.1":"ETC_Kaiser_SOF.1.webp","<=":"凯撒特种部队-1","161.1":"NO","<=":"KAITEN-FX-Mk.0-1","162.1":"ETC_KaitenRanger_BLack.1.webp","<=":"回转寿司战队-1","162.2":"ETC_KaitenRanger_Green.1.webp","<=":"回转寿司战队-2","162.3":"ETC_KaitenRanger_Pink.1.webp","<=":"回转寿司战队-3","162.4":"ETC_KaitenRanger_Red.1.webp","<=":"回转寿司战队-4","162.5":"ETC_KaitenRanger_Yellow.1.webp","<=":"回转寿司战队-5","163.1":"ETC_HelmetGang_Member.1.webp","<=":"钢盔团-1","163.2":"ETC_HelmetGang_Kanbu.1.webp","<=":"钢盔团-2","164.1":"ETC_HelmetGang_Rabu.13.webp","<=":"和驹风 良舞-1","165.1":"ETC_KaitenRanger_Yellow.1.webp","<=":"希罗尼穆斯-1","137.1":"ETC_EmptyClub_Miku.16.webp","<=":"初音未来-1","137.2":"137.1","<=":"初音未来-2","166.1":"NO","<=":"坎纳-1","167.1":"NO","<=":"米莉亚-1","168.1":"NO","<=":"纳奥-1","169.1":"NO","<=":"罗内-1","170.1":"NO","<=":"由香里-1","194.1":"ETC_Gematria_Francis.1.webp","<=":"弗朗西斯-1","190.1":"Abydos_Countermeasure_Shiroko_Terror.10.webp,Abydos_Countermeasure_Shiroko_WounderdT.10.webp","<=":"阿努比斯-1","195.1":"NO","<=":"???-1","196.1":"ETC_Nameless_Priests.1.webp","<=":"无名司祭-1","197.1":"Trinity_EmptyClub_Akria.29.webp","<=":"晶-1","197.2":"197.1","<=":"晶-2","189.1":"ETC_Color_Frenapates.1.webp","<=":"普雷纳瓦德斯-1","177.1":"NO","<=":"404-1","157.1":"DU_Shittim_Arona.33.webp","<=":"阿罗娜-1","191.1":"DU_Shittim_Plana.22.webp","<=":"普拉娜-1","193.1":"NO","<=":"老师-1"}');
//@差分表情列表
(self.webpackChunk_N_E = self.webpackChunk_N_E || [])
.push([
	[405],
	{
		3162: function(e, n, t)
		{
			var r, o;
			void 0 !== (r = "function" == typeof(o = function()
			{
				"use strict";

				function n(e, n, t)
				{
					var r = new XMLHttpRequest;
					r.open("GET", e), r.responseType = "blob", r.onload = function()
					{
						a(r.response, n, t)
					}, r.onerror = function()
					{
						console.error("could not download file")
					}, r.send()
				}

				function r(e)
				{
					var n = new XMLHttpRequest;
					n.open("HEAD", e, !1);
					try
					{
						n.send()
					}
					catch (e)
					{}
					return 200 <= n.status && 299 >= n.status
				}

				function o(e)
				{
					try
					{
						e.dispatchEvent(new MouseEvent("click"))
					}
					catch (t)
					{
						var n = document.createEvent("MouseEvents");
						n.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), e.dispatchEvent(n)
					}
				}
				var i = "object" == typeof window && window.window === window ? window : "object" == typeof self && self.self === self ? self : "object" == typeof t.g && t.g.global === t.g ? t.g : void 0,
					c = i.navigator && /Macintosh/.test(navigator.userAgent) && /AppleWebKit/.test(navigator.userAgent) && !/Safari/.test(navigator.userAgent),
					a = i.saveAs || ("object" != typeof window || window !== i ? function() {} : "download" in HTMLAnchorElement.prototype && !c ? function(e, t, c)
					{
						var a = i.URL || i.webkitURL,
							l = document.createElement("a");
						t = t || e.name || "download", l.download = t, l.rel = "noopener", "string" == typeof e ? (l.href = e, l.origin === location.origin ? o(l) : r(l.href) ? n(e, t, c) : o(l, l.target = "_blank")) : (l.href = a.createObjectURL(e), setTimeout(function()
						{
							a.revokeObjectURL(l.href)
						}, 4e4), setTimeout(function()
						{
							o(l)
						}, 0))
					} : "msSaveOrOpenBlob" in navigator ? function(e, t, i)
					{
						if(t = t || e.name || "download", "string" != typeof e)
						{
							var c;
							navigator.msSaveOrOpenBlob((void 0 === (c = i) ? c = {
								autoBom: !1
							} : "object" != typeof c && (console.warn("Deprecated: Expected third argument to be a object"), c = {
								autoBom: !c
							}), c.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob(["\uFEFF", e],
							{
								type: e.type
							}) : e), t)
						}
						else if(r(e)) n(e, t, i);
						else
						{
							var a = document.createElement("a");
							a.href = e, a.target = "_blank", setTimeout(function()
							{
								o(a)
							})
						}
					} : function(e, t, r, o)
					{
						if((o = o || open("", "_blank")) && (o.document.title = o.document.body.innerText = "downloading..."), "string" == typeof e) return n(e, t, r);
						var a = "application/octet-stream" === e.type,
							l = /constructor/i.test(i.HTMLElement) || i.safari,
							s = /CriOS\/[\d]+/.test(navigator.userAgent);
						if((s || a && l || c) && "undefined" != typeof FileReader)
						{
							var u = new FileReader;
							u.onloadend = function()
							{
								var e = u.result;
								e = s ? e : e.replace(/^data:[^;]*;/, "data:attachment/file;"), o ? o.location.href = e : location = e, o = null
							}, u.readAsDataURL(e)
						}
						else
						{
							var d = i.URL || i.webkitURL,
								h = d.createObjectURL(e);
							o ? o.location = h : location.href = h, o = null, setTimeout(function()
							{
								d.revokeObjectURL(h)
							}, 4e4)
						}
					});
				i.saveAs = a.saveAs = a, e.exports = a
			}) ? o.apply(n, []) : o) && (e.exports = r)
		},
		8727: function(e, n, t)
		{
			"use strict";
			var r = t(7294),
				o = t(5893),
				i = {
					overflow: "hidden",
					fontSize: "0",
					width: "100%",
					height: "100%"
				};
			n.Z = function(e)
			{
				var n, t, c = e.children,
					a = (0, r.useRef)(null),
					l = !1,
					s = function()
					{
						return l = !1
					},
					u = function(e)
					{
						return a.current.scrollLeft = e
					};
				return (0, o.jsx)("div",
				{
					style: i,
					ref: a,
					onTouchStart: function(e)
					{
						n = e.targetTouches[0].pageX - a.current.offsetLeft, t = a.current.scrollLeft
					},
					onTouchMove: function(e)
					{
						u(t - (e.targetTouches[0].pageX - a.current.offsetLeft - n) * 1)
					},
					onMouseDown: function(e)
					{
						l = !0, n = e.pageX - a.current.offsetLeft, t = a.current.scrollLeft
					},
					onMouseMove: function(e)
					{
						l && (e.preventDefault(), u(t - (e.pageX - a.current.offsetLeft - n) * 1))
					},
					onMouseUp: s,
					onMouseLeave: s,
					children: c
				})
			}
		},
		5615: function(e, n, t)
		{
			"use strict";
			var r = t(6150),
				o = t(7294),
				i = t(9521),
				c = t(5893);
			n.Z = function(e)
			{
				var n = e.childrens,
					t = (0, o.useState)(0),
					i = t[0],
					u = t[1],
					d = (0, r.C)(function(e)
					{
						return e.global.isRight
					}),
					h = (0, r.C)(function(e)
					{
						return e.global.isMobile
					});
				return (0, o.useEffect)(function()
				{
					u(d ? 1 : 0)
				}, [d]), (0, c.jsx)(a,
				{
					children: (0, c.jsx)(l,
					{
						children: n.map(function(e, n)
						{
							return (0, c.jsx)(s,
							{
								style:
								{
									width: h && i !== n ? "0" : "100%"
								},
								children: e
							}, n)
						})
					})
				})
			};
			var a = i.ZP.div.withConfig(
				{
					displayName: "MainSlider__Container",
					componentId: "sc-x1wvnd-0"
				})(["width:100%;height:100%;overflow:hidden;position:relative;"]),
				l = i.ZP.div.withConfig(
				{
					displayName: "MainSlider__Slider",
					componentId: "sc-x1wvnd-1"
				})(["display:flex;width:100%;height:100%;"]),
				s = i.ZP.div.withConfig(
				{
					displayName: "MainSlider__Slide",
					componentId: "sc-x1wvnd-2"
				})(["transition:width 300ms ease-in-out;width:100%;height:100%;overflow:hidden;"])
		},
		5654: function(e, n, t)
		{
			"use strict";
			var r = t(4701),
				o = t(6150),
				i = t(1563),
				c = t(9417),
				a = t(7294),
				l = t(9521),
				s = t(5893);
			n.Z = function(e)
			{
				var n = e.items,
					t = e.selected,
					l = e.setSelected,
					f = (0, a.useState)(!1),
					p = f[0],
					g = f[1],
					x = (0, a.useState)(""),
					y = x[0],
					b = x[1],
					j = (0, o.C)(function(e)
					{
						return e.global.lang
					}),
					w = n.length > 0 ? n.filter(function(e)
					{
						return e.title.toLowerCase()
							.match(y.toLowerCase())
					}) : [];
				return (0, a.useEffect)(function()
				{
					p ? b("") : b(t.title)
				}, [p, t, b]), (0, s.jsx)(u,
				{
					children: (0, s.jsxs)("div",
					{
						style:
						{
							position: "relative",
							width: "100%"
						},
						children: [(0, s.jsxs)(i.OP,
						{
							style:
							{
								padding: "0 0.5rem",
								zIndex: "2",
								position: "relative",
								height: "2rem"
							},
							onClick: function()
							{
								g(!0)
							},
							children: [(0, s.jsx)(i.Kx,
							{
								className: "medium",
								style:
								{
									padding: "0",
									overflow: "hidden"
								},
								placeholder: r.Z.filter_selectBox[j],
								maxRows: 1,
								value: y,
								maxLength: 20,
								onChange: function(e)
								{
									!p || e.currentTarget.value.match("\n") || b(e.currentTarget.value)
								}
							}), (0, s.jsx)(i.xL,
							{
								style:
								{
									width: "0.7rem",
									margin: "0 0 0 0.2rem"
								},
								icon: p ? c.l1h : c.eW2
							})]
						}), (0, s.jsx)(d,
						{
							style:
							{
								display: p ? "block" : "none"
							},
							children: w.map(function(e, n)
							{
								return (0, s.jsx)("li",
								{
									children: (0, s.jsx)(h,
									{
										className: e.no === t.no ? "medium selected" : "medium",
										onClick: function()
										{
											l(e), g(!1)
										},
										children: e.title || "-"
									})
								}, n)
							})
						}), (0, s.jsx)(m,
						{
							style:
							{
								display: p ? "block" : "none"
							},
							onClick: function()
							{
								g(!1)
							}
						})]
					})
				})
			};
			var u = l.ZP.div.withConfig(
				{
					displayName: "SelectBox__Container",
					componentId: "sc-1p70i56-0"
				})(["width :100%;"]),
				d = l.ZP.ul.withConfig(
				{
					displayName: "SelectBox__UL",
					componentId: "sc-1p70i56-1"
				})(["position:absolute;width:100%;max-height:15rem;z-index:2;border:2px solid ", ";border-radius:0.5rem;background-color:", ";overflow-y:auto;overflow-y:overlay;overflow-x:hidden;&::-webkit-scrollbar{display:inline-block;width:0.4rem;}&::-webkit-scrollbar-thumb{height:17%;background-color:", ";border-radius:1rem;}"], function(e)
				{
					return e.theme.color.rgb139_187_233
				}, function(e)
				{
					return e.theme.color.rgb255_255_255
				}, function(e)
				{
					return e.theme.color.rgb210_210_210
				}),
				h = (0, l.ZP)(i.zx)
				.withConfig(
				{
					displayName: "SelectBox__ItemButton",
					componentId: "sc-1p70i56-2"
				})(["width :100%;padding:auto 0.5rem;text-align:left;border-radius:0;&.selected{color:", ";background-color:", ";pointer-events:none;}"], function(e)
				{
					return e.theme.color.rgb255_255_255
				}, function(e)
				{
					return e.theme.color.rgb139_187_233
				}),
				m = l.ZP.div.withConfig(
				{
					displayName: "SelectBox__BG",
					componentId: "sc-1p70i56-3"
				})(["position:fixed;top:0;left:0;width:100%;height:100%;z-index:1;"])
		},
		8024: function(e, n, t)
		{
			"use strict";
			var r = t(9499),
				o = t(7294),
				i = t(5280),
				c = t(1728),
				a = t(5893);

			function l(e, n)
			{
				var t = Object.keys(e);
				if(Object.getOwnPropertySymbols)
				{
					var r = Object.getOwnPropertySymbols(e);
					n && (r = r.filter(function(n)
					{
						return Object.getOwnPropertyDescriptor(e, n)
							.enumerable
					})), t.push.apply(t, r)
				}
				return t
			}

			function s(e)
			{
				for(var n = 1; n < arguments.length; n++)
				{
					var t = null != arguments[n] ? arguments[n] :
					{};
					n % 2 ? l(Object(t), !0)
						.forEach(function(n)
						{
							(0, r.Z)(e, n, t[n])
						}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : l(Object(t))
						.forEach(function(n)
						{
							Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(t, n))
						})
				}
				return e
			}
			n.Z = function(e)
			{
				var n = e.listArr,
					t = e.clientHeight,
					r = e.selected,
					l = e.rowHeight,
					u = (0, o.useRef)(null),
					d = (0, o.useState)([]),
					h = d[0],
					m = d[1];
				(0, o.useEffect)(function()
				{
					u.current && n.length > 0 && m(n.map(function(e, n)
					{
						return setTimeout(function()
						{
							var e;
							null == u || null === (e = u.current) || void 0 === e || e.resetAfterIndex(n)
						}, 0), r === n ? 2 * l : l
					}))
				}, [r, n, u, l, m]);
				var f = function(e)
				{
					var t = e.index,
						r = e.style;
					return (0, a.jsx)("div",
					{
						style: s(s(
						{}, r),
						{},
						{
							transition: "all 300ms ease-in-out"
						}),
						children: n[t]
					})
				};
				return (0, a.jsx)(c.Z,
				{
					defaultHeight: t,
					children: function(e)
					{
						var t = e.width,
							r = e.height;
						return (0, a.jsx)(i.S_,
						{
							ref: u,
							height: r,
							width: t,
							itemCount: n.length,
							itemSize: function(e)
							{
								return h[e] || 0
							},
							overscanCount: 1,
							children: f
						})
					}
				})
			}
		},
		583: function(e, n, t)
		{
			"use strict";
			t.r(n), t.d(n,
			{
				default: function()
				{
					return nw
				}
			});
			var r = t(7294),
				o = t(9521),
				i = t(6150),
				c = t(1563),
				a = t(8727),
				l = t(9417),
				s = t(8586),
				u = t(3380),
				d = t(3420),
				h = t(1550),
				m = t(5893),
				f = function()
				{
					var e = (0, i.T)(),
						n = (0, r.useState)(!1),
						t = n[0],
						o = n[1],
						c = (0, i.C)(function(e)
						{
							return e.global.isRight
						}),
						f = (0, i.C)(function(e)
						{
							return e.global.isMobile
						}),
						w = (0, i.C)(function(e)
						{
							//*储存读取快捷角色
							if(qchar == 'yes' && localStorage['qchar'])e.sCharacter = JSON.parse(localStorage['qchar']);
							qchar = 'no';
							localStorage['qchar'] = JSON.stringify(e.sCharacter);
							//*储存读取快捷角色
							return e.sCharacter
						}),
						_ = function(n)
						{
							if(t)
							{
								var r = w.selectedList.filter(function(e)
								{
									return !(n.no === e.no && n.index === e.index)
								});
								e((0, h.F5)(r))
							}
							else e((0, h.Ks)(n))
						};
					return (0, m.jsxs)(p,
					{
						children: [(0, m.jsxs)(g,
						{
							children: [(0, m.jsx)(y,
							{
								style:
								{
									display: f && c || t ? "none" : "block"
								},
								onClick: function()
								{
									o(!0), e((0, h.Ks)(d.I))
								},
								children: (0, m.jsx)(b,
								{
									style:
									{
										marginLeft: "0.1rem"
									},
									icon: l.FKd
								})
							}), (0, m.jsx)(y,
							{
								style:
								{
									display: f && c || !t ? "none" : "block"
								},
								onClick: function()
								{
									o(!1)
								},
								children: (0, m.jsx)(b,
								{
									style:
									{
										marginLeft: "0.1rem"
									},
									icon: l.k9h
								})
							}), (0, m.jsx)(y,
							{
								style: f && c ?
								{} :
								{
									display: "none"
								},
								onClick: function()
								{
									e((0, s.Cz)(!1))
								},
								children: (0, m.jsx)(b,
								{
									icon: l.EyR
								})
							})]
						}), (0, m.jsx)(g,
						{
							style:
							{
								flexGrow: "1",
								overflow: "hidden",
								margin: "0",
								width: "100%"
							},
							children: (0, m.jsx)(x,
							{
								children: (0, m.jsx)(a.Z,
								{
									children: (0, m.jsx)(g,
									{
										style:
										{
											margin: "0",
											justifyContent: "flex-start"
										},
										children: w.selectedList.map(function(e, n)
										{
											return (0, m.jsx)(j,
											{
												alt: String(e.no),
												width: 252,
												height: 252,
												src: loadhead(e.no+'.'+e.index),//#下方快捷角色选择框
												onClick: function()
												{
													_(e)
												},
												onError: function(e)
												{
													var n = e.currentTarget;
													(0, u.Mp)(n, "character")
												},
												className: (0, u.Y)(w.selected, e) ? "selected" : ""
											}, n)
										})
									})
								})
							})
						}), (0, m.jsxs)(g,
						{
							children: [(0, m.jsx)(j,
							{
								className: (0, u.Y)(w.selected, d.I) ? "selected" : "",
								style:
								{
									display: !f || c ? "block" : "none",
									margin: "0"
								},
								width: 252,
								height: 252,
								alt: "sensei",
								src: loadhead(d.I.no+'.'+d.I.index),//#右侧老师本人
								onClick: function()
								{
									e((0, h.Ks)(d.I))
								},
								priority: !0
							}), (0, m.jsx)(y,
							{
								style:
								{
									display: !f || c ? "none" : "block"
								},
								onClick: function()
								{
									e((0, s.Cz)(!0)), o(!1)
								},
								children: (0, m.jsx)(b,
								{
									icon: l.yOZ
								})
							})]
						})]
					})
				},
				p = o.ZP.div.withConfig(
				{
					displayName: "Footer__Container",
					componentId: "sc-1rjbi2j-0"
				})(["", " flex-shrink:0;height:3.5rem;color:", ";background-color:", ";@media screen and (max-width:768px){height:4rem;}"], function(e)
				{
					return e.theme.common.flexBox(
					{
						justify: "space-between"
					})
				}, function(e)
				{
					return e.theme.color.rgb255_255_255
				}, function(e)
				{
					return e.theme.color.rgb76_91_111
				}),
				g = o.ZP.div.withConfig(
				{
					displayName: "Footer__Flex",
					componentId: "sc-1rjbi2j-1"
				})(["", ";position:relative;width:auto;margin:0 1rem;"], function(e)
				{
					return e.theme.common.flexBox(
					{})
				}),
				x = o.ZP.div.withConfig(
				{
					displayName: "Footer__ProfileContainer",
					componentId: "sc-1rjbi2j-2"
				})(["", ";overflow-x:scroll;position:absolute;"], function(e)
				{
					return e.theme.common.flexBox(
					{
						justify: "flex-start"
					})
				}),
				y = (0, o.ZP)(c.hU)
				.withConfig(
				{
					displayName: "Footer__Circlebutton",
					componentId: "sc-1rjbi2j-3"
				})(["border:2px solid white;border-radius:50%;height:3rem;width:3rem;&:hover{background-color:", ";}"], function(e)
				{
					return e.theme.color.rgb61_75_92
				}),
				b = (0, o.ZP)(c.xL)
				.withConfig(
				{
					displayName: "Footer__StyledIcon2",
					componentId: "sc-1rjbi2j-4"
				})(["height:1.5rem;margin:0.2rem 0rem;color:", ";"], function(e)
				{
					return e.theme.color.rgb255_255_255
				}),
				j = (0, o.ZP)(c.t_)
				.withConfig(
				{
					displayName: "Footer__ProfileClick2",
					componentId: "sc-1rjbi2j-5"
				})(["width:3rem;height:3rem;"]),
				w = t(9499),
				_ = t(721),
				C = t(8024),
				v = function(e)
				{
					var n = e.character,
						t = e.setSelected,
						r = (0, i.C)(function(e)
						{
							return e.sCharacter.selectedList
						}),
						o = (0, i.T)(),
						l = function(e)
						{
							var i, c = {
								no: n.no,
								index: e
							};
							(i = r.filter(function(t)
							{
								return !(n.no === t.no && e === t.index)
							}))
							.length === r.length ? o((0, h.AU)(c)) : o((0, h.F5)(i)), t(null)
						};
					return (0, m.jsx)(a.Z,
					{
						children: (0, m.jsx)(k,
						{
							children: n.profile.map(function(e)
							{
								return (0, m.jsx)('div',//@加个DIV
								{//@DIV头
									children: (0, m.jsx)(c.t_,//#return换成children:
									{
										width: 252,
										height: 252,
										alt: "profile",
										src: loadhead(n.no+'.'+e),//#左方人物皮肤选择分支
										onError: function(e)
										{
											var n = e.currentTarget;
											(0, u.Mp)(n, "character")
										},
										onClick: function()
										{
											l(e)
										},
										className: 1 === r.filter(function(t)
											{
												return n.no === t.no && e === t.index
											})
											.length ? "selected" : ""
									}, e)
								})//@DIV尾
							})
						})
					})
				},
				k = o.ZP.div.withConfig(
				{
					displayName: "Profiles__PContainer",
					componentId: "sc-6ar1q-0"
				})(["", " padding:1rem 0rem;width:100%;"], function(e)
				{
					return e.theme.common.flexBox(
					{
						justify: "flex-start"
					})
				}),
				Z = function(e)
				{
					var n = e.character,
						t = e.selected,
						r = e.setSelected,
						o = (0, i.C)(function(e)
						{
							return e.sCharacter.selectedList
						}),
						a = (0, i.C)(function(e)
						{
							return e.global.lang
						});
					return (0, m.jsxs)(N,
					{
						children: [(0, m.jsx)(S,
						{
							className: o.filter(function(e)
								{
									return e.no === n.no
								})
								.length > 0 ? "selected" : "",
							children: (0, m.jsxs)(P,
							{
								onClick: function()
								{
									t === n ? r(null) : r(n)
								},
								children: [(0, m.jsxs)(S,
								{
									children: [(0, m.jsx)('div',//@加个DIV
									{//@DIV头
										children: (0, m.jsx)(c.NZ,//#children: [换成children: 
										{
											width: 252,
											height: 252,
											src: loadhead(n.no+'.1'),//#左方选择框
											onError: function(e)
											{
												var n = e.currentTarget;
												(0, u.Mp)(n, "character")
											},
											alt: "profile"
										})
									})//@DIV尾
									, (0, m.jsxs)(I,
									{
										children: [(0, m.jsx)("h2",
										{
											children: (0, m.jsx)(R,
											{
												children: (0, m.jsx)(E,
												{
													className: "bold",
													children: n.name[a].replaceAll("-", " ")
												})
											})
										}), (0, m.jsx)(R,
										{
											children: (0, m.jsx)(D,
											{
												children: n.club[a]
											})
										})]
									})]
								}), (0, m.jsx)(B,
								{
									width: 252,
									height: 252,
									src: "MoeTalk/UI/School/".concat(n.school.en.indexOf('#') > -1 ? '%23' : n.school.en, ".webp"),//#学校
									onError: function(e)
									{
										var n = e.currentTarget;
										(0, u.Mp)(n, "school")
									},
									alt: "school"
								})]
							})
						}), (0, m.jsxs)(T,
						{
							children: [n === t && (0, m.jsx)(v,
							{
								character: n,
								setSelected: r
							}), (0, m.jsx)(O,
							{})]
						})]
					})
				},
				N = o.ZP.div.withConfig(
				{
					displayName: "Character__Container",
					componentId: "sc-9wktk6-0"
				})(["", " word-break:keep-all;height:auto;background-color:", ";"], function(e)
				{
					return e.theme.common.flexBox(
					{
						direction: "column"
					})
				}, function(e)
				{
					return e.theme.color.rgb243_247_248
				}),
				S = o.ZP.div.withConfig(
				{
					displayName: "Character__Wrapper",
					componentId: "sc-9wktk6-1"
				})(["", " &.selected{background-color:", ";}"], function(e)
				{
					return e.theme.common.flexBox(
					{
						align: "space-around",
						justify: "flex-start"
					})
				}, function(e)
				{
					return e.theme.color.rgb202_215_221
				}),
				P = o.ZP.div.withConfig(
				{
					displayName: "Character__CContainer",
					componentId: "sc-9wktk6-2"
				})(["", " height:auto;padding:1rem;cursor:pointer;box-sizing:border-box;&:hover{background-color:", ";}&:active{background-color:", ";}"], function(e)
				{
					return e.theme.common.flexBox(
					{
						justify: "space-between"
					})
				}, function(e)
				{
					return e.theme.color.rgb218_228_233
				}, function(e)
				{
					return e.theme.color.rgb202_215_221
				}),
				I = o.ZP.div.withConfig(
				{
					displayName: "Character__ProfileText",
					componentId: "sc-9wktk6-3"
				})(["", " height:auto;width:auto;margin:0 0 0 1rem;font-size:1.1rem;max-height:4rem;color:", ";"], function(e)
				{
					return e.theme.common.flexBox(
					{
						direction: "column",
						justify: "space-around",
						align: "flex-start"
					})
				}, function(e)
				{
					return e.theme.color.rgb68_72_78
				}),
				B = (0, o.ZP)(c.Yo)
				.withConfig(
				{
					displayName: "Character__School",
					componentId: "sc-9wktk6-4"
				})(["height:4rem;width:4rem;padding:0;"]),
				T = o.ZP.div.withConfig(
				{
					displayName: "Character__ProfileWrapper",
					componentId: "sc-9wktk6-5"
				})(["padding:0rem 1rem;width:100%;box-sizing:border-box;"]),
				O = o.ZP.div.withConfig(
				{
					displayName: "Character__HR",
					componentId: "sc-9wktk6-6"
				})(["position:relative;height:1px;margin-top:-1px;width:100%;background-color:", ";"], function(e)
				{
					return e.theme.color.rgb231_231_231
				}),
				R = o.ZP.div.withConfig(
				{
					displayName: "Character__FontDiv",
					componentId: "sc-9wktk6-7"
				})(["display:table;width:100%;table-layout:fixed;white-space:nowrap;"]),
				E = o.ZP.span.withConfig(
				{
					displayName: "Character__FontSpan",
					componentId: "sc-9wktk6-8"
				})(["display:table-cell;display:block;text-overflow:ellipsis;white-space:nowrap;"]),//#去overflow:hidden;
				D = (0, o.ZP)(E)
				.withConfig(
				{
					displayName: "Character__FontSpan2",
					componentId: "sc-9wktk6-9"
				})(["font-size:1rem;color:", ";"], function(e)
				{
					return e.theme.color.rgb111_119_127
				}),
				F = t(4701),
				L = t(8681),
				z = function(e)
				{
					var n = e.modalShow,
						t = e.handleModalShow,
						o = e.sortCharType,
						a = e.setSearch,
						l = (0, i.C)(function(e)
						{
							return e.global.lang
						}),
						s = (0, r.useState)(o),
						u = s[0],
						d = s[1];
					return (0, r.useEffect)(function()
					{
						d(o)
					}, [n, o]), (0, m.jsx)("div",
					{
						style:
						{
							width: "100%",
							position: "relative"
						},
						children: (0, m.jsxs)(M,
						{
							style:
							{
								maxHeight: n ? "12rem" : "0"
							},
							children: [(0, m.jsxs)(A,
							{
								children: [(0, m.jsx)(U,
								{
									className: "bold",
									children: F.Z.sort[l]
								}), (0, m.jsx)(c.hU,
								{
									onClick: function()
									{
										t()
									},
									children: (0, m.jsx)(G,
									{})
								})]
							}), (0, m.jsx)(q,
							{
								children: L.h5.map(function(e, n)
								{
									return (0, m.jsx)(c.Bx,
									{
										className: u === e ? "selected medium" : "medium",
										onClick: function()
										{
											localStorage['mt-order'] = e//@储存排序方式
											d(e)
										},
										children: F.Z[e][l]
									}, n)
								})
							}), (0, m.jsx)(A,
							{
								children: (0, m.jsx)(c.Mm,
								{
									className: "medium",
									onClick: function()
									{
										t(), a(
										{
											sortCharType: u
										})
									},
									children: F.Z.confirm[l]
								})
							})]
						})
					})
				},
				M = o.ZP.div.withConfig(
				{
					displayName: "GroupModal__Container",
					componentId: "sc-123a00a-0"
				})(["", ";background-color:", ";border:1px solid ", ";border-radius:10px;position:absolute;transition:max-height 0.3s ease-in-out;height:auto;z-index:1;overflow:hidden;box-sizing:border-box;"], function(e)
				{
					return e.theme.common.flexBox(
					{
						direction: "column"
					})
				}, function(e)
				{
					return e.theme.color.rgb255_255_255
				}, function(e)
				{
					return e.theme.color.rgb224_226_228
				}),
				A = o.ZP.div.withConfig(
				{
					displayName: "GroupModal__Header",
					componentId: "sc-123a00a-1"
				})(["", ";padding:0.6rem;box-sizing:border-box;"], function(e)
				{
					return e.theme.common.flexBox(
					{
						justify: "space-between"
					})
				}),
				q = o.ZP.div.withConfig(
				{
					displayName: "GroupModal__Body",
					componentId: "sc-123a00a-2"
				})(["", ";border-top:1px solid ", ";border-bottom:1px solid ", ";padding:0.6rem;box-sizing:border-box;"], function(e)
				{
					return e.theme.common.flexBox(
					{
						justify: "space-between"
					})
				}, function(e)
				{
					return e.theme.color.rgb239_240_241
				}, function(e)
				{
					return e.theme.color.rgb239_240_241
				}),
				U = o.ZP.span.withConfig(
				{
					displayName: "GroupModal__FontSpan",
					componentId: "sc-123a00a-3"
				})(["font-size:1.2rem;color:", ";"], function(e)
				{
					return e.theme.color.rgb63_68_74
				}),
				G = (0, o.ZP)(c.j4)
				.withConfig(
				{
					displayName: "GroupModal__ExitI",
					componentId: "sc-123a00a-4"
				})(["width:1.5rem;height:1.5rem;&:before,&:after{content:'';width:1.5rem;height:2px;left:40%;background:", ";}"], function(e)
				{
					return e.theme.color.rgb15_33_64
				}),
				Y = function(e)
				{
					var n = e.search,
						t = e.setSearch,
						o = e.characterLength,
						a = (0, r.useState)(!1),
						l = a[0],
						s = a[1],
						u = (0, i.C)(function(e)
						{
							return e.global.lang
						});
					return (0, m.jsxs)(H,
					{
						children: [(0, m.jsxs)(K,
						{
							children: [(0, m.jsx)("h1",
							{
								children: (0, m.jsxs)(X,
								{
									className: "bold",
									children: [F.Z.student[u], " ", (0, m.jsxs)("span",
									{
										style:
										{
											fontSize: "1.2rem"
										},
										children: ["(", o, ")"]
									})]
								})
							}), (0, m.jsxs)(W,
							{
								style:
								{
									width: "auto"
								},
								children: [(0, m.jsx)($,
								{
									className: "medium",
									onClick: function()
									{
										s(!l)
									},
									children: (0, m.jsx)(X,
									{
										style:
										{
											fontSize: "1.1rem"
										},
										children: F.Z[n.sortCharType][u]
									})
								}), (0, m.jsx)(c.jl,
								{
									onClick: function()
									{
										t(
										{
											order: !n.order
										})
									},
									children: (0, m.jsx)(W,
									{
										children: (0, m.jsx)(c.Yo,
										{
											style:
											{
												width: "2rem",
												height: "1rem",
												marginLeft: "0.4rem"
											},
											width: 110,
											height: 60,
											alt: "order",
											src: "MoeTalk/UI/".concat(n.order ? "down" : "up", ".webp")//#排序图标
										})
									})
								})]
							})]
						}), (0, m.jsxs)(W,
						{
							children: [(0, m.jsx)(c.II,
							{
								type: "text",
								value: n.text,
								maxLength: 30,
								className: "medium",
								placeholder: F.Z.search_comment[u],
								onChange: function(e)
								{
									t(
									{
										text: e.currentTarget.value
									})
								}
							}), (0, m.jsx)(c.lR,
							{
								width: 40,
								height: 40,
								onClick: function()
								{
									t(
									{
										text: ""
									})
								},
								src: "MoeTalk/UI/pen.webp",//#铅笔图标
								alt: "pen"
							})]
						}), (0, m.jsx)(z,
						{
							modalShow: l,
							handleModalShow: function()
							{
								s(!1)
							},
							sortCharType: n.sortCharType,
							setSearch: t
						})]
					})
				},
				H = o.ZP.div.withConfig(
				{
					displayName: "SearchBar__Container",
					componentId: "sc-1mvis42-0"
				})(["", " height:auto;padding:1rem 1rem 0rem 1rem;box-sizing:border-box;"], function(e)
				{
					return e.theme.common.flexBox(
					{
						direction: "column"
					})
				}),
				K = o.ZP.div.withConfig(
				{
					displayName: "SearchBar__Sort",
					componentId: "sc-1mvis42-1"
				})(["", " text-align:center;height:auto;"], function(e)
				{
					return e.theme.common.flexBox(
					{
						justify: "space-between"
					})
				}),
				X = o.ZP.span.withConfig(
				{
					displayName: "SearchBar__FontSpan",
					componentId: "sc-1mvis42-2"
				})(["font-size:1.5rem;color:", ";"], function(e)
				{
					return e.theme.color.rgb63_68_74
				}),
				W = o.ZP.div.withConfig(
				{
					displayName: "SearchBar__Flex",
					componentId: "sc-1mvis42-3"
				})(["", " height:auto;position:relative;"], function(e)
				{
					return e.theme.common.flexBox(
					{})
				}),
				$ = (0, o.ZP)(c.jl)
				.withConfig(
				{
					displayName: "SearchBar__Parallelogram1",
					componentId: "sc-1mvis42-4"
				})(["width:7.5rem;height:2.5rem;&:after{content:'';right:0.5rem;position:absolute;transform:skew(-10deg);border-bottom:0.45rem solid transparent;border-left:0.45rem solid transparent;border-top:0.45rem solid ", ";border-right:0.45rem solid ", ";}&:active:before{width:7.46rem;height:2.46rem;}"], function(e)
				{
					return e.theme.color.rgb73_111_143
				}, function(e)
				{
					return e.theme.color.rgb73_111_143
				});

			function J(e, n)
			{
				var t = Object.keys(e);
				if(Object.getOwnPropertySymbols)
				{
					var r = Object.getOwnPropertySymbols(e);
					n && (r = r.filter(function(n)
					{
						return Object.getOwnPropertyDescriptor(e, n)
							.enumerable
					})), t.push.apply(t, r)
				}
				return t
			}

			function V(e)
			{
				for(var n = 1; n < arguments.length; n++)
				{
					var t = null != arguments[n] ? arguments[n] :
					{};
					n % 2 ? J(Object(t), !0)
						.forEach(function(n)
						{
							(0, w.Z)(e, n, t[n])
						}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : J(Object(t))
						.forEach(function(n)
						{
							Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(t, n))
						})
				}
				return e
			}
			var Q = function()
				{
					var e, n = (0, i.C)(function(e)
						{
							return e.global.isMobile
						}),
						t = (0, i.C)(function(e)
						{
							return e.global.lang
						}),
						o = (0, r.useState)(
						{
							text: "",
							order: !0,
							sortCharType: "name"
						}),
						c = o[0],
						a = o[1],
						l = (0, r.useState)(null),
						s = l[0],
						d = l[1],
						h = (0, r.useState)(0),
						f = h[0],
						p = h[1],
						g = (0, r.useRef)(null),
						x = (0, r.useMemo)(function()
						{
							//*更新自定义角色的读取方式
							let arr = JSON.parse(JSON.stringify(_.Z));
							let carr = [];
							if(localStorage['custom'])carr = JSON.parse(localStorage['custom'])[0]['club'][0]['characters'];
							for(let num = 0;num < arr.length;num++)
							{
								arr[num].club[localStorage['mt-lang']] = arr[num].club[localStorage['mt-lang']]+'-'+arr[num].no;
							}
							for(let num = 0;num < carr.length;num++)
							{
								arr.push(
								{
									name : 
									{
										zh_cn : carr[num].zh_cn,
										zh_tw : carr[num].zh_cn,
										en : carr[num].zh_cn,
										jp : carr[num].zh_cn,
										kr : carr[num].zh_cn
									},
									club : 
									{
										zh_cn : '#'+(carr[num].no-1000),
										zh_tw : '#'+(carr[num].no-1000),
										en : '#'+(carr[num].no-1000),
										jp : '#'+(carr[num].no-1000),
										kr : '#'+(carr[num].no-1000)
									},
									school : 
									{
										zh_cn : '#'+(carr[num].no-1000),
										zh_tw : '#'+(carr[num].no-1000),
										en : '#'+(carr[num].no-1000),
										jp : '#'+(carr[num].no-1000),
										kr : '#'+(carr[num].no-1000)
									},
									no: carr[num].no,
									illust : 0,
									profile : [1],
									momotalk : true,
									open : true
								})
							}
							//*更新自定义角色的读取方式
							return arr.filter(function(e)//#_.Z换为arr
								{
									return null !== (0, u.oG)(e, c.text)
								})
								.sort(function(e, n)
								{
									return (0, u.ur)(e, n, c, t)
								})
						}, [t, c]),
						y = (null == g ? void 0 : null === (e = g.current) || void 0 === e ? void 0 : e.clientHeight) || 0;
					return (0, r.useEffect)(function()
					{
						null != g && g.current && setTimeout(function()
						{
							p(6 * parseInt(document.documentElement.style.fontSize.replace("px", "")) || 0)
						}, 500)
					}, [g, n]), (0, m.jsxs)(ee,
					{
						children: [(0, m.jsx)(Y,
						{
							search: c,
							setSearch: function(e)
							{
								a(function(n)
								{
									return V(V(
									{}, n), e)
								})
							},
							characterLength: x.length
						}), (0, m.jsx)(en,
						{
							ref: g,
							style:
							{
								opacity: f > 0 ? 1 : 0
							},
							children: (0, m.jsx)(C.Z,
							{
								listArr: x.map(function(e, n)
								{
									return (0, m.jsx)(Z,
									{
										character: e,
										selected: s,
										setSelected: function(e)
										{
											d(e)
										}
									}, n)
								}),
								clientHeight: y,
								selected: s ? x.indexOf(s) : void 0,
								rowHeight: f
							})
						})]
					})
				},
				ee = o.ZP.div.withConfig(
				{
					displayName: "LeftScreen__Container",
					componentId: "sc-jf2v8s-0"
				})(["", " background-color:", ";border-right:2px solid ", ";min-width:340px;@media screen and (max-width:768px){min-width:100vw;}"], function(e)
				{
					return e.theme.common.flexBox(
					{
						direction: "column"
					})
				}, function(e)
				{
					return e.theme.color.rgb243_247_248
				}, function(e)
				{
					return e.theme.color.rgb230_233_235
				}),
				en = o.ZP.div.withConfig(
				{
					displayName: "LeftScreen__CharContainer",
					componentId: "sc-jf2v8s-1"
				})(["width:100%;height:100%;overflow-y:scroll !important;"]);
			o.ZP.div.withConfig(
			{
				displayName: "LeftScreen__AruDiv",
				componentId: "sc-jf2v8s-2"
			})(["position:absolute;z-index:10;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;width:100%;height:100%;background-color:rgb(244,247,248);color:rgb(226,116,108);"]);
			var et = t(7812),
				er = t(5781),
				eo = t(5740),
				ei = t(4288),
				ec = t(6835),
				ea = t(4685),
				el = function(e)
				{
					var n = e.show,
						t = e.handleShow,
						o = e.sendChat,
						a = (0, r.useState)(""),
						l = a[0],
						s = a[1],
						u = (0, i.C)(function(e)
						{
							return e.global.lang
						}),
						d = function()
						{
							t(!1), s("")
						};
					return (0, m.jsx)(ea.Xf,
					{
						className: n ? "visible medium" : "medium",
						onDoubleClick: function()
						{
							d()
						},
						children: (0, m.jsxs)(ea.F0,
						{
							onDoubleClick: function(e)
							{
								return e.stopPropagation(), !1
							},
							children: [(0, m.jsxs)(ea.h4,
							{
								children: [(0, m.jsx)(ea.Dx,
								{
									className: "bold",
									children: F.Z.info[u]
								}), (0, m.jsx)(ea.ec,
								{
									onClick: function()
									{
										d()
									},
									children: (0, m.jsx)(c.j4,
									{})
								})]
							}), (0, m.jsxs)(ea.$0,
							{
								children: [(0, m.jsx)(c.OP,
								{
									children: (0, m.jsx)(c.Kx,
									{
										className: "medium",
										placeholder: F.Z.input_comment[u],
										maxRows: 3,
										value: l,
										onChange: function(e)
										{
											s(e.currentTarget.value)
										}
									})
								}), (0, m.jsxs)(ea.$_,
								{
									children: [(0, m.jsx)(ea.Lw,
									{
										className: "bold",
										onClick: function()
										{
											d()
										},
										children: F.Z.cancel[u]
									}), (0, m.jsx)(ea.AZ,
									{
										className: "bold",
										disabled: l.length < 1,
										onClick: function()
										{
											o("info", l), d()
										},
										children: F.Z.confirm[u]
									})]
								})]
							})]
						})
					})
				},
				es = function(e)
				{
					var n = e.show,
						t = e.sReply,
						o = e.handleShow,
						a = e.isFirst,
						l = e.scrollRef,
						s = (0, r.useState)(""),
						h = s[0],
						f = s[1],
						p = (0, i.C)(function(e)
						{
							return e.makeChat
						}),
						g = (0, i.C)(function(e)
						{
							return e.global.lang
						}),
						x = (0, i.T)(),
						y = function()
						{
							o(!1), f("")
						},
						b = function()
						{
							var e = [],
								n = {
									type: "reply",
									replyNo: p.replyNo,
									replyGroup: (null == t ? void 0 : t.replyGroup) || p.replyGroup,
									replyDepth: p.sReplyNo,
									sCharacter: d.I,
									content: h,
									isFirst: a
								},
								r = (0, u.ho)(p.chats, n);
							!r || r && p.chats.indexOf(r) === p.chats.length ? e.push.apply(e, (0, et.Z)(p.chats)
								.concat([n])) : p.chats.forEach(function(t, o)
							{
								e.push(t), p.chats[o + 1] === r && e.push(n)
							}), a && x((0, eo.uE)(p.replyGroup + 1)), x((0, eo.U_)(e)), x((0, eo.I0)(p.replyNo + 1)), y(), setTimeout(function()
							{
								var e;
								null == l || null === (e = l.current) || void 0 === e || e.scrollIntoView(!1)
							}, 100)
						};
					return (0, m.jsx)(ea.Xf,
					{
						className: n ? "visible medium" : "medium",
						onDoubleClick: function()
						{
							y()
						},
						children: (0, m.jsxs)(ea.F0,
						{
							onDoubleClick: function(e)
							{
								return e.stopPropagation(), !1
							},
							children: [(0, m.jsxs)(ea.h4,
							{
								children: [(0, m.jsx)(ea.Dx,
								{
									className: "bold",
									children: a ? F.Z.go_reply[g] : F.Z.add_reply[g]
								}), (0, m.jsx)(ea.ec,
								{
									onClick: function()
									{
										y()
									},
									children: (0, m.jsx)(c.j4,
									{})
								})]
							}), (0, m.jsxs)(ea.$0,
							{
								children: [(0, m.jsx)(c.OP,
								{
									children: (0, m.jsx)(c.Kx,
									{
										className: "medium",
										placeholder: F.Z.input_comment[g],
										maxRows: 3,
										value: h,
										onChange: function(e)
										{
											f(e.currentTarget.value)
										}
									})
								}), (0, m.jsxs)(ea.$_,
								{
									children: [(0, m.jsx)(ea.Lw,
									{
										className: "bold",
										onClick: function()
										{
											y()
										},
										children: F.Z.cancel[g]
									}), (0, m.jsx)(ea.AZ,
									{
										className: "bold",
										disabled: h.length < 1,
										onClick: function()
										{
											b()
										},
										children: F.Z.confirm[g]
									})]
								})]
							})]
						})
					})
				},
				eu = function(e)
				{
					var n = e.show,
						t = e.handleShow,
						r = e.handleDeleteAll,
						o = (0, i.C)(function(e)
						{
							return e.global.lang
						});
					return (0, m.jsx)(m.Fragment,
					{
						children: (0, m.jsx)(ea.Xf,
						{
							className: n ? "visible medium" : "medium",
							onDoubleClick: function()
							{
								t(!1)
							},
							children: (0, m.jsxs)(ea.F0,
							{
								onDoubleClick: function(e)
								{
									return e.stopPropagation(), !1
								},
								children: [(0, m.jsxs)(ea.h4,
								{
									children: [(0, m.jsx)(ea.Dx,
									{
										className: "bold",
										children: F.Z.deleteTalk[o]
									}), (0, m.jsx)(ea.ec,
									{
										onClick: function()
										{
											t(!1)
										},
										children: (0, m.jsx)(c.j4,
										{})
									})]
								}), (0, m.jsxs)(ea.$0,
								{
									children: [(0, m.jsx)("span",
									{
										children: F.Z.ask_delete[o]
									}), (0, m.jsxs)("span",
									{
										style:
										{
											fontSize: "0.9rem",
											marginTop: "1rem"
										},
										children: ["※ ", F.Z.deleteTalk_comment[o]]
									}), (0, m.jsxs)(ea.$_,
									{
										children: [(0, m.jsx)(ea.Lw,
										{
											className: "bold",
											onClick: function()
											{
												t(!1)
											},
											children: F.Z.cancel[o]
										}), (0, m.jsx)(ea.AZ,
										{
											className: "bold",
											onClick: function()
											{
												r()
											},
											children: F.Z.confirm[o]
										})]
									})]
								})]
							})
						})
					})
				},
				ed = t(29),
				eh = t(7794),
				em = t.n(eh),
				ef = t(3162),
				ep = t(1120),
				eg = t.n(ep),
				ex = t(4306),
				ey = function()
				{
					var e, n = (0, ex.vC)(
						{
							fixedCacheKey: "account"
						}),
						t = (0, ec.Z)(n, 2),
						o = null === (e = (t[0], t[1])
							.data) || void 0 === e ? void 0 : e.NICKNAME,
						c = (0, i.C)(function(e)
						{
							return e.global.gameName
						}),
						a = (0, r.useState)("Mollu"),
						l = a[0],
						s = a[1];
					return (0, r.useEffect)(function()
					{
						s(o || c)
					}, [c, o, s]), [l, function(e)
					{
						s(e)
					}]
				},
				eb = function(e)
				{
					var n, t, o, a, l, d = e.show,
						h = e.handleShow,
						f = e.scrollRef,
						p = (0, i.T)(),
						g = (0, i.C)(function(e)
						{
							return e.global.lang
						}),
						x = (0, i.C)(function(e)
						{
							return e.global.isLoading
						}),
						y = (0, r.useState)(""),
						b = y[0],
						j = y[1],
						w = (0, r.useState)(""),
						_ = w[0],
						C = w[1],
						v = (0, r.useState)((t = {
							watermark: !0,
							title: !1,
							writer: !1
						}, "undefined" != typeof localStorage && (t.watermark = JSON.parse((null === (n = localStorage) || void 0 === n ? void 0 : n.getItem("watermark")) === null ? "true" : localStorage.getItem("watermark") || "false")), t)),
						k = v[0],
						Z = v[1],
						N = (0, r.useState)((a = 1, "undefined" != typeof localStorage && (a = Number.parseInt((null === (o = localStorage) || void 0 === o ? void 0 : o.getItem("imageQaulity")) || "1")), a)),
						S = N[0],
						P = N[1],
						I = (0, r.useRef)(null),
						B = ey(),
						T = (0, ec.Z)(B, 2),
						O = T[0],
						R = T[1],
						E = function()
						{
							C(""), b && (URL.revokeObjectURL(b), j("")), h(!1)
						},
						D = (l = (0, ed.Z)(em()
							.mark(function e()
							{
								var n, t;
								return em()
									.wrap(function(e)
									{
										for(;;) switch (e.prev = e.next)
										{
											case 0:
												if(p((0, s.jh)(!0)), null !== (n = f.current))
												{
													e.next = 4;
													break
												}
												return e.abrupt("return");
											case 4:
												t = function(e, n)
													{
														e.documentElement.style.fontSize = "16px", n.style.width = "500px";
														var t = F.Z.title[g] + " : " + ("" !== _ ? _ : F.Z.noTitle[g]),
															r = F.Z.writer[g] + " : " + ("" !== O ? O : F.Z.noName[g]),
															o = (0, u.Jx)(k, t, r);
														n.prepend(o)
													}, eg()(n,
													{
														logging: !1,
														allowTaint: !0,
														useCORS: !0,
														width: 500,
														windowWidth: 500,
														scale: 1 === S ? S + .1 : S,
														onclone: t
													})
													.then(function(e)
													{
														var n, t = e.toDataURL("image/png");
														//*加入水印功能和隐写存档
														let json = [];
														json[0] = {};
														json[0]['title'] = '备份存档';
														json[0]['nickname'] = 'MoeTalk';
														json[0]['date'] = (0, u._3)(!0, !0);
														json[0]['replyNo'] = localStorage['replyNo'];
														json[0]['replyGroup'] = localStorage['replyNo'];
														json[0]['chars'] = localStorage['chars'];
														json[1] = JSON.parse(localStorage['chats']);
														if(localStorage['wmark'])
														{
															let arr = JSON.parse(localStorage['wmark']);
															drawWaterMark.init(
															{
																imgpath: t,///图片路径  string类型  [必传]
																rotate: arr[0],///旋转角度   int类型
																fontsize: arr[1],///字体大小
																fontcolor: arr[2]+","+arr[3]+","+arr[4]+","+arr[5],///字体颜色  rgba类型
																density: arr[6],///稠密度
																str: arr[7].split(" "),	///[必传]
																cb: function(base64)
																{
																	j(base64), null === (n = I.current) || void 0 === n || n.setAttribute("src",base64), e.toBlob(function(e)
																	{
																		combineFiles(t.replace('data:image/png;base64,',''),JSON.stringify(json),"MolluTalk_" + ("" !== _ ? _ : F.Z.noTitle[g]));
																	})
																}
															})
														}
														else
														{
															j(t), null === (n = I.current) || void 0 === n || n.setAttribute("src", t), e.toBlob(function(e)
															{
																combineFiles(t.replace('data:image/png;base64,',''),JSON.stringify(json),"MolluTalk_" + ("" !== _ ? _ : F.Z.noTitle[g]));
															})
														}
														//*加入水印功能和隐写存档
														/*///原语句
														j(t), null === (n = I.current) || void 0 === n || n.setAttribute("src", t), e.toBlob(function(e)
														{
															e && (0, ef.saveAs)(e, "MolluTalk_" + ("" !== _ ? _ : F.Z.noTitle[g] + ".png"))
														})
														*/
													})
													.catch(function()
													{
														p((0, er.Y2)(
														{
															isAlert: !0,
															title: F.Z.error[g],
															ment: F.Z.error_ment[g]
														}))
													})
													.finally(function()
													{
														p((0, s.jh)(!1))
													});
											case 6:
											case "end":
												return e.stop()
										}
									}, e)
							})), function()
						{
							return l.apply(this, arguments)
						}),
						L = function(e, n)
						{
							var t = e.target.checked,
								r = {
									watermark: k.watermark,
									title: k.title,
									writer: k.writer
								};
							r[n] = t, "watermark" !== n || (localStorage.setItem("watermark", String(t)), t || (r.title = !1, r.writer = !1)), Z(r)
						};
					return (0, m.jsx)(ea.Xf,
					{
						className: d ? "visible medium" : "medium",
						onDoubleClick: function()
						{
							E()
						},
						children: (0, m.jsxs)(ea.F0,
						{
							onDoubleClick: function(e)
							{
								return e.stopPropagation(), !1
							},
							children: [(0, m.jsxs)(ea.h4,
							{
								children: [(0, m.jsx)(ea.Dx,
								{
									className: "bold",
									children: F.Z.download_to_image[g]
								}), (0, m.jsx)(ea.ec,
								{
									onClick: function()
									{
										E()
									},
									children: (0, m.jsx)(c.j4,
									{})
								})]
							}), (0, m.jsxs)(ea.$0,
							{
								style:
								{
									minHeight: "20rem",
									overflow: "hidden"
								},
								children: [0 === b.length && (0, m.jsxs)(m.Fragment,
								{
									children: [(0, m.jsxs)(ew,
									{
										style:
										{
											flexDirection: "column",
											alignItems: "flex-start",
											lineHeight: "2rem"
										},
										children: [F.Z.title[g], (0, m.jsx)(c.OP,
										{
											style:
											{
												marginBottom: "1rem"
											},
											children: (0, m.jsx)(c.Kx,
											{
												className: "medium",
												placeholder: F.Z.title_comment[g],
												maxRows: 1,
												value: _,
												maxLength: 14,
												onChange: function(e)
												{
													var n = e.currentTarget.value;
													n.match("\n") || (C(n), Z(
													{
														watermark: !0,
														writer: !0,
														title: !0
													}))
												},
												onKeyDown: function(e) {}
											})
										}), F.Z.writer[g], (0, m.jsx)(c.OP,
										{
											children: (0, m.jsx)(c.Kx,
											{
												className: "medium",
												placeholder: F.Z.nickName_comment[g],
												maxRows: 1,
												value: O,
												maxLength: 9,
												onChange: function(e)
												{
													var n = e.currentTarget.value;
													n.match("\n") || (R(n), Z(
													{
														watermark: !0,
														writer: !0,
														title: !0
													}))
												}
											})
										})]
									}), (0, m.jsxs)(ew,
									{
										style:
										{
											fontSize: "1rem"
										},
										children: [(0, m.jsx)("span",
										{
											children: F.Z.image_qaulity[g]
										}), (0, m.jsx)("div",
										{
											style:
											{
												display: "flex",
												fontSize: "0.9rem",
												marginLeft: "1rem"
											},
											children: [1, 2, 3].map(function(e)
											{
												return (0, m.jsxs)(c.Jg,
												{
													style:
													{
														marginRight: "1rem"
													},
													htmlFor: "iq_".concat(e),
													children: [(0, m.jsx)("input",
													{
														type: "checkbox",
														id: "iq_".concat(e),
														checked: S === e,
														onChange: function()
														{
															P(e)
														},
														value: e
													}), e, "x"]
												}, e)
											})
										})]
									}), (0, m.jsx)(ew,
									{
										children: ej.map(function(e, n)
										{
											return (0, m.jsxs)(c.Jg,
											{
												style:
												{
													fontSize: "1rem",
													margin: "0 1rem"
												},
												htmlFor: e,
												children: [(0, m.jsx)("input",
												{
													type: "checkbox",
													id: e,
													checked: k[e],
													onChange: function(n)
													{
														return L(n, e)
													},
													value: n
												}), F.Z[e][g]]
											}, n)
										})
									}), (0, m.jsx)("span",
									{
										style:
										{
											textAlign: "center",
											fontSize: "0.9rem",
											marginBottom: "0.5rem"
										},
										children: F.Z.down_comment1[g]
									}), (0, m.jsx)("span",
									{
										style:
										{
											textAlign: "center",
											fontSize: "0.9rem"
										},
										children: F.Z.thanks[g]
									}), (0, m.jsxs)(ea.$_,
									{
										children: [(0, m.jsx)(ea.Lw,
										{
											className: "bold",
											onClick: function()
											{
												E()
											},
											children: F.Z.cancel[g]
										}), (0, m.jsx)(ea.AZ,
										{
											className: "bold",
											disabled: x,
											onClick: function()
											{
												D()
											},
											children: F.Z.confirm[g]
										})]
									})]
								}), (0, m.jsx)(e_,
								{
									children: (0, m.jsxs)(eC,
									{
										style:
										{
											display: b ? "block" : "none"
										},
										children: [(0, m.jsx)("div",
										{
											style:
											{
												fontSize: "1rem",
												marginBottom: "1rem"
											},
											children: F.Z.image_download[g]
										}), (0, m.jsx)(ev,
										{
											ref: I,
											alt: "download"
										})]
									})
								})]
							})]
						})
					})
				},
				ej = ["watermark", "title", "writer"],
				ew = o.ZP.div.withConfig(
				{
					displayName: "PopupImageDownload__Wrapper",
					componentId: "sc-uicakl-0"
				})(["", ";margin-bottom:1rem;"], function(e)
				{
					return e.theme.common.flexBox(
					{})
				}),
				e_ = o.ZP.div.withConfig(
				{
					displayName: "PopupImageDownload__ImgContainer",
					componentId: "sc-uicakl-1"
				})(["position:relative;width:100%;height:100%;"]),
				eC = o.ZP.div.withConfig(
				{
					displayName: "PopupImageDownload__ImgWrapper",
					componentId: "sc-uicakl-2"
				})(["height:100%;width:100%;text-align:center;position:absolute;"]),
				ev = o.ZP.img.withConfig(
				{
					displayName: "PopupImageDownload__DownloadImg",
					componentId: "sc-uicakl-3"
				})(["width:100%;"]),
				ek = t(5733),
				eZ = t.n(ek),
				eN = t(83),
				eS = function(e)
				{
					var n, t = e.show,
						o = e.handleShow,
						a = (0, i.T)(),
						s = (0, i.C)(function(e)
						{
							return e.makeChat
						}),
						d = (0, i.C)(function(e)
						{
							return e.global.lang
						}),
						h = (0, r.useState)(""),
						f = h[0],
						p = h[1],
						g = (0, r.useState)(""),
						x = g[0],
						y = g[1],
						b = (0, r.useState)([
							{
								title: "",
								nickname: "",
								date: "",
								replyNo: 0,
								replyGroup: 0,
								chars: []
							},
							[]
						]),
						j = b[0],
						w = b[1],
						_ = (0, r.useRef)(null),
						C = ey(),
						v = (0, ec.Z)(C, 2),
						k = v[0],
						Z = v[1],
						N = function()
						{
							o(!1), p(""), y("")
						},
						S = (n = (0, ed.Z)(em()
							.mark(function e()
							{
								var n, t, r, o;
								return em()
									.wrap(function(e)
									{
										for(;;) switch (e.prev = e.next)
										{
											case 0:
												return n = [], s.chats.forEach(function(e, t)
												{
													s.chats.findIndex(function(n, t)
													{
														return e.sCharacter.no === n.sCharacter.no
													}) === t && 0 !== e.sCharacter.no && n.push(e.sCharacter.no)
												}), r = [JSON.stringify([t = {
													title: "" !== f ? f : F.Z.noTitle[d],
													nickname: "" !== k ? k : F.Z.noName[d],
													date: (0, u._3)(!0, !0),
													replyNo: s.replyNo,
													replyGroup: s.replyGroup,
													custom: localStorage['custom'],//@自创角色
													heads: localStorage['heads'],//@自创头像
													chars: n
												}, (0, et.Z)(s.chats)])], e.next = 6, (0, u.rU)(r);
											case 6:
												o = e.sent, (0, ef.saveAs)(o, "MolluTalk_".concat(t.title, ".png")), N();
											case 9:
											case "end":
												return e.stop()
										}
									}, e)
							})), function()
						{
							return n.apply(this, arguments)
						}),
						P = function(e)
						{
							if(null !== e.currentTarget.files)
							{
								var n = new FileReader,
									t = e.currentTarget.files[0];
								n.onloadend = function()
									{
										if("string" != typeof n.result) return a((0, er.Y2)(
										{
											isAlert: !0,
											ment: F.Z.error[d],
											title: F.Z.no_support[d]
										}));
										w(JSON.parse(n.result)), y("upload")
									}, eZ()
									.loadAsync(t)
									.then(function(e)
									{
										e.forEach(function(e, t)
										{
											t.dir || t.async("blob")
												.then(function(e)
												{
													n.readAsText(e)
												})
										})
									}, function(e)
									{
										t ? n.readAsText(t) : a((0, er.Y2)(
										{
											isAlert: !0,
											ment: F.Z.error[d],
											title: F.Z.no_support[d]
										}))
									})
							}
						},
						I = function()
						{
							///j[0]其他存档数据
							a((0, eo.U_)(j[1])), a((0, eo.gW)(
							{
								sReplyNo: 0,
								replyNo: j[0].replyNo,
								replyGroup: j[0].replyGroup
							})), w([
								{
									title: "",
									nickname: "",
									date: "",
									replyNo: 0,
									replyGroup: 0,
									chars: []
								},
								[]
							]), N()
						};
					return (0, m.jsx)(ea.Xf,
					{
						className: t ? "visible medium" : "medium",
						onDoubleClick: function()
						{
							N()
						},
						children: (0, m.jsxs)(ea.F0,
						{
							onDoubleClick: function(e)
							{
								return e.stopPropagation(), !1
							},
							children: [(0, m.jsxs)(ea.h4,
							{
								children: [(0, m.jsx)(ea.Dx,
								{
									className: "bold",
									children: F.Z.sharedFile[d]
								}), (0, m.jsx)(ea.ec,
								{
									onClick: function()
									{
										N()
									},
									children: (0, m.jsx)(c.j4,
									{})
								})]
							}), (0, m.jsx)(ea.$0,
							{
								children: "" === x ? (0, m.jsxs)(m.Fragment,
								{
									children: [(0, m.jsx)("input",
									{
										type: "file",
										ref: _,
										style:
										{
											display: "none"
										},
										accept: "image/png, application/json",
										onChange: function(e)
										{
											P(e)
										}
									}), (0, m.jsxs)(eP,
									{
										onClick: function()
										{
											var e;
											null === (e = _.current) || void 0 === e || e.click()
										},
										children: [(0, m.jsx)(eI,
										{
											children: (0, m.jsx)(c.xL,
											{
												icon: l.cf$
											})
										}), (0, m.jsx)("span",
										{
											className: "bold",
											children: F.Z.upload[d]
										}), (0, m.jsx)("span",
										{
											style:
											{
												margin: "1rem",
												fontSize: "1rem"
											},
											children: F.Z.edit_comment[d]
										})]
									}), (0, m.jsx)(eN.HR,
									{
										style:
										{
											margin: "1rem 0"
										}
									}), (0, m.jsxs)(eP,
									{
										onClick: function()
										{
											s.chats.length > 0 && y("download")
										},
										children: [(0, m.jsx)(eI,
										{
											disabled: s.chats.length < 1,
											children: (0, m.jsx)(c.xL,
											{
												icon: l.q7m
											})
										}), (0, m.jsx)("span",
										{
											className: "bold",
											children: F.Z.download[d]
										}), (0, m.jsx)("span",
										{
											style:
											{
												margin: "1rem",
												fontSize: "1rem"
											},
											children: F.Z.down_comment2[d]
										}), (0, m.jsx)("span",
										{
											style:
											{
												fontSize: "1rem"
											},
											children: F.Z.down_comment3[d]
										})]
									})]
								}) : "download" === x ? (0, m.jsxs)(m.Fragment,
								{
									children: [(0, m.jsxs)(eB,
									{
										children: [F.Z.title[d], (0, m.jsx)(c.OP,
										{
											style:
											{
												marginBottom: "1rem"
											},
											children: (0, m.jsx)(c.Kx,
											{
												className: "medium",
												placeholder: F.Z.title_comment[d],
												maxRows: 1,
												value: f,
												maxLength: 20,
												onChange: function(e)
												{
													e.currentTarget.value.match("\n") || p(e.currentTarget.value)
												}
											})
										}), F.Z.writer[d], (0, m.jsx)(c.OP,
										{
											children: (0, m.jsx)(c.Kx,
											{
												className: "medium",
												placeholder: F.Z.nickName_comment[d],
												maxRows: 1,
												value: k,
												maxLength: 10,
												onChange: function(e)
												{
													e.currentTarget.value.match("\n") || Z(e.currentTarget.value)
												}
											})
										})]
									}), (0, m.jsx)("span",
									{
										style:
										{
											textAlign: "center",
											fontSize: "1rem",
											marginTop: "1rem"
										},
										children: F.Z.thanks[d]
									}), (0, m.jsxs)(ea.$_,
									{
										children: [(0, m.jsx)(ea.Lw,
										{
											className: "bold",
											onClick: function()
											{
												N()
											},
											children: F.Z.cancel[d]
										}), (0, m.jsx)(ea.AZ,
										{
											className: "bold",
											onClick: function()
											{
												S()
											},
											children: F.Z.confirm[d]
										})]
									})]
								}) : (0, m.jsxs)(m.Fragment,
								{
									children: [(0, m.jsx)("span",
									{
										children: F.Z.up_comment1[d]
									}), (0, m.jsxs)("div",
									{
										style:
										{
											margin: "1.5rem 0"
										},
										children: [(0, m.jsxs)(eT,
										{
											children: [F.Z.title[d], " : ", j[0].title]
										}), (0, m.jsxs)(eT,
										{
											children: [F.Z.writer[d], " : ", j[0].nickname]
										}), (0, m.jsxs)(eT,
										{
											children: [F.Z.date[d], " : ", j[0].date]
										})]
									}), (0, m.jsxs)("span",
									{
										style:
										{
											fontSize: "1rem"
										},
										children: ["※", F.Z.up_comment2[d]]
									}), (0, m.jsxs)(ea.$_,
									{
										children: [(0, m.jsx)(ea.Lw,
										{
											className: "bold",
											onClick: function()
											{
												N()
											},
											children: F.Z.cancel[d]
										}), (0, m.jsx)(ea.AZ,
										{
											className: "bold",
											onClick: function()
											{
												I()
											},
											children: F.Z.confirm[d]
										})]
									})]
								})
							})]
						})
					})
				},
				eP = o.ZP.div.withConfig(
				{
					displayName: "PopupFileShare__IconBox",
					componentId: "sc-ynp9rx-0"
				})(["", ";flex-direction:column;width:100%;text-align:center;cursor:pointer;"], function(e)
				{
					return e.theme.common.flexBox(
					{
						direction: "column"
					})
				}),
				eI = (0, o.ZP)(c.hU)
				.withConfig(
				{
					displayName: "PopupFileShare__ShareButton",
					componentId: "sc-ynp9rx-1"
				})(["margin-bottom:1rem;width:3rem;color:", ";"], function(e)
				{
					return e.theme.color.rgb45_70_100
				}),
				eB = o.ZP.div.withConfig(
				{
					displayName: "PopupFileShare__StyledForm",
					componentId: "sc-ynp9rx-2"
				})(["", ";line-height:2rem;"], function(e)
				{
					return e.theme.common.flexBox(
					{
						direction: "column",
						align: "flex-start"
					})
				}),
				eT = o.ZP.span.withConfig(
				{
					displayName: "PopupFileShare__InfoSpan",
					componentId: "sc-ynp9rx-3"
				})(["display:block;text-align:left;font-size:1.1rem;margin-bottom:1rem;"]),
				eO = t(1163),
				eR = t(5654);

			function eE(e, n)
			{
				var t = Object.keys(e);
				if(Object.getOwnPropertySymbols)
				{
					var r = Object.getOwnPropertySymbols(e);
					n && (r = r.filter(function(n)
					{
						return Object.getOwnPropertyDescriptor(e, n)
							.enumerable
					})), t.push.apply(t, r)
				}
				return t
			}

			function eD(e)
			{
				for(var n = 1; n < arguments.length; n++)
				{
					var t = null != arguments[n] ? arguments[n] :
					{};
					n % 2 ? eE(Object(t), !0)
						.forEach(function(n)
						{
							(0, w.Z)(e, n, t[n])
						}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : eE(Object(t))
						.forEach(function(n)
						{
							Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(t, n))
						})
				}
				return e
			}
			var eF = function(e)
				{
					var n, t, o = e.show,
						a = e.handleShow,
						l = (0, i.T)(),
						d = (0, eO.useRouter)(),
						h = (0, i.C)(function(e)
						{
							return e.global.lang
						}),
						f = (0, i.C)(function(e)
						{
							return e.global.isLoading
						}),
						p = (0, i.C)(function(e)
						{
							return e.makeChat
						}),
						g = (0, ex.vC)(
						{
							fixedCacheKey: "account"
						}),
						x = (0, ec.Z)(g, 2),
						y = (x[0], x[1]),
						b = (0, ex.yg)(),
						j = (0, ec.Z)(b, 1)[0],
						w = [
						{
							no: -1,
							title: F.Z.none_series[h],
							idx: 0
						},
						{
							no: 0,
							title: F.Z.add_series[h],
							idx: 0
						}],
						_ = (0, r.useState)(""),
						C = _[0],
						v = _[1],
						k = (0, r.useState)(0),
						Z = k[0],
						N = k[1],
						S = (0, r.useState)(1),
						P = S[0],
						I = S[1],
						B = (0, r.useState)(w[0]),
						T = B[0],
						O = B[1],
						R = (0, r.useState)(""),
						E = R[0],
						D = R[1],
						L = (0, r.useState)(0),
						z = L[0],
						M = L[1],
						A = (0, ex.O_)(
						{
							MEMBER_NO: z,
							M_TYPE: P
						},
						{
							skip: 0 === z
						}),
						q = (0, r.useMemo)(function()
						{
							var e = [
							{
								no: -1,
								title: F.Z.none_series[h],
								idx: 0
							},
							{
								no: 0,
								title: F.Z.add_series[h],
								idx: 0
							}];
							return A.data && (e = e.concat((0, et.Z)(A.data)
								.map(function(e)
								{
									return {
										no: e.SERIES_NO,
										title: e.TITLE,
										idx: e.SERIES_IDX || 0
									}
								}))), e
						}, [A, h]);
					(0, r.useEffect)(function()
					{
						y.data && M(y.data.MEMBER_NO)
					}, [y.data]);
					var U = function()
						{
							a(!1), v(""), I(1), N(0), O(w[0]), D("")
						},
						G = (n = (0, ed.Z)(em()
							.mark(function e()
							{
								var n, t, r, o, i, c, a, m, g, x, b, w, _;
								return em()
									.wrap(function(e)
									{
										for(;;) switch (e.prev = e.next)
										{
											case 0:
												if(!f)
												{
													e.next = 2;
													break
												}
												return e.abrupt("return");
											case 2:
												if(l((0, s.jh)(!0)), n = [], t = [], r = [], o = [], i = new Date()
													.getTime()
													.toString(36), c = [], a = 0, m = 1, p.chats.forEach(function(e, o)
													{
														var a, l = eD(
														{}, e);
														p.chats.findIndex(function(n, t)
														{
															return e.sCharacter.no === n.sCharacter.no
														}) === o && 0 !== e.sCharacter.no && (e.sCharacter.no && n.push(e.sCharacter.no), t.push(
														{
															no: e.sCharacter.no,
															idx: e.sCharacter.index
														})), e.file && e.file.length > 0 && (l.content = "getFile/".concat(null === (a = y.data) || void 0 === a ? void 0 : a.MEMBER_NO, "/")
															.concat(i, "/mollu_")
															.concat(m, ".png"), c.push(
															{
																file: e.file || "",
																name: "mollu_".concat(m, ".png")
															}), m++), r.push(eD(eD(
														{}, l),
														{},
														{
															file: ""
														}))
													}), c.forEach(function(e)
													{
														var n = atob(e.file.split(",")[1]);
														e.file = "";
														for(var t = Array(n.length), r = 0; r < t.length; r++) t[r] = n.charCodeAt(r);
														var i = new Blob([new Uint8Array(t)],
														{
															type: "image/png"
														});
														o.push(i), a += i.size / 1024 / 1024
													}), N(Number.parseFloat(a.toFixed(2))), !(a > 3))
												{
													e.next = 19;
													break
												}
												l((0, er.Y2)(
												{
													isAlert: !0,
													ment: F.Z.error[h],
													title: F.Z.error_image_size[h]
												})), l((0, s.jh)(!1)), e.next = 75;
												break;
											case 19:
												if(!(0 === C.trim()
													.length || C.length > 30))
												{
													e.next = 24;
													break
												}
												l((0, er.Y2)(
												{
													isAlert: !0,
													ment: F.Z.error[h],
													title: F.Z.error_title_size[h]
												})), l((0, s.jh)(!1)), e.next = 75;
												break;
											case 24:
												if(!(0 === T.no && (0 === E.trim()
													.length || E.length > 20)))
												{
													e.next = 29;
													break
												}
												l((0, er.Y2)(
												{
													isAlert: !0,
													title: F.Z.error[h],
													ment: F.Z.error_series_size[h]
												})), l((0, s.jh)(!1)), e.next = 75;
												break;
											case 29:
												if(!(n.length < 1))
												{
													e.next = 34;
													break
												}
												l((0, er.Y2)(
												{
													isAlert: !0,
													title: F.Z.error[h],
													ment: F.Z.error_noCharacter[h]
												})), l((0, s.jh)(!1)), e.next = 75;
												break;
											case 34:
												if(void 0 !== y.data)
												{
													e.next = 39;
													break
												}
												l((0, er.Y2)(
												{
													isAlert: !0,
													title: F.Z.error[h],
													ment: F.Z.error_ment[h]
												})), l((0, s.jh)(!1)), e.next = 75;
												break;
											case 39:
												return b = {
													title: C,
													nickname: null === (g = y.data) || void 0 === g ? void 0 : g.NICKNAME,
													date: (0, u._3)(!0, !0),
													replyNo: p.replyNo,
													replyGroup: p.replyGroup,
													chars: n
												}, c.unshift(
												{
													file: "",
													name: "mollu_0.json"
												}), o.unshift(new Blob([JSON.stringify([b, r])],
												{
													type: "application/json"
												})), w = new FormData, o.forEach(function(e, n)
												{
													w.append("file_blobs", e), w.append("names", c[n].name)
												}), w.append("chars", "|" + n.join("|") + "|"), w.append("info", C), w.append("info", String(y.data.MEMBER_NO)), w.append("info", String(P)), w.append("info", h), w.append("info", localStorage.getItem("local_no") || ""), w.append("info", null === (x = y.data) || void 0 === x ? void 0 : x.UID), w.append("info", i), w.append("series", String(T.no)), w.append("series", String((T.idx || 0) + 1)), w.append("series", E), w.append("profile", String(t[0].no)), w.append("profile", String(t[0].idx)), e.next = 59, j(w);
											case 59:
												if(console.log(_ = e.sent), l((0, s.jh)(!1)), U(), !("data" in _ && _.data > 0))
												{
													e.next = 74;
													break
												}
												l((0, er.Y2)(
												{
													isAlert: !0,
													title: F.Z.success[h],
													ment: F.Z.upload_comment[h]
												})), e.t0 = P, e.next = 1 === e.t0 ? 68 : 2 === e.t0 ? 70 : 72;
												break;
											case 68:
												return d.push("/creative/".concat(h, "/1")), e.abrupt("break", 72);
											case 70:
												return d.push("/private/".concat(h, "/1")), e.abrupt("break", 72);
											case 72:
												e.next = 75;
												break;
											case 74:
												l((0, er.Y2)(
												{
													isAlert: !0,
													title: F.Z.error[h],
													ment: F.Z.error_upload[h]
												}));
											case 75:
											case "end":
												return e.stop()
										}
									}, e)
							})), function()
						{
							return n.apply(this, arguments)
						});
					return (0, m.jsx)(ea.Xf,
					{
						className: o ? "visible medium" : "medium",
						onDoubleClick: function()
						{
							U()
						},
						children: (0, m.jsxs)(ea.F0,
						{
							onDoubleClick: function(e)
							{
								return e.stopPropagation(), !1
							},
							children: [(0, m.jsxs)(ea.h4,
							{
								children: [(0, m.jsx)(ea.Dx,
								{
									className: "bold",
									children: F.Z.upload_to_server[h]
								}), (0, m.jsx)(ea.ec,
								{
									onClick: function()
									{
										U()
									},
									children: (0, m.jsx)(c.j4,
									{})
								})]
							}), (0, m.jsxs)(ea.$0,
							{
								children: [(0, m.jsxs)(ez,
								{
									children: [(0, m.jsxs)("div",
									{
										style:
										{
											width: "100%",
											textAlign: "left",
											display: 2 === P ? "none" : "block"
										},
										children: [F.Z.series[h], (0, m.jsx)("div",
										{
											style:
											{
												marginBottom: "1rem",
												width: "100%"
											},
											children: (0, m.jsx)(eR.Z,
											{
												items: q,
												selected: T,
												setSelected: function(e)
												{
													O(e)
												}
											})
										})]
									}), 0 === T.no && (0, m.jsx)(c.OP,
									{
										style:
										{
											marginBottom: "1rem"
										},
										children: (0, m.jsx)(c.Kx,
										{
											className: "medium",
											placeholder: F.Z.series_title_comment[h],
											maxRows: 1,
											value: E,
											maxLength: 20,
											onChange: function(e)
											{
												e.currentTarget.value.match("\n") || D(e.currentTarget.value)
											}
										})
									}), F.Z.title[h], (0, m.jsx)(c.OP,
									{
										style:
										{
											marginBottom: "1rem"
										},
										children: (0, m.jsx)(c.Kx,
										{
											className: "medium",
											placeholder: F.Z.title_comment[h],
											maxRows: 1,
											value: C,
											maxLength: 30,
											onChange: function(e)
											{
												e.currentTarget.value.match("\n") || v(e.currentTarget.value)
											}
										})
									}), F.Z.writer[h], (0, m.jsx)(c.OP,
									{
										children: (0, m.jsx)(c.Kx,
										{
											className: "medium",
											maxRows: 1,
											value: null === (t = y.data) || void 0 === t ? void 0 : t.NICKNAME,
											readOnly: !0
										})
									})]
								}), (0, m.jsx)(eM,
								{
									children: ["creative", "private"].map(function(e, n)
									{
										var t;
										return (0, m.jsxs)(c.Jg,
										{
											style:
											{
												margin: "0 1rem"
											},
											htmlFor: "iq_".concat(n + 1),
											children: [(0, m.jsx)("input",
											{
												type: "checkbox",
												disabled: (null === (t = y.data) || void 0 === t ? void 0 : t.AUTH) === 0 && "official" === e,
												id: "iq_".concat(n + 1),
												checked: P === n + 1,
												onChange: function()
												{
													I(n + 1), O(w[0])
												},
												value: n + 1
											}), F.Z[e][h]]
										}, n + 1)
									})
								}), (0, m.jsxs)(eL,
								{
									children: [(0, m.jsxs)("span",
									{
										style: Z > 3 ?
										{
											color: "red"
										} :
										{},
										children: ["※ ", F.Z.image_max_comment[h], " (", Z, "/3mb)"]
									}), (0, m.jsxs)("span",
									{
										children: ["※ ", F.Z.rule_comment[h]]
									}), (0, m.jsx)("span",
									{
										children: F.Z.thanks[h]
									})]
								}), (0, m.jsxs)(ea.$_,
								{
									children: [(0, m.jsx)(ea.Lw,
									{
										className: "bold",
										onClick: function()
										{
											U()
										},
										children: F.Z.cancel[h]
									}), (0, m.jsx)(ea.AZ,
									{
										className: "bold",
										disabled: C.trim()
											.length < 1 || Z > 5 || f,
										onClick: function()
										{
											G()
										},
										children: F.Z.confirm[h]
									})]
								})]
							})]
						})
					})
				},
				eL = o.ZP.div.withConfig(
				{
					displayName: "PopupServerUpload__SpanBox",
					componentId: "sc-155pfqz-0"
				})(["", ";font-size:0.9rem;line-height:1.5rem;"], function(e)
				{
					return e.theme.common.flexBox(
					{
						direction: "column"
					})
				}),
				ez = o.ZP.div.withConfig(
				{
					displayName: "PopupServerUpload__Wrapper",
					componentId: "sc-155pfqz-1"
				})(["", ";line-height:2rem;"], function(e)
				{
					return e.theme.common.flexBox(
					{
						direction: "column",
						align: "flex-start"
					})
				}),
				eM = o.ZP.div.withConfig(
				{
					displayName: "PopupServerUpload__CBWrapper",
					componentId: "sc-155pfqz-2"
				})(["", ";width:auto;font-size:0.9rem;margin:1rem 0;"], function(e)
				{
					return e.theme.common.flexBox(
					{})
				}),
				eA = function(e)
				{
					var n = e.scrollRef,
						t = e.show,
						o = e.sendChat,
						a = (0, i.T)(),
						u = (0, i.C)(function(e)
						{
							return e.sCharacter.selected
						}),
						d = (0, i.C)(function(e)
						{
							return e.makeChat.chats
						}),
						h = (0, i.C)(function(e)
						{
							return e.global.isScreenshot
						}),
						f = (0, i.C)(function(e)
						{
							return e.global.lang
						}),
						p = (0, ex.vC)(
						{
							fixedCacheKey: "account"
						}),
						g = (0, ec.Z)(p, 2),
						x = (g[0], g[1]),
						y = (0, r.useState)(!1),
						b = y[0],
						j = y[1],
						w = (0, r.useState)(!1),
						_ = w[0],
						C = w[1],
						v = (0, r.useState)(!1),
						k = v[0],
						Z = v[1],
						N = (0, r.useState)(!1),
						S = N[0],
						P = N[1],
						I = (0, r.useState)(!1),
						B = I[0],
						T = I[1],
						O = (0, r.useState)(!1),
						R = O[0],
						E = O[1],
						D = function()
						{
							if(x.data)
							{
								if(0 !== x.data.STATUS)
								{
									a((0, er.Y2)(
									{
										isAlert: !0,
										title: F.Z.error[f],
										ment: F.Z.cant_upload_comment[f]
									}));
									return
								}
								C(!0)
							}
							else a((0, s.Aj)(!0))
						};
					return (0, m.jsxs)(eq,
					{
						style: t ?
						{
							maxHeight: "12rem"
						} :
						{
							maxHeight: "0"
						},
						children: [(0, m.jsxs)(eU,
						{
							children: [(0, m.jsx)(eG,
							{
								title: "Reply",
								onClick: function()
								{
									P(!0)
								},
								children: (0, m.jsx)(c.xL,
								{
									icon: l.Lh7
								})
							}), (0, m.jsx)(eG,
							{
								title: "Info",
								onClick: function()
								{
									E(!0)
								},
								children: (0, m.jsx)(c.xL,
								{
									icon: l.DBf
								})
							}), (0, m.jsx)(eG,
							{
								disabled: 0 === u.no,
								title: "Relationship Event",
								onClick: function()
								{
									o("heart", "")
								},
								children: (0, m.jsx)(c.xL,
								{
									icon: l.m6i
								})
							}), (0, m.jsx)(eG,
							{
								disabled: d.length < 1,
								title: "Delete ALL",
								onClick: function()
								{
									T(!0)
								},
								children: (0, m.jsx)(c.xL,
								{
									icon: l.Vui
								})
							})]
						}), (0, m.jsxs)(eU,
						{
							children: [(0, m.jsx)(eG,
							{
								title: "ScreenShot Mode",
								className: h ? "dot" : "",
								onClick: function()
								{
									a((0, s.Wn)(!h))
								},
								children: (0, m.jsx)(c.xL,
								{
									icon: l.QY_
								})
							}), (0, m.jsx)(eG,
							{
								disabled: d.length < 1,
								title: "Image Download",
								onClick: function()
								{
									j(!0)
								},
								children: (0, m.jsx)(c.xL,
								{
									icon: l.wf8
								})
							}), (0, m.jsx)(eG,
							{
								title: "Share File",
								onClick: function()
								{
									Z(!0)
								},
								children: (0, m.jsx)(c.xL,
								{
									icon: l.EdJ
								})
							}), (0, m.jsx)(eG,
							{
								disabled: d.length < 1,
								title: "File Upload",
								style:
								{
									width: "3rem"
								},
								onClick: function()
								{
									D()
								},
								children: (0, m.jsx)(c.xL,
								{
									icon: l.wEO,
									className: "fa-solid fa-file-arrow-up"
								})
							})]
						}), (0, m.jsx)(eF,
						{
							show: _,
							handleShow: function(e)
							{
								C(e)
							}
						}), (0, m.jsx)(el,
						{
							show: R,
							handleShow: function(e)
							{
								E(e)
							},
							sendChat: o
						}), (0, m.jsx)(es,
						{
							show: S,
							handleShow: function(e)
							{
								P(e)
							},
							isFirst: !0,
							sReply: null,
							scrollRef: n
						}), (0, m.jsx)(eu,
						{
							show: B,
							handleShow: function(e)
							{
								T(e)
							},
							handleDeleteAll: function()
							{
								T(!1), a((0, eo.U_)([])), a((0, eo.gW)(
								{
									replyGroup: 1,
									replyNo: 1,
									sReplyNo: 0
								}))
							}
						}), (0, m.jsx)(eb,
						{
							show: b,
							handleShow: function(e)
							{
								j(e)
							},
							scrollRef: n
						}), (0, m.jsx)(eS,
						{
							show: k,
							handleShow: function(e)
							{
								Z(e)
							}
						})]
					})
				},
				eq = o.ZP.div.withConfig(
				{
					displayName: "ToolBox__Container",
					componentId: "sc-1ssk4pv-0"
				})(["", ";height:auto;border-top:2px solid ", ";transition:max-height 0.3s ease-in-out;overflow:hidden;box-sizing:border-box;"], function(e)
				{
					return e.theme.common.flexBox(
					{
						direction: "column"
					})
				}, function(e)
				{
					return e.theme.color.rgb230_233_235
				}),
				eU = o.ZP.div.withConfig(
				{
					displayName: "ToolBox__Wrapper",
					componentId: "sc-1ssk4pv-1"
				})(["", ";height:auto;"], function(e)
				{
					return e.theme.common.flexBox(
					{
						justify: "space-around"
					})
				}),
				eG = (0, o.ZP)(c.hU)
				.withConfig(
				{
					displayName: "ToolBox__ToolButton",
					componentId: "sc-1ssk4pv-2"
				})(["width:2.5rem;height:2.5rem;margin:1.5rem 0;color:", ";&.dot:after{content:'';display:block;background-color:red;width:0.5rem;height:0.5rem;transform:translate(500%,-550%);border-radius:50%;}"], function(e)
				{
					return e.theme.color.rgb45_70_100
				}),
				eY = function(e)
				{
					var n = e.show,
						t = e.handleShow,
						r = (0, i.T)(),
						o = (0, i.C)(function(e)
						{
							return e.sCharacter.selected
						}),
						a = (0, i.C)(function(e)
						{
							return e.makeChat
						}),
						l = (0, i.C)(function(e)
						{
							return e.global.lang
						}),
						s = function()
						{
							t(!1)
						},
						u = function(e)
						{
							var n = [],
								t = (0, et.Z)(a.chats)
								.filter(function(e)
								{
									return e.replyDepth === a.sReplyNo
								})
								.pop(),
								i = {
									type: "image",
									replyNo: 0,
									replyGroup: 0,
									replyDepth: a.sReplyNo,
									sCharacter: o,
									content: e,
									isFirst: a.chats.length < 1 || a.chats[a.chats.length - 1].sCharacter !== o || a.chats[a.chats.length - 1].replyDepth !== a.sReplyNo
								};
							if(a.chats.length < 1) n.push(i);
							else if(t) a.chats.forEach(function(e)
							{
								n.push(e), e === t && (i.isFirst = "heart" === t.type || t.sCharacter !== o || t.replyDepth !== a.sReplyNo, n.push(i))
							});
							else
							{
								var c = (0, et.Z)(a.chats)
									.filter(function(e)
									{
										return e.replyNo === a.sReplyNo
									})
									.pop();
								a.chats.forEach(function(e)
								{
									n.push(e), e === c && n.push(i)
								})
							}
							r((0, eo.U_)(n)), s()
						};
					if(cfemoji != 'NO'){let cf = cfemoji;cfemoji = 'NO';//@加入判断
						//*定义差分文件链接
						let no = JSON.parse(localStorage['qchar'])['selected']['no'];
						let index = JSON.parse(localStorage['qchar'])['selected']['index'];
						let cfindex = no+'.'+index;///读取选择的角色
						if(localStorage['CharFaceIndex'] && JSON.parse(localStorage['CharFaceIndex'])[cfindex] != null)cfindex = JSON.parse(localStorage['CharFaceIndex'])[cfindex];
						let link;let cflink = null;let cfarr = [];cfarr[0] = 'CharFace';///定义链接
						let charname = '暂无';
						if(no > 999)
						{
							charname = JSON.parse(localStorage['custom'])[0].club[0].characters.filter(function(item)
							{
								return item.no == no;
							});
							charname = charname[0].zh_cn;
						}
						else
						{
							if(no == 0)no = 193;
							charname = _.Z.filter(function(item)
							{
								return item.no == no;
							});
							charname = charname[0].name[localStorage['mt-lang']];
						}
						if(cf == 'CharFace' && charface[cfindex] && charface[cfindex] != 'NO')
						{
							if(charface[cfindex].split('.').length < 3)cfindex = charface[cfindex];
							let arr = charface[cfindex].split(',');
							for(let i = 0;i < arr.length;i++)
							{
								for(let num = 1;num <= arr[i].split('.')[1];num++)
								{
									cflink = 'CharFace/'+(arr[i].split('.')[0].replaceAll('_','/'))+'/'+arr[i].split('.')[0]+'.';
									cfarr.push(cflink+num+'.webp')
								}
							}
						}
						let cfnum = cf == 'Emoji' ? '112+25' : cfarr.length-1;///差分总数
						//*定义差分文件链接
						return (0, m.jsx)(m.Fragment,
						{
							children: (0, m.jsx)(ea.Xf,
							{
								className: n ? "visible medium" : "medium",
								onDoubleClick: function()
								{
									s()
								},
								children: (0, m.jsxs)(ea.F0,
								{
									onDoubleClick: function(e)
									{
										return e.stopPropagation(), !1
									},
									children: [(0, m.jsxs)(ea.h4,
									{
										children: [(0, m.jsx)(ea.Dx,
										{
											className: "bold",
											children: cf == 'Emoji' ? F.Z.emoticon[l]+'('+cfnum+')' : '差分表情：'+charname+'('+cfnum+')'//#加入差分表情
										}), (0, m.jsx)(ea.ec,
										{
											onClick: function()
											{
												s()
											},
											children: (0, m.jsx)(c.j4,
											{})
										})]
									}), (0, m.jsx)(eH,
									{
										children: (0, m.jsxs)(eK,
										{
											children: [Array(cf == 'Emoji' ? 112 : cfnum)//#加入差分表情
												.fill(0)
												.map(function(e, n)
												{
													if(cf == 'Emoji')link = cf+'/'+localStorage['mt-lang']+'/'+(n+1)+'_'+localStorage['mt-lang']+'.webp';//@原版表情
													if(cf == 'CharFace')link = cfarr[n+1];//@差分表情
													return (0, m.jsx)(eX,
													{
														alt: cf,
														height: 310,
														width: 310,
														onClick: function()
														{
															if(cf == 'Emoji')link = cf+'/'+localStorage['mt-lang']+'/'+(n+1)+'_'+localStorage['mt-lang']+'.webp';//@原版表情
															if(cf == 'CharFace')link = cfarr[n+1];//@差分表情
															u(link)//#表情链接
														},
														src: link//#表情链接
													}, n)
												}),Array(cf == 'Emoji' ? 25 : 0)//#恢复额外表情
												.fill(0)
												.map(function(e, n)
												{
													return (0, m.jsx)(eX,
													{
														alt: cf,
														height: 310,
														width: 310,
														onClick: function()
														{
															u(cf+'/'+(n+1)+'_'+cf+'.webp')//#表情链接
														},
														src: cf+'/'+(n+1)+'_'+cf+'.webp'//#表情链接
													}, n)
												})
											]
										})
									})]
								})
							})
						})
					}//@加入判断
				},
				eH = (0, o.ZP)(ea.$0)
				.withConfig(
				{
					displayName: "PopupEmoticonChat__Section2",
					componentId: "sc-vzjcea-0"
				})(["", ";overflow:hidden;overflow-y:auto;max-height:30rem;padding:0.5rem;"], function(e)
				{
					return e.theme.common.flexBox(
					{
						justify: "space-between",
						align: "flex-start"
					})
				}),
				eK = o.ZP.div.withConfig(
				{
					displayName: "PopupEmoticonChat__Body",
					componentId: "sc-vzjcea-1"
				})(["", ";flex-wrap:wrap;background-color:", ";border-radius:0.5rem;justify-content:space-between;padding:0.5rem;"], function(e)
				{
					return e.theme.common.flexBox(
					{
						justify: "space-between"
					})
				}, function(e)
				{
					return e.theme.color.rgb216_218_220
				}),
				eX = (0, o.ZP)(c.Yo)
				.withConfig(
				{
					displayName: "PopupEmoticonChat__ImgBox",
					componentId: "sc-vzjcea-2"
				})(["width:32%;border:2px solid ", ";background-color:", ";border-radius:10px;margin-bottom:0.5rem;cursor:pointer;&:active{transform:scale(0.95);}"], function(e)
				{
					return e.theme.color.rgb230_233_235
				}, function(e)
				{
					return e.theme.color.rgb255_255_255
				}),
				eW = function(e)
				{
					var n = e.scrollRef,
						t = (0, i.T)(),
						o = (0, i.C)(function(e)
						{
							return e.makeChat.chats
						}),
						a = (0, i.C)(function(e)
						{
							return e.makeChat.sReplyNo
						}),
						s = (0, i.C)(function(e)
						{
							return e.sCharacter.selected
						}),
						h = (0, i.C)(function(e)
						{
							return e.global.lang
						}),
						f = (0, r.useState)(!1),
						p = f[0],
						g = f[1],
						x = (0, r.useState)(!1),
						y = x[0],
						b = x[1],
						j = (0, r.useState)(" "),
						w = j[0],
						_ = j[1],
						C = (0, r.useState)(!1),
						v = C[0],
						k = C[1],
						Z = (0, r.useRef)(null),
						N = (0, r.useRef)(null);
					(0, r.useEffect)(function()
					{
						setTimeout(function()
						{
							_("")
						}, 500)
					}, []);
					var S = function(e)
					{
						b(e)
					};
					(0, r.useEffect)(function()
					{
						var e;
						"" === w && Z.current && v && (null === (e = Z.current) || void 0 === e || e.focus())
					}, [w, Z, v]);
					var P = function(e, n)
						{
							//*更改文字发送方式
							if(13 === (e.which || e.keyCode) && !(e.ctrlKey || e.shiftKey) && "" !== e.currentTarget.value && !localStorage['send'])
							{
								e.preventDefault()
								n()
							}
							if(13 === (e.which || e.keyCode) && (e.ctrlKey || e.shiftKey) && "" !== e.currentTarget.value && localStorage['send'] == 'click')
							{
								e.preventDefault()
								n()
							}
							//*更改文字发送方式
							/*///原语句
							13 === (e.which || e.keyCode) && (e.ctrlKey || e.shiftKey) && (e.preventDefault(), "" !== e.currentTarget.value && n())
							*/

						},
						I = (0, r.useCallback)(function(e, r)
						{
							var i = {
								type: e,
								content: "",
								replyDepth: a,
								replyNo: 0,
								replyGroup: 0,
								sCharacter: s,
								isFirst: !0
							};
							"image" === e ? i.file = r : "chat" === e ? i.content = r : "info" === e && (i.content = r, i.sCharacter = d.I);
							var c = [],
								l = (0, et.Z)(o)
								.filter(function(e)
								{
									return e.replyDepth === a
								})
								.pop();
							l && (i.isFirst = !("chat" === l.type && (0, u.Y)(l.sCharacter, s)) || l.replyDepth !== a);
							var h = (0, u.ho)(o, i);
							!h || h && o.indexOf(h) === o.length ? c.push.apply(c, (0, et.Z)(o)
								.concat([i])) : o.forEach(function(e, n)
							{
								c.push(e), o[n + 1] === h && c.push(i)
							}), t((0, eo.U_)(c)), setTimeout(function()
							{
								var e;
								null === (e = n.current) || void 0 === e || e.scrollIntoView(!1)
							}, 100)
						}, [a, s, o, n, t]),
						B = function()
						{
							t((0, er.Y2)(
							{
								isAlert: !0,
								title: F.Z.error[h],
								ment: F.Z.no_support[h]
							}))
						};
					return (0, m.jsxs)(e$,
					{
						children: [(0, m.jsxs)(eJ,
						{
							children: [(0, m.jsx)(eV,
							{
								title: "open",
								onClick: function()
								{
									p ? g(!1) : g(!0)
								},
								children: (0, m.jsx)(c.xL,
								{
									icon: p ? l.dWM : l.XSi
								})
							}), (0, m.jsx)("input",
							{
								type: "file",
								ref: N,
								style:
								{
									display: "none"
								},
								accept: "image/*",
								onChange: function(e)
								{
									(0, u.T6)(e, function(e)
									{
										I("image", e)
									}, B)
								}
							}), (0, m.jsx)(eV,
							{
								style:
								{
									paddingLeft: "0",
									width: "3rem"
								},
								title: "Image",
								onClick: function()
								{
									var e;
									null === (e = N.current) || void 0 === e || e.click()
								},
								children: (0, m.jsx)(c.xL,
								{
									icon: ei.VmB
								})
							}), (0, m.jsx)("div",
							{
								style:
								{
									width: "100%",
									padding: "0.5rem 0"
								},
								children: (0, m.jsxs)(c.OP,
								{
									children: [(0, m.jsx)(c.Kx,
									{
										className: "medium",
										placeholder: F.Z.input_comment[h],
										maxRows: 5,
										value: w,
										ref: Z,
										onFocus: function()
										{
											g(!1), k(!0)
										},
										onKeyDown: function(e)
										{
											P(e, function()
											{
												I("chat", w), _("")
											})
										},
										onChange: function(e)
										{
											cfemoji = 'NO';//@输入文字时不读取表情
											_(e.currentTarget.value)
										}
									}), (0, m.jsx)(eV,
									{
										style:
										{
											padding: "0.2rem",
											width: "2.2rem",
											height: "2.2rem"
										},
										title: "emoticon",
										onClick: function()
										{
											cfemoji = 'Emoji';//@这是原版表情
											S(!0)
										},
										children: (0, m.jsx)(c.xL,
										{
											icon: ei.pkM
										})
									})
									//*加入差分
									, (0, m.jsx)(eV,
									{
										style:
										{
											padding: "0.2rem",
											width: "2.2rem",
											height: "2.2rem"
										},
										title: "emoticon",
										onClick: function()
										{
											cfemoji = 'CharFace';///这是差分表情
											S(!0)
										},
										children: (0, m.jsx)(c.xL,
										{
											icon: l.FKd
										})
									})
									//*加入差分
									]
								})
							}), (0, m.jsx)(eV,
							{
								style:
								{},
								title: "send",
								disabled: w.length < 1,
								onClick: function()
								{
									I("chat", w), _("")
								},
								children: (0, m.jsx)(c.xL,
								{
									icon: l.FQ0
								})
							})]
						}), (0, m.jsx)(eA,
						{
							show: p,
							scrollRef: n,
							sendChat: I
						}), (0, m.jsx)(eY,
						{
							show: y,
							handleShow: S
						})]
					})
				},
				e$ = o.ZP.div.withConfig(
				{
					displayName: "InputBar__Container",
					componentId: "sc-1fvyhr8-0"
				})(["", ";height:auto;background-color:", ";border-top:2px solid ", ";"], function(e)
				{
					return e.theme.common.flexBox(
					{
						direction: "column"
					})
				}, function(e)
				{
					return e.theme.color.rgb243_247_248
				}, function(e)
				{
					return e.theme.color.rgb230_233_235
				}),
				eJ = o.ZP.div.withConfig(
				{
					displayName: "InputBar__Wrapper",
					componentId: "sc-1fvyhr8-1"
				})(["display:flex;width:100%;height:auto;padding:0;"]),
				eV = (0, o.ZP)(c.hU)
				.withConfig(
				{
					displayName: "InputBar__InputButton",
					componentId: "sc-1fvyhr8-2"
				})(["padding:0 1rem;width:4rem;height:100%;align-self:center;color:", ";"], function(e)
				{
					return e.theme.color.rgb45_70_100
				});

			function eQ(e, n)
			{
				var t = Object.keys(e);
				if(Object.getOwnPropertySymbols)
				{
					var r = Object.getOwnPropertySymbols(e);
					n && (r = r.filter(function(n)
					{
						return Object.getOwnPropertyDescriptor(e, n)
							.enumerable
					})), t.push.apply(t, r)
				}
				return t
			}

			function e0(e)
			{
				for(var n = 1; n < arguments.length; n++)
				{
					var t = null != arguments[n] ? arguments[n] :
					{};
					n % 2 ? eQ(Object(t), !0)
						.forEach(function(n)
						{
							(0, w.Z)(e, n, t[n])
						}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : eQ(Object(t))
						.forEach(function(n)
						{
							Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(t, n))
						})
				}
				return e
			}
			var e1 = function(e)
				{
					var n = e.show,
						t = e.selectChat,
						o = e.handleShow,
						a = e.sChatModeType,
						l = e.setSChatModeType,
						s = (0, i.T)(),
						h = (0, i.C)(function(e)
						{
							return e.makeChat
						}),
						f = (0, i.C)(function(e)
						{
							return e.global.lang
						}),
						p = (0, i.C)(function(e)
						{
							return e.sCharacter.selected
						}),
						g = (0, r.useState)(t.type),
						x = g[0],
						y = g[1],
						b = (0, r.useState)(""),
						j = b[0],
						w = b[1],
						_ = (0, r.useRef)(null);
					(0, r.useEffect)(function()
					{
						w("edit" === a && "image" !== t.type ? t.content : "")
					}, [a, t, w]);
					var C = function e(n)
						{
							var t = [n];
							return h.chats.forEach(function(r)
							{
								n === r.replyDepth && "reply" === r.type && (t = [].concat((0, et.Z)(t), (0, et.Z)(e(r.replyNo))))
							}), t
						},
						v = function()
						{
							var e = [],
								n = !1,
								r = !1,
								o = C(t.replyNo);
							return h.chats.forEach(function(i)
							{
								if(r = o.filter(function(e)
									{
										return e === i.replyDepth
									})
									.length > 0, t === i || r) n = !0;
								else if(n && t.isFirst)
								{
									var c = e0(
									{}, i);
									c.isFirst = !0, e.push(c), n = !1
								}
								else e.push(i)
							}), e
						},
						k = function()
						{
							var e, n = [],
								r = !1;
							"delete" === a ? "reply" === t.type ? n = v() : h.chats.forEach(function(o)
							{
								e = e0(
								{}, o), r ? (r = !1, e.isFirst = !0, n.push(e)) : o !== t ? n.push(e) : r = !0
							}) : "edit" === a ? h.chats.forEach(function(r)
							{
								e = e0(
								{}, r), r === t && (e.content = j), n.push(e)
							}) : "time" === a ? h.chats.forEach(function(r)
							{
								e = e0(
								{}, r), r === t && (e.time = j), n.push(e)
							}) : "add" === a && ("reply" === x ? h.chats.forEach(function(o)
							{
								e = e0(
								{}, o), o === t ? (n.push(e0(
								{}, e)), e.type = x, e.replyNo = h.replyNo, e.replyGroup = h.replyGroup, e.replyDepth = h.sReplyNo, e.sCharacter = d.I, e.content = j, e.isFirst = !0, s((0, eo.gW)(
								{
									sReplyNo: h.sReplyNo,
									replyNo: h.replyNo + 1,
									replyGroup: h.replyGroup + 1
								})), r = !0) : r && (e.isFirst = !0, r = !1), n.push(e)
							}) : h.chats.forEach(function(o)
							{
								e = e0(
								{}, o), o === t ? (n.push(e0(
								{}, o)), e.type = x, e.replyNo = 0, e.replyGroup = 0, e.replyDepth = h.sReplyNo, e.sCharacter = "info" === x ? d.I : p, e.content = j, e.isFirst = !0, r = !0) : r && (e.isFirst = !0, r = !1), n.push(e)
							})), s((0, eo.U_)(n)), S()
						},
						Z = (0, r.useCallback)(function(e, n)
						{
							var r, i = [],
								c = !1;
							"edit" === a ? h.chats.forEach(function(e)
							{
								r = e0(
								{}, e), e === t && (r.file = n), i.push(r)
							}) : h.chats.forEach(function(o)
							{
								r = e0(
								{}, o), o === t ? (i.push(e0(
								{}, r)), r.type = e, r.replyNo = 0, r.replyGroup = 0, r.replyDepth = h.sReplyNo, r.sCharacter = p, r.content = "", r.isFirst = !0, r.file = n, c = !0) : c && (r.isFirst = !0, c = !1), i.push(r)
							}), s((0, eo.U_)(i)), o(!1, null, "delete"), w("")
						}, [a, h, t, s, p, o]),
						N = function()
						{
							s((0, er.Y2)(
							{
								isAlert: !0,
								title: F.Z.error[f],
								ment: F.Z.no_support[f]
							}))
						},
						S = function()
						{
							o(!1, null, "delete"), w("")
						},
						P = (0, r.useCallback)(function()
						{
							var e = !0;
							return "delete" !== a && "time" !== a ? "heart" !== x ? j.length > 0 && (e = !1) : "add" === a && "heart" === x && 0 !== p.no && (e = !1) : e = !1, e
						}, [a, x, j, p]),
						I = (0, r.useCallback)(function()
						{
							var e = "";
							return "add" !== a ? ("info" !== t.type && (e = (0, u.fY)(t.sCharacter.no, !0, f)), "heart" === t.type ? e += F.Z.go_relationship_event[f] : "image" === t.type ? "edit" === a ? e += " : " + F.Z.add_image[f] : e += " : " + F.Z.image[f] : "time" === a ? e += " : " + F.Z.time_comment[f] : "chat" === t.type ? e += " : " + t.content : e += t.content) : "chat" === x ? e = (0, u.fY)(p.no, !0, f) + " : " + F.Z.input_comment[f] : "image" === x ? e = (0, u.fY)(p.no, !0, f) + " : " + F.Z.add_image[f] : "reply" === x ? e = "Sensei : " + F.Z.input_comment[f] : "heart" === x ? e = 0 === p.no ? F.Z.select_char[f] : (0, u.fY)(p.no, !0, f) + F.Z.go_relationship_event[f] : "info" === x && (e = F.Z.input_comment[f]), e
						}, [a, x, f, t, p]);
					return (0, m.jsx)(ea.Xf,
					{
						className: n ? "visible medium" : "medium",
						onDoubleClick: function()
						{
							S()
						},
						children: (0, m.jsxs)(ea.F0,
						{
							onDoubleClick: function(e)
							{
								return e.stopPropagation(), !1
							},
							children: [(0, m.jsxs)(ea.h4,
							{
								children: [(0, m.jsx)(ea.Dx,
								{
									className: "bold",
									children: F.Z[t.type][f]
								}), (0, m.jsx)(ea.ec,
								{
									onClick: function()
									{
										S()
									},
									children: (0, m.jsx)(c.j4,
									{})
								})]
							}), (0, m.jsxs)(ea.$0,
							{
								children: [(0, m.jsx)(e2,
								{
									style:
									{
										justifyContent: "space-between"
									},
									children: L.ze.map(function(e, n)
									{
										return (0, m.jsx)(c.Bx,
										{
											style:
											{
												width: "23%"
											},
											className: a === e ? "selected medium" : "medium",
											onClick: function()
											{
												l(e)
											},
											/*///取消隐藏
											disabled: "edit" === e && "heart" === t.type || "add" === e && "reply" === t.type || "time" === e && "chat" !== t.type,
											*/
											children: F.Z[e][f]
										}, n)
									})
								}), (0, m.jsx)(e2,
								{
									style:
									{
										justifyContent: "space-around",
										fontSize: "1rem"
									},
									children: L.PN.map(function(e, n)
									{
										return (0, m.jsxs)(c.Jg,
										{
											htmlFor: e,
											children: [(0, m.jsx)("input",
											{
												type: "checkbox",
												id: e,
												checked: t.type === e && "add" !== a || "add" === a && x === e,
												onChange: function(n)
												{
													w(""), y(e)
												},
												disabled: "add" !== a,
												value: e
											}), F.Z[e][f]]
										}, n)
									})
								}), (0, m.jsxs)(c.OP,
								{
									children: [(0, m.jsx)("input",
									{
										type: "file",
										ref: _,
										style:
										{
											display: "none"
										},
										accept: "image/*",
										onChange: function(e)
										{
											(0, u.T6)(e, function(e)
											{
												Z("image", e)
											}, N)
										}
									}), (0, m.jsx)(c.Kx,
									{
										className: "medium",
										placeholder: I(),
										maxRows: 5,
										readOnly: function()
										{
											if("delete" === a) return !0;
											if("edit" === a)
											{
												if("image" === t.type) return !0
											}
											else if("heart" === x || "image" === x) return !0;
											return !1
										}(),
										value: j,
										onClick: function(e)
										{
											var n;
											if("edit" === a)x = t.type;//@修复BUG
											("image" === t.type && "edit" === a || "image" === x) && (null === (n = _.current) || void 0 === n || n.click())
										},
										onChange: function(e)
										{
											w(e.currentTarget.value)
										}
									})]
								}), (0, m.jsxs)(ea.$_,
								{
									children: [(0, m.jsx)(ea.Lw,
									{
										className: "bold",
										onClick: function()
										{
											S()
										},
										children: F.Z.cancel[f]
									}), (0, m.jsx)(ea.AZ,
									{
										className: "bold",
										disabled: P(),
										onClick: function()
										{
											k()
										},
										children: F.Z.confirm[f]
									})]
								})]
							})]
						})
					})
				},
				e2 = o.ZP.div.withConfig(
				{
					displayName: "PopupChatChange__Wrapper",
					componentId: "sc-11i0qdg-0"
				})(["", " height:auto;padding-bottom:1rem;"], function(e)
				{
					return e.theme.common.flexBox(
					{})
				}),
				e5 = function(e)
				{
					var n = e.character,
						t = (0, i.C)(function(e)
						{
							return e.global.lang
						});
					return (0, m.jsxs)(e3,
					{
						children: [(0, m.jsxs)(e4,
						{
							style:
							{
								alignItems: "center"
							},
							children: [(0, m.jsx)(e7,
							{}), (0, m.jsx)("span",
							{
								className: "bold",
								children: F.Z.relationship_event[t]
							})]
						}), (0, m.jsx)(eN.HR,
						{}), (0, m.jsx)(eN._x,
						{
							className: "medium",
							children: n + F.Z.go_relationship_event[t]
						})]
					})
				},
				e3 = o.ZP.div.withConfig(
				{
					displayName: "HeartBox__Container",
					componentId: "sc-cwriov-0"
				})(["", ";padding:0.5rem;font-size:1.1rem;height:auto;border:1px solid ", ";border-radius:1rem;color:", ";background-color:", ";background-image:url('MoeTalk/UI/Favor_Schedule_Deco.webp');background-repeat:no-repeat;background-position:right;background-size:auto 100%;line-height:1.5rem;"], function(e)
				//#心形背景
				{
					return e.theme.common.flexBox(
					{
						direction: "column",
						align: "flex-start"
					})
				}, function(e)
				{
					return e.theme.color.rgb221_210_216
				}, function(e)
				{
					return e.theme.color.rgb76_91_111
				}, function(e)
				{
					return e.theme.color.rgb252_238_240
				}),
				e4 = o.ZP.div.withConfig(
				{
					displayName: "HeartBox__Flex",
					componentId: "sc-cwriov-1"
				})(["", ";height:auto;"], function(e)
				{
					return e.theme.common.flexBox(
					{
						justify: "flex-start"
					})
				}),
				e7 = o.ZP.div.withConfig(
				{
					displayName: "HeartBox__Border",
					componentId: "sc-cwriov-2"
				})(["border-left:2px solid ", ";height:1.1rem;margin-right:0.3rem;"], function(e)
				{
					return e.theme.color.rgb252_142_155
				}),
				e9 = function(e)
				{
					var n = e.chat,
						t = (0, i.T)(),
						o = (0, i.C)(function(e)
						{
							return e.global.isScreenshot
						}),
						a = (0, r.useState)(!1),
						l = a[0],
						s = a[1],
						u = (0, r.useState)("delete"),
						d = u[0],
						h = u[1],
						f = function(e, n, t)
						{
							s(e)
						};
					return (0, m.jsxs)(e6,
					{
						children: [o || (0, m.jsx)(e8,
						{
							"data-html2canvas-ignore": "true",
							onClick: function()
							{
								f(!0, null, "delete")
							},
							children: (0, m.jsx)(c.xL,
							{
								icon: ei.Yai
							})
						}), (0, m.jsx)(eN.g4,
						{
							onClick: function()
							{
								t((0, eo.Z8)(n.replyNo))
							},
							children: (0, m.jsx)(ne,
							{
								className: "medium",
								children: n.content
							})
						}), (0, m.jsx)(e1,
						{
							show: l,
							selectChat: n,
							handleShow: f,
							sChatModeType: d,
							setSChatModeType: function(e)
							{
								h(e)
							}
						})]
					})
				},
				e6 = o.ZP.div.withConfig(
				{
					displayName: "ReplyButtonBox__Container",
					componentId: "sc-15gyqnr-0"
				})(["", ";margin-bottom:0.5rem;height:auto;"], function(e)
				{
					return e.theme.common.flexBox(
					{})
				}),
				e8 = (0, o.ZP)(c.hU)
				.withConfig(
				{
					displayName: "ReplyButtonBox__EditButton",
					componentId: "sc-15gyqnr-1"
				})(["padding:0rem 0.5rem;color:", ";height:1.2rem;"], function(e)
				{
					return e.theme.color.rgb45_70_100
				}),
				ne = o.ZP.span.withConfig(
				{
					displayName: "ReplyButtonBox__Span",
					componentId: "sc-15gyqnr-2"
				})(["overflow:hidden;word-break:break-all;word-wrap:break-word;white-space:pre-wrap;line-break:loose;"]),
				nn = function(e)
				{
					var n = e.chat,
						t = (0, i.C)(function(e)
						{
							return e.makeChat.chats
						}),
						o = (0, i.C)(function(e)
						{
							return e.global.lang
						}),
						a = (0, i.C)(function(e)
						{
							return e.global.isScreenshot
						}),
						s = (0, r.useState)(!1),
						u = s[0],
						d = s[1],
						h = function(e)
						{
							d(e)
						};
					return (0, m.jsxs)(nt,
					{
						children: [(0, m.jsxs)(nr,
						{
							style:
							{
								alignItems: "center"
							},
							children: [(0, m.jsx)(ni,
							{}), (0, m.jsx)("span",
							{
								className: "bold",
								children: F.Z.go_reply[o]
							})]
						}), (0, m.jsx)(eN.HR,
						{}), (0, m.jsx)(nr,
						{
							style:
							{
								flexDirection: "column"
							},
							children: t.map(function(e, t)
							{
								return n.replyGroup === e.replyGroup && (0, m.jsx)(e9,
								{
									chat: e
								}, t)
							})
						}), a || (0, m.jsx)(no,
						{
							"data-html2canvas-ignore": "true",
							onClick: function()
							{
								h(!0)
							},
							children: (0, m.jsx)(c.xL,
							{
								icon: l.r8p
							})
						}), (0, m.jsx)(es,
						{
							show: u,
							handleShow: h,
							isFirst: !1,
							sReply: n
						})]
					})
				},
				nt = o.ZP.div.withConfig(
				{
					displayName: "ReplyBox__Container",
					componentId: "sc-dwjyi3-0"
				})(["", ";height:auto;padding:0.5rem;font-size:1.1rem;border:1px solid ", ";border-radius:1rem;color:", ";background-color:", ";background-image:url('MoeTalk/UI/Popup_Img_Deco_2.webp');background-repeat:no-repeat;background-position:right top;background-size:auto 10rem;line-height:1.5rem;"], function(e)
				//#背景
				{
					return e.theme.common.flexBox(
					{
						direction: "column"
					})
				}, function(e)
				{
					return e.theme.color.rgb221_210_216
				}, function(e)
				{
					return e.theme.color.rgb76_91_111
				}, function(e)
				{
					return e.theme.color.rgb225_237_240
				}),
				nr = o.ZP.div.withConfig(
				{
					displayName: "ReplyBox__Flex",
					componentId: "sc-dwjyi3-1"
				})(["", ";height:auto;"], function(e)
				{
					return e.theme.common.flexBox(
					{
						justify: "flex-start"
					})
				}),
				no = (0, o.ZP)(c.hU)
				.withConfig(
				{
					displayName: "ReplyBox__PlusButton",
					componentId: "sc-dwjyi3-2"
				})(["margin:0;padding-left:0.05rem;align-self:center;border:2px solid ", ";border-radius:50%;height:1.5rem;width:1.5rem;font-size:1rem;color:", ";&:hover{background-color:", ";}"], function(e)
				{
					return e.theme.color.rgb76_91_111
				}, function(e)
				{
					return e.theme.color.rgb76_91_111
				}, function(e)
				{
					return e.theme.color.rgb202_215_221
				}),
				ni = o.ZP.div.withConfig(
				{
					displayName: "ReplyBox__Line",
					componentId: "sc-dwjyi3-3"
				})(["border-left:2px solid ", ";height:1.1rem;margin-right:0.3rem;"], function(e)
				{
					return e.theme.color.rgb39_153_228
				}),
				nc = function(e)
				{
					var n = e.chat,
						t = e.index,
						o = e.handleShow,
						a = (0, i.T)(),
						l = (0, i.C)(function(e)
						{
							return e.makeChat.chats
						}),
						s = (0, i.C)(function(e)
						{
							return e.makeChat.sReplyGroup
						}),
						d = (0, i.C)(function(e)
						{
							return e.global.lang
						}),
						h = (0, i.C)(function(e)
						{
							return e.global.isScreenshot
						}),
						f = (0, r.useRef)(null);
					(0, r.useEffect)(function()
					{
						if(n.replyGroup === s)
						{
							var e;
							null === (e = f.current) || void 0 === e || e.scrollIntoView(!0), a((0, eo.ZZ)(-1))
						}
					}, [s, n, a]);
					var p = function()
					{
						if(0 !== t)
						{
							var e = l[t],
								r = l[t - 1];
							if("heart" !== r.type && (0, u.Y)(e.sCharacter, r.sCharacter) && e.replyDepth === r.replyDepth)
							{
								var o = [];
								l.forEach(function(e)
								{
									n === e ? o.push(
									{
										file: e.file,//@大概原作者忘加了
										type: e.type,
										replyNo: e.replyNo,
										replyDepth: e.replyDepth,
										replyGroup: e.replyGroup,
										sCharacter: e.sCharacter,
										content: e.content,
										isFirst: !e.isFirst
									}) : o.push(e)
								}), a((0, eo.U_)(o))
							}
						}
					};
					return (0, m.jsx)(eN.uU,
					{
						ref: f,
						style: n.isFirst ?
						{} :
						{
							padding: "0.5rem 1rem 0 1rem"
						},
						children: 0 === n.sCharacter.no || "heart" === n.type ? (0, m.jsxs)(m.Fragment,
						{
							children: ["info" === n.type || (0, m.jsx)(eN.xu,
							{
								style:
								{
									marginRight: "chat" === n.type || "image" === n.type ? "1.5rem" : "0"
								}
							}), (0, m.jsxs)(na,
							{
								children: ["reply" === n.type || h || (0, m.jsx)(nl,
								{
									"data-html2canvas-ignore": "true",
									onClick: function()
									{
										o(!0, n, "delete")
									},
									children: (0, m.jsx)(c.xL,
									{
										icon: ei.Yai
									})
								}), "chat" === n.type ? (0, m.jsxs)(m.Fragment,
								{
									children: [n.time && (0, m.jsx)(eN.i9,
									{
										style:
										{
											marginLeft: 0
										},
										children: n.time
									}), (0, m.jsx)(eN.LP,
									{
										onClick: function()
										{
											o(!0, n, "edit")
										},
										children: n.content///右侧对话
									}), (0, m.jsx)(eN.CJ,
									{})]
								}) : "image" === n.type ? (0, m.jsx)(eN.tG,
								{
									onClick: function()
									{
										o(!0, n, "edit")
									},
									src: n.file || (n.content.match("emoticon") ? n.content.replace(/^\//, "") : "" + n.content)//#
								}) : "info" === n.type ? (0, m.jsx)(eN.vD,
								{
									children: n.content///旁白
								}) : "reply" === n.type ? (0, m.jsx)(nn,
								{
									chat: n
								}) : "heart" === n.type ? (0, m.jsx)(e5,
								{
									character: (0, u.fY)(n.sCharacter.no, !0, d)
								}) : (0, m.jsx)(m.Fragment,
								{})]
							})]
						}) : (0, m.jsxs)(m.Fragment,
						{
							children: [(0, m.jsx)(eN.xu,
							{
								onClick: function()
								{
									p()
								},
								style:
								{
									cursor: "pointer"
								},
								children: (0, m.jsx)(eN.NZ,
								{
									style:
									{
										display: n.isFirst ? "block" : "none"
									},
									height: 252,
									width: 252,
									src: loadhead(n.sCharacter.no+'.'+n.sCharacter.index),//#聊天记录头像
									onError: function(e)
									{
										var n = e.currentTarget;
										(0, u.Mp)(n, "character")
									},
									alt: "profile"
								})
							}), (0, m.jsxs)(eN.Xp,
							{
								children: [(0, m.jsx)("span",
								{
									className: "bold",
									style: n.isFirst ?
									{
										height: "1.8rem",
										lineHeight: "1.5rem"
									} :
									{
										display: "none"
									},
									children: n.content.split('#')[1] ? n.content.split('#')[1] : (n.sCharacter.no > 999 ? loadname(n.sCharacter.no) : (0, u.fY)(n.sCharacter.no, !0, d))//#新增临时名称
								}), (0, m.jsxs)("div",
								{
									style:
									{
										display: "flex"
									},
									children: ["chat" === n.type ? n.isFirst ? (0, m.jsxs)(m.Fragment,
									{
										children: [(0, m.jsx)(eN.zC,
										{
											style:isJSON(n.content.split('#')[2]) ? JSON.parse(n.content.split('#')[2]) : null,//@设置文字样式(#带头像)
											onClick: function()
											{
												o(!0, n, "edit")
											},
											children: n.content.split('#')[0]///对话
										}), n.time && (0, m.jsx)(eN.i9,
										{
											style:
											{
												marginRight: 0
											},
											children: n.time
										})]
									}) : (0, m.jsxs)(m.Fragment,
									{
										children: [(0, m.jsx)(eN.Dt,
										{
											style:isJSON(n.content.split('#')[2]) ? JSON.parse(n.content.split('#')[2]) : null,//@设置文字样式(#无头像)
											onClick: function()
											{
												o(!0, n, "edit")
											},
											children: n.content.split('#')[0]//#无头像对话
										}), n.time && (0, m.jsx)(eN.i9,
										{
											style:
											{
												marginRight: 0
											},
											children: n.time
										})]
									}) : (0, m.jsx)(eN.tG,
									{
										onClick: function()
										{
											o(!0, n, "edit")
										},
										src: n.file || (n.content.match("emoticon") ? n.content.replace(/^\//, "") : "" + n.content)//#
									}), h || (0, m.jsx)(nl,
									{
										"data-html2canvas-ignore": "true",
										onClick: function()
										{
											o(!0, n, "delete")
										},
										children: (0, m.jsx)(c.xL,
										{
											icon: ei.Yai
										})
									})]
								})]
							})]
						})
					})
				},
				na = o.ZP.div.withConfig(
				{
					displayName: "Chat__Flex",
					componentId: "sc-5hhx0-0"
				})(["", ";height:auto;"], function(e)
				{
					return e.theme.common.flexBox(
					{
						justify: "flex-end",
						align: "flex-start"
					})
				}),
				nl = (0, o.ZP)(c.hU)
				.withConfig(
				{
					displayName: "Chat__EditButton",
					componentId: "sc-5hhx0-1"
				})(["align-self:end;margin:0rem 0.5rem;color:", ";height:1.2rem;width:1.2rem;flex-shrink:0;"], function(e)
				{
					return e.theme.color.rgb45_70_100
				}),
				ns = function(e)
				{
					var n = e.scrollRef,
						t = (0, i.C)(function(e)
						{
							return e.makeChat.chats
						}),
						o = (0, i.C)(function(e)
						{
							return e.makeChat.sReplyNo
						}),
						a = (0, i.T)(),
						l = (0, r.useState)(!1),
						s = l[0],
						u = l[1],
						h = (0, r.useState)("delete"),
						f = h[0],
						p = h[1],
						g = (0, r.useState)(!1),
						x = g[0],
						y = g[1];
					(0, r.useEffect)(function()
					{
						u(0 !== o)
					}, [o]);
					var b = (0, r.useState)(
						{
							type: "chat",
							isFirst: !0,
							replyNo: 0,
							replyDepth: 0,
							replyGroup: 0,
							sCharacter: d.I,
							content: ""
						}),
						j = b[0],
						w = b[1],
						_ = function(e, n, t)
						{
							p(t), y(e), null !== n && w(n)
						},
						C = function(e)
						{
							var n = 0,
								r = 0;
							t.forEach(function(e)
							{
								e.replyNo === o && (n = e.replyDepth, r = e.replyGroup)
							}), -1 === e ? a((0, eo.Z8)(n)) : a((0, eo.Z8)(0)), a((0, eo.ZZ)(r))
						};
					return (0, m.jsxs)("div",
					{
						style:
						{
							display: "flex",
							flexDirection: "column",
							width: "100%",
							height: "100%"
						},
						children: [(0, m.jsxs)(nh,
						{
							style:
							{
								display: s ? "flex" : "none"
							},
							children: [(0, m.jsx)(nm,
							{
								onClick: function()
								{
									C(-1)
								},
								children: (0, m.jsx)(c.xL,
								{
									icon: ei.O24
								})
							}), t.map(function(e, n)
							{
								return e.replyNo === o && 0 !== e.replyNo && (0, m.jsxs)(nf,
								{
									className: "bold",
									children: ["Re: ", e.content]
								}, n)
							}), (0, m.jsx)(nm,
							{
								onClick: function()
								{
									C(0)
								},
								children: (0, m.jsx)(c.xL,
								{
									icon: ei.WA2
								})
							})]
						}), (0, m.jsx)(nu,
						{
							children: (0, m.jsx)(nd,
							{
								ref: n,
								children: t.map(function(e, n)
								{
									return e.replyDepth === o && !("reply" === e.type && !1 === e.isFirst) && (0, m.jsx)(nc,
									{
										index: n,
										handleShow: _,
										chat: e
									}, n)
								})
							})
						}), (0, m.jsx)(e1,
						{
							show: x,
							handleShow: _,
							selectChat: j,
							sChatModeType: f,
							setSChatModeType: function(e)
							{
								p(e)
							}
						})]
					})
				},
				nu = o.ZP.div.withConfig(
				{
					displayName: "Talk__Container",
					componentId: "sc-1uzn66i-0"
				})(["display:inline-block;height:100%;width:100%;background-color:", ";overflow-y:auto;overflow-y:overlay;overflow-x:hidden;position:relative;&::-webkit-scrollbar{display:inline-block;width:0.4rem;}&::-webkit-scrollbar-thumb{height:17%;background-color:", ";border-radius:1rem;}"], function(e)
				{
					return e.theme.color.rgb255_255_255
				}, function(e)
				{
					return e.theme.color.rgb210_210_210
				}),
				nd = o.ZP.div.withConfig(
				{
					displayName: "Talk__CContainer",
					componentId: "sc-1uzn66i-1"
				})(["", ";position:absolute;flex-direction:column;height:max-content;padding-bottom:1rem;background-color:", ";color:", ";"], function(e)
				{
					return e.theme.common.flexBox(
					{
						direction: "column"
					})
				}, function(e)
				{
					return e.theme.color.rgb255_255_255
				}, function(e)
				{
					return e.theme.color.rgb255_255_255
				}),
				nh = o.ZP.div.withConfig(
				{
					displayName: "Talk__Header",
					componentId: "sc-1uzn66i-2"
				})(["", ";background-color:", ";border-bottom:2px solid ", ";height:4rem;padding:0 1rem;"], function(e)
				{
					return e.theme.common.flexBox(
					{
						justify: "space-between"
					})
				}, function(e)
				{
					return e.theme.color.rgb243_247_248
				}, function(e)
				{
					return e.theme.color.rgb230_233_235
				}),
				nm = (0, o.ZP)(c.hU)
				.withConfig(
				{
					displayName: "Talk__BackButton",
					componentId: "sc-1uzn66i-3"
				})(["color:", ";width:2.5rem;"], function(e)
				{
					return e.theme.color.rgb45_70_100
				}),
				nf = o.ZP.span.withConfig(
				{
					displayName: "Talk__Span",
					componentId: "sc-1uzn66i-4"
				})(["margin:auto 1rem;overflow:hidden;word-break:break-all;white-space:pre-wrap;line-break:loose;"]),
				np = function()
				{
					var e = (0, i.C)(function(e)
						{
							return e.global.lang
						}),
						n = (0, i.C)(function(e)
						{
							return e.makeChat.chats
						}),
						t = (0, r.useRef)(null);
					return (0, m.jsxs)(ng,
					{
						children: [(0, m.jsx)(nx,
						{
							style:
							{
								display: n.length > 0 ? "none" : "flex"
							},
							children: (0, m.jsx)("span",
							{
								style:
								{
									fontSize: "1.1rem"
								},
								children: F.Z.select_char[e]
							})
						}), (0, m.jsx)(nx,
						{
							style:
							{
								display: n.length > 0 ? "flex" : "none"
							},
							children: (0, m.jsx)(ns,
							{
								scrollRef: t
							})
						}), (0, m.jsx)(eW,
						{
							scrollRef: t
						})]
					})
				},
				ng = o.ZP.div.withConfig(
				{
					displayName: "RightScreen__Container",
					componentId: "sc-1fwinj2-0"
				})(["", " flex-shrink:1;min-width:340px;@media screen and (max-width:768px){min-width:100vw;}"], function(e)
				{
					return e.theme.common.flexBox(
					{
						direction: "column"
					})
				}),
				nx = o.ZP.div.withConfig(
				{
					displayName: "RightScreen__Box",
					componentId: "sc-1fwinj2-1"
				})(["", " background-color:", ";color:", ";"], function(e)
				{
					return e.theme.common.flexBox(
					{
						direction: "column"
					})
				}, function(e)
				{
					return e.theme.color.rgb255_255_255
				}, function(e)
				{
					return e.theme.color.rgb111_119_127
				}),
				ny = t(9008),
				nb = t.n(ny),
				nj = t(5615),
				nw = function()
				{
					return (0, m.jsxs)(n_,
					{
						children: [(0, m.jsxs)(nb(),
						{
							children: [(0, m.jsx)("title",
							{
								children: localStorage['MoeTalk']//#自定义标题
							}), (0, m.jsx)("meta",
							{
								name: "description",
								content: "MolluTalk is a Blue Archive Fandom Site. (몰루톡/モルトーク)"
							}), (0, m.jsx)("meta",
							{
								name: "keywords",
								content: "몰루톡, MolluTalk, モルトーク"
							}), (0, m.jsx)("meta",
							{
								property: "og:title",
								content: "MolluTalk"
							}), (0, m.jsx)("meta",
							{
								property: "og:image",
								content: "https://mollutalk.com/ogImage.png"
							}), (0, m.jsx)("meta",
							{
								property: "og:site_name",
								content: "Make"
							}), (0, m.jsx)("meta",
							{
								property: "og:description",
								content: "MolluTalk is a Blue Archive Fandom Site. (몰루톡/モルトーク)"
							}), (0, m.jsx)("meta",
							{
								name: "twitter:title",
								content: "MolluTalk"
							}), (0, m.jsx)("meta",
							{
								name: "twitter:description",
								content: "MolluTalk is a Blue Archive Fandom Site. (몰루톡/モルトーク)"
							}), (0, m.jsx)("meta",
							{
								name: "twitter:image",
								content: "https://mollutalk.com/ogImage.png"
							}), (0, m.jsx)("meta",
							{
								name: "twitter:card",
								content: "summary_large_image"
							})]
						}), (0, m.jsx)(nj.Z,
						{
							childrens: [(0, m.jsx)(Q,
							{}, 0), (0, m.jsx)(np,
							{}, 1)]
						}), (0, m.jsx)(f,
						{})]
					})
				},
				n_ = o.ZP.div.withConfig(
				{
					displayName: "pages__Container",
					componentId: "sc-ll9qpl-0"
				})(["", ""], function(e)
				{
					return e.theme.common.flexBox(
					{
						direction: "column"
					})
				})
		},
		83: function(e, n, t)
		{
			"use strict";
			t.d(n,
			{
				CJ: function()
				{
					return h
				},
				Dt: function()
				{
					return u
				},
				HR: function()
				{
					return p
				},
				LP: function()
				{
					return d
				},
				NZ: function()
				{
					return b
				},
				Xp: function()
				{
					return a
				},
				YJ: function()
				{
					return y
				},
				_x: function()
				{
					return f
				},
				g4: function()
				{
					return g
				},
				i9: function()
				{
					return x
				},
				tG: function()
				{
					return l
				},
				uU: function()
				{
					return i
				},
				vD: function()
				{
					return m
				},
				xu: function()
				{
					return c
				},
				zC: function()
				{
					return s
				}
			});
			var r = t(9521),
				o = t(1563),
				i = r.ZP.div.withConfig(
				{
					displayName: "talk__ChatContainer",
					componentId: "sc-eq7cqw-0"
				})(["", ";padding:1rem 1rem 0 1rem;font-size:1.1rem;height:auto;"], function(e)
				{
					return e.theme.common.flexBox(
					{
						align: "stretch"
					})
				}),
				c = r.ZP.div.withConfig(
				{
					displayName: "talk__Box",
					componentId: "sc-eq7cqw-1"
				})(["display:flex;width:6rem;"]),
				a = r.ZP.div.withConfig(
				{
					displayName: "talk__ChatWrapper",
					componentId: "sc-eq7cqw-2"
				})(["", ";height:auto;font-size:1.2rem;color:", ";"], function(e)
				{
					return e.theme.common.flexBox(
					{
						direction: "column",
						align: "flex-start"
					})
				}, function(e)
				{
					return e.theme.color.rgb34_37_41
				}),
				l = r.ZP.img.withConfig(
				{
					displayName: "talk__ImgBox",
					componentId: "sc-eq7cqw-3"
				})(["max-width:"+localStorage['mt-size']+";border:2px solid ", ";background-color:transparent;padding:0.5rem;border-radius:10px;"], function(e)
				//#仿ClosureTalk把90%改成40%，可以考虑自定义
				{
					return e.theme.color.rgb230_233_235
				}),
				s = r.ZP.span.withConfig(
				{
					displayName: "talk__TextBox",
					componentId: "sc-eq7cqw-4"
				})(["user-select:text;position:relative;color:white;width:fit-content;border-radius:10px;background:", ";border:1px solid ", ";white-space:pre-wrap;overflow-wrap:break-word;word-break:break-all;word-wrap:break-all;line-break:loose;font-size:1.2rem;padding:0.6rem;line-height:141%;::after{content:'';position:absolute;left:-0.5rem;top:0.6rem;border-top:0.3rem solid transparent;border-right:0.5rem solid ", ";border-bottom:0.3rem solid transparent;}"], function(e)
				//#1.7rem;改为141%
				{
					return e.theme.color.rgb76_91_111
				}, function(e)
				{
					return e.theme.color.rgb76_91_111
				}, function(e)
				{
					return e.theme.color.rgb76_91_111
				}),
				u = (0, r.ZP)(s)
				.withConfig(
				{
					displayName: "talk__NTextBox",
					componentId: "sc-eq7cqw-5"
				})(["::after{content:none;}"]),
				d = (0, r.ZP)(s)
				.withConfig(
				{
					displayName: "talk__STextBox",
					componentId: "sc-eq7cqw-6"
				})(["background:", ";border:1px solid ", ";::after{content:none;}"], function(e)
				{
					return e.theme.color.rgb74_138_202
				}, function(e)
				{
					return e.theme.color.rgb74_138_202
				}),
				h = r.ZP.div.withConfig(
				{
					displayName: "talk__Triangle",
					componentId: "sc-eq7cqw-7"
				})(["position:relative;::after{content:'';position:absolute;left:0;top:0.6rem;height:0;border-top:0.3rem solid transparent;border-bottom:0.3rem solid transparent;border-left:0.5rem solid ", ";}"], function(e)
				{
					return e.theme.color.rgb74_138_202
				}),
				m = r.ZP.span.withConfig(
				{
					displayName: "talk__InfoBox",
					componentId: "sc-eq7cqw-8"
				})(["user-select:text;position:relative;color:", ";width:100%;border-radius:10px;background:", ";text-align:center;white-space:pre-wrap;overflow-wrap:break-word;word-break:break-all;word-wrap:break-all;line-break:loose;font-size:1rem;padding:0.2rem 1rem;line-height:1.5rem;"], function(e)
				{
					return e.theme.color.rgb69_78_89
				}, function(e)
				{
					return e.theme.color.rgb220_229_232
				}),
				f = (0, r.ZP)(o.Mm)
				.withConfig(
				{
					displayName: "talk__HeartButton",
					componentId: "sc-eq7cqw-9"
				})(["padding:0.5rem;height:max-content;color:white;background-color:", ";border-radius:0.5rem;border:none;border-bottom:0.1rem solid ", ";box-shadow:0rem 0.05rem 0.2rem ", ";line-height:1.5rem;&:hover{background-color:", ";}"], function(e)
				{
					return e.theme.color.rgb252_135_155
				}, function(e)
				{
					return e.theme.color.rgb169_136_136
				}, function(e)
				{
					return e.theme.color.rgb215_165_165
				}, function(e)
				{
					return e.theme.color.rgb223_109_128
				}),
				p = r.ZP.hr.withConfig(
				{
					displayName: "talk__HR",
					componentId: "sc-eq7cqw-10"
				})(["border:0;height:1px;background:", ";width:100%;"], function(e)
				{
					return e.theme.color.rgb218_225_229
				}),
				g = (0, r.ZP)(o.Mm)
				.withConfig(
				{
					displayName: "talk__ReplyButton",
					componentId: "sc-eq7cqw-11"
				})(["text-align:center;height:100%;width:100%;padding:0.7rem 0.5rem;border:none;border-bottom:0.1rem solid ", ";box-shadow:0rem 0.05rem 0.2rem ", ";border-radius:0.5rem;line-height:1.5rem;"], function(e)
				{
					return e.theme.color.rgb174_174_174
				}, function(e)
				{
					return e.theme.color.rgb180_188_192
				}),
				x = r.ZP.span.withConfig(
				{
					displayName: "talk__TimeSpan",
					componentId: "sc-eq7cqw-12"
				})(["color :", ";font-size :0.9rem;margin:auto 0.5rem 0 0.5rem;flex-shrink:0;"], function(e)
				{
					return e.theme.color.rgb69_78_89
				}),
				y = (0, r.ZP)(o.xL)
				.withConfig(
				{
					displayName: "talk__CheckedIcon",
					componentId: "sc-eq7cqw-13"
				})(["width:1.1rem;height:1.1rem;margin-right:0.5rem;"]),
				b = r.ZP.img.withConfig(
				{
					displayName: "talk__Profile",
					componentId: "sc-eq7cqw-14"
				})(["box-sizing:border-box;margin:0rem;width:4rem;height:4rem;object-fit:cover;border-radius:50%;"])//#contain改为cover
		},
		8312: function(e, n, t)
		{
			(window.__NEXT_P = window.__NEXT_P || [])
			.push(["/", function()
			{
				return t(583)
			}])
		}
	},
	function(e)
	{
		e.O(0, [443, 288, 876, 774, 888, 179], function()
		{
			return e(e.s = 8312)
		}), _N_E = e.O()
	}
]);