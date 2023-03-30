import { HTMLElement, parse } from 'node-html-parser';

export type Log = {
  tabs: string[];
  executors: string[];
  logs: LogElem[];
};
export type LogElem = TextLogElem | SkillLogElem;

export type TextLogElem = {
  executor: string;
  tab: string;
  type: 'text';
  value: string;
};

export type SkillLogElem = {
  executor: string;
  tab: string;
  type: 'skill';
  value: Skill;
};

export type RollLevel =
  | 'funble'
  | 'failure'
  | 'regular'
  | 'hard'
  | 'extreme'
  | 'critical';

type Skill = {
  skill: string;
  expect: number;
  difficulty: RollLevel;
  bonus: number;
  results: number[];
  result: number;
  level: RollLevel;
};

export async function parseCcfoliaLog(log: File): Promise<Log> {
  const strdata = await log.text();
  const dom = parse(strdata);
  const htmlElems = dom.querySelectorAll('p');
  const logs: LogElem[] = [];
  const tabs = new Set<string>();
  const executors = new Set<string>();
  htmlElems.forEach((value) => {
    const logelem = parseLogElem(value);
    logs.push(logelem);
    tabs.add(logelem.tab);
    executors.add(logelem.executor);
  });
  return {
    tabs: Array.from(tabs),
    executors: Array.from(executors),
    logs,
  };
}

function parseLogElem(log: HTMLElement): LogElem {
  const [tabElem, executorElem, textElem] = log.querySelectorAll('span');
  const tabRegex = /^ \[(.*)\]$/;
  const tab = tabElem.textContent?.match(tabRegex)?.[1] ?? '';
  const executor = executorElem.textContent ?? '';

  const text = textElem.textContent.trim();
  if (!text) {
    throw new Error('missing span content');
  }

  const roll = parseSkillRoll(text);
  if (roll) {
    return {
      tab,
      executor,
      type: 'skill',
      value: roll,
    };
  }

  // 全パースに失敗したときのフォールバック
  return {
    tab,
    executor,
    type: 'text',
    value: text,
  };
}

function parseSkillRoll(roll: string): Skill | null {
  const textRegex =
    /CC(?:\(-?\d+\)|-?\d+)?<=(?<expect>\d+)(?<difficulty>r|h|e|c|)\s+【(?<skill>[^【】]*)】\s+\(1D100<=\d+\) ボーナス・ペナルティダイス\[(?<bonus>-?\d+)\] ＞ (?<results>\d+(?:, \d+)*) ＞ (?<result>\d+) ＞ (?<level>ファンブル|失敗|レギュラー成功|ハード成功|イクストリーム成功|クリティカル)/u;
  const groups = roll?.match(textRegex)?.groups;

  if (!groups) {
    return null;
  }
  // 技能値
  const expect = Number.parseInt(groups.expect);
  const skill = groups.skill;
  const bonus = Number.parseInt(groups.bonus);
  const results = groups.results.split(', ').map(Number.parseInt);
  const result = Number.parseInt(groups.result);
  // 危険
  const difficulty = {
    '': 'regular',
    r: 'regular',
    h: 'hard',
    e: 'extreme',
    c: 'critical',
  }[groups.difficulty] as RollLevel;
  // 危険
  const level = {
    ファンブル: 'funble',
    失敗: 'failure',
    レギュラー成功: 'regular',
    ハード成功: 'hard',
    イクストリーム成功: 'extreme',
    クリティカル: 'critical',
  }[groups.level] as RollLevel;

  return {
    skill,
    expect,
    difficulty,
    bonus,
    results,
    result,
    level,
  };
}
