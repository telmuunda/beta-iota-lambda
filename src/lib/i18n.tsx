import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Lang = 'en' | 'mn';

export const TOPICS = ['mechanics', 'oscillations', 'gravitation', 'electromagnetism', 'thermo', 'optics'] as const;
export type Topic = (typeof TOPICS)[number];

const strings = {
  en: {
    siteSub: 'olympiad physics, by students',
    notes: 'Notes',
    problems: 'Problems',
    lab: 'Lab',
    about: 'About',
    contents: 'Contents',
    preface: 'Preface',
    prefaceText:
      'This is a notebook we keep for each other. It collects the ideas that show up again and again in olympiad physics, the problems that taught us something, and small simulations for the moments when an equation is not enough. Everything here is written in both Mongolian and English, and anyone preparing for the olympiad is welcome to add to it.',
    weekly: 'Problem of the week',
    openProblem: 'Try it',
    inTheLab: 'In the lab',
    note: 'note',
    notesPl: 'notes',
    problem: 'problem',
    problemsPl: 'problems',
    nothingYet: 'nothing yet — write the first one',
    difficulty: 'Difficulty',
    topic: 'Topic',
    all: 'All',
    solved: 'solved',
    hint: 'Hint',
    solution: 'Solution',
    showHint: 'Show a hint',
    showSolution: 'Show the full solution',
    yourAnswer: 'Your answer',
    check: 'Check',
    correct: 'Correct. Well done.',
    close: 'Close — check your rounding or the value of g.',
    wrong: 'Not quite. Try again, or open the hint.',
    notNumber: 'Enter a number, e.g. 14.4 or 3.2e3',
    expected: 'in',
    seeAlso: 'See also',
    relatedProblems: 'Problems on this topic',
    relatedSim: 'Simulation',
    back: 'Back',
    fig: 'Fig.',
    play: 'Play',
    pause: 'Pause',
    reset: 'Reset',
    launch: 'Launch',
    source: 'Source',
    labIntro:
      'Each figure here is a live calculation. Change a parameter and watch what changes — and, just as useful, what does not.',
    notesIntro: 'Short, careful write-ups of one idea each. Read with a pencil.',
    problemsIntro:
      'Numeric answers are checked to within about 1%. Hints and full solutions are folded away — open them only after an honest attempt.',
    footer: 'Made by students, for students.',
    licence: 'Text CC BY-SA 4.0 · code MIT',
    writtenBy: 'Written by',
    contribute: 'Contribute',
    notFound: 'This page does not exist (yet).',
    goHome: 'Go to the contents',
    level: ['', 'warm-up', 'regional', 'national+'],
  },
  mn: {
    siteSub: 'олимпиадын физик, сурагчдаас сурагчдад',
    notes: 'Тэмдэглэл',
    problems: 'Бодлого',
    lab: 'Лаборатори',
    about: 'Тухай',
    contents: 'Агуулга',
    preface: 'Өмнөх үг',
    prefaceText:
      'Энэ бол бие биедээ зориулж хөтөлдөг тэмдэглэлийн дэвтэр юм. Олимпиадын физикт дахин дахин гардаг санаанууд, бидэнд ямар нэг зүйл заасан бодлогууд, тэгшитгэл хангалтгүй санагдах үед туслах жижиг симуляцуудыг энд цуглуулав. Бүх зүйл монгол, англи хоёр хэл дээр бичигдсэн бөгөөд олимпиадад бэлдэж буй хэн бүхэн нэмж хувь нэмрээ оруулж болно.',
    weekly: 'Долоо хоногийн бодлого',
    openProblem: 'Бодож үзэх',
    inTheLab: 'Лабораторид',
    note: 'тэмдэглэл',
    notesPl: 'тэмдэглэл',
    problem: 'бодлого',
    problemsPl: 'бодлого',
    nothingYet: 'одоохондоо хоосон — эхнийхийг нь бичээрэй',
    difficulty: 'Хүндрэл',
    topic: 'Сэдэв',
    all: 'Бүгд',
    solved: 'бодсон',
    hint: 'Сануулга',
    solution: 'Бодолт',
    showHint: 'Сануулга харах',
    showSolution: 'Бүтэн бодолтыг харах',
    yourAnswer: 'Таны хариу',
    check: 'Шалгах',
    correct: 'Зөв. Сайн байна.',
    close: 'Ойрхон — тоймлолт эсвэл g-ийн утгаа шалгаарай.',
    wrong: 'Арай биш байна. Дахин оролдох эсвэл сануулгыг харна уу.',
    notNumber: 'Тоо оруулна уу, жишээ нь 14.4 эсвэл 3.2e3',
    expected: 'нэгж:',
    seeAlso: 'Мөн үзэх',
    relatedProblems: 'Энэ сэдвийн бодлогууд',
    relatedSim: 'Симуляц',
    back: 'Буцах',
    fig: 'Зураг',
    play: 'Эхлүүлэх',
    pause: 'Зогсоох',
    reset: 'Шинэчлэх',
    launch: 'Шидэх',
    source: 'Эх сурвалж',
    labIntro:
      'Энд байгаа зураг бүр амьд тооцоолол юм. Параметрийг өөрчлөөд юу өөрчлөгдөж байгааг — мөн адил чухал нь, юу өөрчлөгдөхгүй байгааг — ажиглаарай.',
    notesIntro: 'Нэг санааг нэг тэмдэглэлд нягт нямбай бичсэн. Харандаатай уншаарай.',
    problemsIntro:
      'Тоон хариуг ойролцоогоор 1%-ийн нарийвчлалтай шалгана. Сануулга, бодолтыг нуусан — үнэнчээр оролдсоны дараа л нээгээрэй.',
    footer: 'Сурагчдаас сурагчдад зориулав.',
    licence: 'Текст CC BY-SA 4.0 · код MIT',
    writtenBy: 'Бичсэн:',
    contribute: 'Хувь нэмэр оруулах',
    notFound: 'Энэ хуудас (одоохондоо) байхгүй байна.',
    goHome: 'Агуулга руу очих',
    level: ['', 'дасгал', 'аймаг/хот', 'улс+'],
  },
} as const;

export type Strings = (typeof strings)['en'];

export const topicNames: Record<Lang, Record<Topic, string>> = {
  en: {
    mechanics: 'Mechanics',
    oscillations: 'Oscillations & waves',
    gravitation: 'Gravitation',
    electromagnetism: 'Electricity & magnetism',
    thermo: 'Heat & thermodynamics',
    optics: 'Optics',
  },
  mn: {
    mechanics: 'Механик',
    oscillations: 'Хэлбэлзэл ба долгион',
    gravitation: 'Таталцал',
    electromagnetism: 'Цахилгаан ба соронзон',
    thermo: 'Дулаан ба термодинамик',
    optics: 'Оптик',
  },
};

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Strings };
const LangContext = createContext<Ctx | null>(null);

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem('bil.lang');
    if (saved === 'en' || saved === 'mn') return saved;
  } catch {
    /* storage unavailable */
  }
  return navigator.language?.toLowerCase().startsWith('mn') ? 'mn' : 'en';
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initialLang);
  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem('bil.lang', lang);
    } catch {
      /* ignore */
    }
  }, [lang]);
  return (
    <LangContext.Provider value={{ lang, setLang, t: strings[lang] as Strings }}>{children}</LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang outside provider');
  return ctx;
}

/** Pick the right string from a {en, mn} pair, falling back to English. */
export function pick<T>(pair: { en: T; mn?: T }, lang: Lang): T {
  return (lang === 'mn' && pair.mn) || pair.en;
}
