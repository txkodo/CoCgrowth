import { Log, RollLevel } from './decoder';

// TODO: GMが振った技能の反映方法を考える

export const statusKeys = new Set([
  'SAN値チェック',
  'アイデア',
  '幸運',
  '知識',
  'STR',
  'CON',
  'POW',
  'DEX',
  'APP',
  'SIZ',
  'INT',
  'EDU',
]);

const initialValue: { [key in string]?: number } = {
  回避: 25,
  '近接戦闘(斧)': 15,
  '近接戦闘(格闘)': 25,
  '近接戦闘(絞殺ひも)': 15,
  '近接戦闘(チェンソー)': 10,
  '近接戦闘(刀剣)': 20,
  '近接戦闘(フレイル)': 10,
  '近接戦闘(むち)': 5,
  '近接戦闘(槍)': 20,
  投擲: 20,
  拳銃: 20,
  '射撃(火炎放射器)': 10,
  '射撃(拳銃)': 20,
  '射撃(サブマシンガン)': 15,
  '射撃(マシンガン)': 10,
  '射撃(ライフル/ショットガン)': 25,

  応急手当: 30,
  鍵開け: 1,
  手さばき: 10,
  聞き耳: 20,
  隠密: 20,
  精神分析: 1,
  追跡: 10,
  登攀: 20,
  図書館: 20,
  目星: 25,
  鑑定: 5,

  '運転*': 20,
  機械修理: 10,
  重機械操作: 1,
  乗馬: 5,
  水泳: 20,
  跳躍: 20,
  '製作*': 5,
  '操縦*': 1,
  電気修理: 10,
  ナビゲート: 10,
  変装: 5,

  言いくるめ: 5,
  信用: 0,
  説得: 10,
  '母国語*': 60,
  威圧: 15,
  魅惑: 15,
  '言語*': 1,

  医学: 1,
  オカルト: 5,
  クトゥルフ神話: 0,
  '芸術*': 1,
  経理: 5,
  考古学: 1,
  コンピューター: 5,
  '科学*': 1,
  心理学: 10,
  人類学: 1,
  電子工学: 1,
  自然: 10,
  法律: 5,
  歴史: 5,
  'サバイバル*': 10,
};

/** 技能名の表記ゆれを吸収 */
function normalizeSkillName(skillname: string) {
  skillname = skillname.replace(/ロール$/, '');
  skillname = skillname.replace('（', '(').replace('）', ')');
  return skillname;
}

/** ログを整理する */
export function sortLog(log: Log) {
  const unknown_skill_set = new Set<string>();
  const result: SortedLog = {
    unknown_skills: [],
    characters: {},
  };

  const getExecutor = (name: string) => {
    let executor = result.characters[name];
    if (!executor) {
      executor = {
        levels: {
          critical: {},
          extreme: {},
          hard: {},
          regular: {},
          failure: {},
          funble: {},
        },
        initial: {},
        other: [],
        system: [],
      };
      result.characters[name] = executor;
    }
    return executor;
  };

  log.logs.forEach((elem) => {
    // // executorが"system"の場合はスキップ
    // if (elem.executor === 'system') {
    //   return;
    // }

    const executor = getExecutor(elem.executor);

    // テキストチャットはotherに格納
    if (elem.type === 'text') {
      executor.other.push(elem.value);
      return;
    }

    // システムログはsystemに格納
    if (elem.type === 'system') {
      const executor = getExecutor(elem.value.target);
      executor.system.push({
        status: elem.value.status,
        before: elem.value.before,
        after: elem.value.after,
      });
      return;
    }

    // 技能名称の表記ゆれを吸収
    const skillName = normalizeSkillName(elem.value.skill);

    // 加算
    const totalCount = executor.levels[elem.value.level][skillName] ?? 0;
    executor.levels[elem.value.level][skillName] = totalCount + 1;

    // ステータス値のロールの場合は初期値成功チェックはしない
    if (statusKeys.has(skillName)) {
      return;
    }

    // 初期値成功かどうかチェック
    let initialExpect = initialValue[skillName];
    if (initialExpect === undefined) {
      const skill = skillName.replace(/\(.*\)/, '');
      initialExpect = initialValue[skill + '*'];
    }

    if (initialExpect === undefined) {
      unknown_skill_set.add(skillName);
    }

    const isInitial = elem.value.expect === initialExpect;
    const succeed =
      elem.value.level !== 'funble' && elem.value.level !== 'failure';

    if (isInitial && succeed) {
      // 加算
      const totalCount = executor.initial[skillName] ?? 0;
      executor.initial[skillName] = totalCount + 1;
    }
  });

  result.unknown_skills = Array.from(unknown_skill_set);

  // systemは最後に持ってくる
  if (result.characters.system !== undefined) {
    const sys = result.characters.system;
    delete result.characters.system;
    result.characters.system = sys;
  }

  return result;
}

export type ChalacterLog = {
  // 成功レベル別
  levels: {
    [level in RollLevel]: {
      [skill in string]: number;
    };
  };
  // 初期値成功
  initial: {
    [skill in string]: number;
  };
  other: string[];
  system: SystemLog[];
};

export type SystemLog = {
  status: string;
  before: number;
  after: number;
};

export type SortedLog = {
  unknown_skills: string[];
  characters: {
    [executor in string]: ChalacterLog;
  };
};
