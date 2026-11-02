// src/vendor/marked.js
// marked: Markdown renderer (credits, notices).
//
// Third-party code, bundled as-is (names are minified). Licences: app/about/third-party-notices.js

function h5() {
  return {
    async: !1,
    breaks: !1,
    extensions: null,
    gfm: !0,
    hooks: null,
    pedantic: !1,
    renderer: null,
    silent: !1,
    tokenizer: null,
    walkTokens: null,
  };
}
var kf = h5();
function UB(e) {
  kf = e;
}
var Nf = { exec: () => null };
function $p(e) {
  let t = [];
  return (r) => {
    let n = Math.max(0, Math.min(3, r - 1)),
      i = t[n];
    return (i || ((i = e(n)), (t[n] = i)), i);
  };
}
function Er(e, t = "") {
  let r = typeof e == "string" ? e : e.source,
    n = {
      replace: (i, o) => {
        let s = typeof o == "string" ? o : o.source;
        return ((s = s.replace(Bo.caret, "$1")), (r = r.replace(i, s)), n);
      },
      getRegex: () => new RegExp(r, t),
    };
  return n;
}
var VK = ((e = "") => {
    try {
      return !!new RegExp("(?<=1)(?<!1)" + e);
    } catch {
      return !1;
    }
  })(),
  Bo = {
    codeRemoveIndent: /^(?: {0,3}\t| {1,4})/gm,
    outputLinkReplace: /\\([\[\]])/g,
    indentCodeCompensation: /^(\s+)(?:```)/,
    beginningSpace: /^\s+/,
    endingHash: /#$/,
    startingSpaceChar: /^ /,
    endingSpaceChar: / $/,
    endingSpaceTabChar: /[ \t]$/,
    nonSpaceChar: /[^ ]/,
    newLineCharGlobal: /\n/g,
    tabCharGlobal: /\t/g,
    leadingSpaceTab: /^[ \t]+/,
    multipleSpaceGlobal: /\s+/g,
    blankLine: /^[ \t]*$/,
    doubleBlankLine: /\n[ \t]*\n[ \t]*$/,
    blockquoteStart: /^ {0,3}>/,
    blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g,
    blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm,
    listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g,
    listIsTask: /^\[[ xX]\] +\S/,
    listReplaceTask: /^\[[ xX]\] +/,
    listTaskCheckbox: /\[[ xX]\]/,
    anyLine: /\n.*\n/,
    hrefBrackets: /^<(.*)>$/,
    tableDelimiter: /[:|]/,
    tableAlignChars: /^\||\| *$/g,
    tableRowBlankLine: /\n[ \t]*$/,
    tableAlignRight: /^ *-+: *$/,
    tableAlignCenter: /^ *:-+: *$/,
    tableAlignLeft: /^ *:-+ *$/,
    startATag: /^<a /i,
    endATag: /^<\/a>/i,
    startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i,
    endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i,
    startAngleBracket: /^</,
    endAngleBracket: />$/,
    pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/,
    unicodeAlphaNumeric: /[\p{L}\p{N}]/u,
    numericCharacterReference: /&#(?:(\d{1,7})|[Xx]([A-Fa-f0-9]{1,6}));/,
    numericCharacterReferenceOrAmpersand:
      /&#(?:(\d{1,7})|[Xx]([A-Fa-f0-9]{1,6}));|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,
    escapeTest: /[&<>"']/,
    escapeReplace: /[&<>"']/g,
    escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
    escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,
    caret: /(^|[^\[])\^/g,
    percentDecode: /%25/g,
    findPipe: /\|/g,
    splitPipe: / \|/,
    slashPipe: /\\\|/g,
    carriageReturn: /\r\n|\r/g,
    spaceLine: /^ +$/gm,
    notSpaceStart: /^\S*/,
    endingNewline: /\n$/,
    listItemRegex: (e) => new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),
    nextBulletRegex: $p(
      (e) => new RegExp(`^ {0,${e}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),
    ),
    hrRegex: $p(
      (e) => new RegExp(`^ {0,${e}}((?:-[ 	]*){3,}|(?:_[ 	]*){3,}|(?:\\*[ 	]*){3,})(?:\\n+|$)`),
    ),
    fencesBeginRegex: $p((e) => new RegExp(`^ {0,${e}}(?:\`\`\`|~~~)`)),
    headingBeginRegex: $p((e) => new RegExp(`^ {0,${e}}#`)),
    htmlBeginRegex: $p(
      (e) =>
        new RegExp(
          `^ {0,${e}}(?:</?(?:${Bg})(?: +|$|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)`,
          "i",
        ),
    ),
    blockquoteBeginRegex: $p((e) => new RegExp(`^ {0,${e}}>`)),
  },
  WK = /^(?:[ \t]*(?:\n|$))+/,
  QK = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,
  YK =
    /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
  Lg = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,
  XK = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
  f5 = / {0,3}(?:[*+-]|\d{1,9}[.)])/,
  HB =
    /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |fences|blockquote|heading|hr|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
  GB = Er(HB)
    .replace(/bull/g, f5)
    .replace(/blockCode/g, /(?: {4}| {0,3}\t)/)
    .replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/)
    .replace(/blockquote/g, / {0,3}>/)
    .replace(/heading/g, / {0,3}#{1,6}(?:\s|$)/)
    .replace(/hr/g, / {0,3}(?:(?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/)
    .replace(/html/g, / {0,3}<[^\n>]+>\n/)
    .replace(/\|table/g, "")
    .getRegex(),
  jK = Er(HB)
    .replace(/bull/g, f5)
    .replace(/blockCode/g, /(?: {4}| {0,3}\t)/)
    .replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/)
    .replace(/blockquote/g, / {0,3}>/)
    .replace(/heading/g, / {0,3}#{1,6}(?:\s|$)/)
    .replace(/hr/g, / {0,3}(?:(?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/)
    .replace(/html/g, / {0,3}<[^\n>]+>\n/)
    .replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/)
    .getRegex(),
  p5 = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table|[ \t]+\n)[^\n]+)*)/,
  KK = /^[^\n]+/,
  m5 = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,
  qK = Er(
    /^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/,
  )
    .replace("label", m5)
    .replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/)
    .getRegex(),
  ZK = Er(/^(bull)([ \t][^\n]*?)?(?:\n|$)/)
    .replace(/bull/g, f5)
    .getRegex(),
  Bg =
    "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",
  g5 = /<!--(?:-?>|[\s\S]*?(?:-->|$))/,
  $K = Er(
    "^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n*|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>[^\\n]*\\n*|$)|<![A-Z][\\s\\S]*?(?:>[^\\n]*\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>[^\\n]*\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ \t]*)+\\n|$)|<(?!(?:script|pre|style|textarea)(?![a-z0-9-]))([a-z][a-z0-9-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ \t]*)+\\n|$)|</[a-z][a-z0-9-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ \t]*)+\\n|$))",
    "i",
  )
    .replace("comment", g5)
    .replace("tag", Bg)
    .replace(
      "attribute",
      / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/,
    )
    .getRegex(),
  zB = (e) =>
    Er(p5)
      .replace("hr", Lg)
      .replace("heading", " {0,3}#{1,6}(?:\\s|$)")
      .replace("|lheading", "")
      .replace("|table", "")
      .replace("blockquote", " {0,3}>")
      .replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)")
      .replace("list", e)
      .replace(
        "html",
        " {0,3}(?:</?(?:tag)(?: +|\\n|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)",
      )
      .replace("tag", Bg)
      .getRegex(),
  JK = zB(/ {0,3}(?:[*+-]|1[.)])[ \t]+[^ \t\n]/),
  eq = zB(/ {0,3}(?:[*+-]|\d{1,9}[.)])(?:[ \t]|\n|$)/),
  tq = Er(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/)
    .replace("paragraph", eq)
    .getRegex(),
  A5 = {
    blockquote: tq,
    code: QK,
    def: qK,
    fences: YK,
    heading: XK,
    hr: Lg,
    html: $K,
    lheading: GB,
    list: ZK,
    newline: WK,
    paragraph: JK,
    table: Nf,
    text: KK,
  },
  IB = Er(
    "^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)",
  )
    .replace("hr", Lg)
    .replace("heading", " {0,3}#{1,6}(?:\\s|$)")
    .replace("blockquote", " {0,3}>")
    .replace("code", "(?: {4}| {0,3}\t)[^\\n]")
    .replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)")
    .replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]")
    .replace(
      "html",
      " {0,3}(?:</?(?:tag)(?: +|\\n|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)",
    )
    .replace("tag", Bg)
    .getRegex(),
  rq = {
    ...A5,
    lheading: jK,
    table: IB,
    paragraph: Er(p5)
      .replace("hr", Lg)
      .replace("heading", " {0,3}#{1,6}(?:\\s|$)")
      .replace("|lheading", "")
      .replace("table", IB)
      .replace("blockquote", " {0,3}>")
      .replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)")
      .replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]+[^ \\t\\n]")
      .replace(
        "html",
        " {0,3}(?:</?(?:tag)(?: +|\\n|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)",
      )
      .replace("tag", Bg)
      .getRegex(),
  },
  nq = {
    ...A5,
    html: Er(
      `^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`,
    )
      .replace("comment", g5)
      .replace(
        /tag/g,
        "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b",
      )
      .getRegex(),
    def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
    heading: /^(#{1,6})(.*)(?:\n+|$)/,
    fences: Nf,
    lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
    paragraph: Er(p5)
      .replace("hr", Lg)
      .replace(
        "heading",
        ` *#{1,6} *[^
]`,
      )
      .replace("lheading", GB)
      .replace("|table", "")
      .replace("blockquote", " {0,3}>")
      .replace("|fences", "")
      .replace("|list", "")
      .replace("|html", "")
      .replace("|tag", "")
      .getRegex(),
  },
  iq = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
  oq = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
  VB = /^( {2,}|\\)\n(?!\s*$)[ \t]*/,
  sq = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
  xc = /[\p{P}\p{S}]/u,
  e1 = /[\s\p{P}\p{S}]/u,
  Fg = /[^\s\p{P}\p{S}]/u,
  aq = Er(/^((?![*_])punctSpace)/, "u")
    .replace(/punctSpace/g, e1)
    .getRegex(),
  lq = /[\p{Pi}\p{Ps}"']/u,
  WB = /(?!~)[\p{P}\p{S}]/u,
  cq = /(?!~)[\s\p{P}\p{S}]/u,
  uq = /(?:[^\s\p{P}\p{S}]|~)/u,
  dq = Er(/link|precode-code|html/, "g")
    .replace(
      "link",
      /\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/,
    )
    .replace("precode-", VK ? "(?<!`)()" : "(^^|[^`])")
    .replace("code", /(?<b>`+)[^`]+\k<b>(?!`)/)
    .replace("html", /<(?! )[^<>]*?>/)
    .getRegex(),
  QB = /^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/,
  hq = Er(QB, "u").replace(/punct/g, xc).getRegex(),
  fq = Er(QB, "u").replace(/punct/g, WB).getRegex(),
  pq =
    /^(?:\*+(?:((?!\*)(?!openQuote)punct)|([^\s*]))?)|^_+(?:((?!_)(?!openQuote)punct)|([^\s_]))?/,
  mq = Er(pq, "u")
    .replace(/openQuote/g, lq)
    .replace(/punct/g, xc)
    .getRegex(),
  YB =
    "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",
  gq = Er(YB, "gu")
    .replace(/notPunctSpace/g, Fg)
    .replace(/punctSpace/g, e1)
    .replace(/punct/g, xc)
    .getRegex(),
  Aq = Er(YB, "gu")
    .replace(/notPunctSpace/g, uq)
    .replace(/punctSpace/g, cq)
    .replace(/punct/g, WB)
    .getRegex(),
  yq =
    "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)[\\s](\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|(?:(?!\\*)punct|notPunctSpace)(\\*+)(?!\\*)(?=notPunctSpace)",
  xq = Er(yq, "gu")
    .replace(/notPunctSpace/g, Fg)
    .replace(/punctSpace/g, e1)
    .replace(/punct/g, xc)
    .getRegex(),
  bq = Er(
    "^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)",
    "gu",
  )
    .replace(/notPunctSpace/g, Fg)
    .replace(/punctSpace/g, e1)
    .replace(/punct/g, xc)
    .getRegex(),
  _q =
    "^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)[\\s](_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)|(?:(?!_)punct|notPunctSpace)(_+)(?!_)(?=notPunctSpace)",
  vq = Er(_q, "gu")
    .replace(/notPunctSpace/g, Fg)
    .replace(/punctSpace/g, e1)
    .replace(/punct/g, xc)
    .getRegex(),
  Cq = Er(/^~~?(?:((?!~)punct)|[^\s~])/, "u")
    .replace(/punct/g, xc)
    .getRegex(),
  wq =
    "^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)",
  Tq = Er(wq, "gu")
    .replace(/notPunctSpace/g, Fg)
    .replace(/punctSpace/g, e1)
    .replace(/punct/g, xc)
    .getRegex(),
  Eq = Er(/\\(punct)/, "gu")
    .replace(/punct/g, xc)
    .getRegex(),
  Sq = Er(/(`+)(?:[^`]|[^`][\s\S]*?[^`])\1(?!`)|`+|\\(punct)/, "gu")
    .replace(/punct/g, xc)
    .getRegex(),
  Mq = Er(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/)
    .replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/)
    .replace(
      "email",
      /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/,
    )
    .getRegex(),
  Iq = Er(g5).replace("(?:-->|$)", "-->").getRegex(),
  Rq = Er(
    "^comment|^</[a-zA-Z][a-zA-Z0-9-]*\\s*>|^<[a-zA-Z][a-zA-Z0-9-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",
  )
    .replace("comment", Iq)
    .replace(
      "attribute",
      /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/,
    )
    .getRegex(),
  XB = /\[(?:\\[\s\S]|[^\[\]\\])*\]/,
  Fx = Er(
    /(?:\[(?:brackets|\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/,
  )
    .replace("brackets", XB)
    .getRegex(),
  Oq = Er(/^!?\[(label)\]\([ \t\n]*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?[ \t\n]*\)/)
    .replace("label", Fx)
    .replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]+|(?=\))/)
    .replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/)
    .getRegex(),
  Lq = Er(/^!?\[(label)\]\[(ref)\]/)
    .replace("label", Fx)
    .replace("ref", m5)
    .getRegex(),
  Bq = Er(/^!?\[(ref)\](?:\[\])?/)
    .replace("ref", m5)
    .getRegex(),
  RB = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\]){1,999}/,
  Fq = Er(
    /(?:[^\[\]\\`]*(?:\[(?:brackets|\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\]))){0,999}?[^\[\]\\`]*?/,
  )
    .replace("brackets", XB)
    .getRegex(),
  Dq = Er("reflink|nolink(?!\\()", "g")
    .replace(
      "reflink",
      Er(/^!?\[(label)\]\[(ref)\]/)
        .replace("label", Fq)
        .replace("ref", RB)
        .getRegex(),
    )
    .replace(
      "nolink",
      Er(/^!?\[(ref)\](?:\[\])?/)
        .replace("ref", RB)
        .getRegex(),
    )
    .getRegex(),
  OB = /[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,
  Nq = /[A-Za-z0-9._+-]+@[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![\w-])/,
  Pq = Er(/(?:mailto:email|xmpp:email(?:\/[A-Za-z0-9@.]+)?)/)
    .replace(/email/g, Nq)
    .getRegex(),
  y5 = {
    _backpedal: Nf,
    anyPunctuation: Eq,
    anyPunctuationOutsideCode: Sq,
    autolink: Mq,
    blockSkip: dq,
    br: VB,
    code: oq,
    del: Nf,
    delLDelim: Nf,
    delRDelim: Nf,
    emStrongLDelim: hq,
    emStrongRDelimAst: gq,
    emStrongRDelimUnd: bq,
    escape: iq,
    link: Oq,
    nolink: Bq,
    punctuation: aq,
    reflink: Lq,
    reflinkSearch: Dq,
    tag: Rq,
    text: sq,
    url: Nf,
  },
  kq = {
    ...y5,
    emStrongLDelim: mq,
    emStrongRDelimAst: xq,
    emStrongRDelimUnd: vq,
    link: Er(/^!?\[(label)\]\((.*?)\)/)
      .replace("label", Fx)
      .getRegex(),
    reflink: Er(/^!?\[(label)\]\s*\[([^\]]*)\]/)
      .replace("label", Fx)
      .getRegex(),
  },
  d5 = {
    ...y5,
    emStrongRDelimAst: Aq,
    emStrongLDelim: fq,
    delLDelim: Cq,
    delRDelim: Tq,
    url: Er(/^emailProtocol|^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/)
      .replace("emailProtocol", Pq)
      .replace("protocol", OB)
      .replace(
        "email",
        /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![\w-])/,
      )
      .getRegex(),
    _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
    del: /^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,
    text: Er(
      /^(?:[^a-zA-Z0-9](?=emailProtocol)|(`+|~+|[^`~])(?:(?=[`~])|(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9](?=emailProtocol)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))))/,
    )
      .replace("protocol", OB)
      .replace(/emailProtocol/g, /(?:mailto|xmpp):/)
      .getRegex(),
  },
  Uq = {
    ...d5,
    br: Er(VB).replace("{2,}", "*").getRegex(),
    text: Er(d5.text)
      .replace("\\b_", "\\b_| {2,}\\n")
      .replace(/\{2,\}/g, "*")
      .getRegex(),
  },
  Bx = { normal: A5, gfm: rq, pedantic: nq },
  Rg = { normal: y5, gfm: d5, breaks: Uq, pedantic: kq },
  Hq = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" },
  LB = (e) => Hq[e];
function Ca(e, t) {
  if (t) {
    if (Bo.escapeTest.test(e)) return e.replace(Bo.escapeReplace, LB);
  } else if (Bo.escapeTestNoEncode.test(e)) return e.replace(Bo.escapeReplaceNoEncode, LB);
  return e;
}
function Gq(e) {
  return Bo.numericCharacterReference.test(e)
    ? e.replace(Bo.numericCharacterReferenceOrAmpersand, (t, r, n) => {
        if (r === void 0 && n === void 0) return "&amp;";
        let i = r === void 0 ? Number.parseInt(n, 16) : Number.parseInt(r, 10);
        return i === 0 || i > 1114111 || (i >= 55296 && i <= 57343)
          ? "�"
          : i === 38
            ? "&amp;"
            : String.fromCodePoint(i);
      })
    : e;
}
function BB(e) {
  try {
    e = encodeURI(e).replace(Bo.percentDecode, "%");
  } catch {
    return null;
  }
  return e;
}
function FB(e, t) {
  let r = e.replace(Bo.findPipe, (o, s, a) => {
      let l = !1,
        c = s;
      for (; --c >= 0 && a[c] === "\\"; ) l = !l;
      return l ? "|" : " |";
    }),
    n = r.split(Bo.splitPipe),
    i = 0;
  if ((n[0].trim() || n.shift(), n.length > 0 && !n.at(-1)?.trim() && n.pop(), t))
    if (n.length > t) n.splice(t);
    else for (; n.length < t; ) n.push("");
  for (; i < n.length; i++) n[i] = n[i].trim().replace(Bo.slashPipe, "|");
  return n;
}
function Ld(e, t, r) {
  let n = e.length;
  if (n === 0) return "";
  let i = 0;
  for (; i < n; ) {
    let o = e.charAt(n - i - 1);
    if (o === t && !r) i++;
    else if (o !== t && r) i++;
    else break;
  }
  return e.slice(0, n - i);
}
function DB(e) {
  let t = e.split(`
`),
    r = t.length - 1;
  for (; r >= 0 && Bo.blankLine.test(t[r]); ) r--;
  return t.length - r <= 2
    ? e
    : t.slice(0, r + 1).join(`
`);
}
function Dx(e) {
  return e.trim().toLowerCase().toUpperCase().toLowerCase();
}
function NB(e, t) {
  if (e.indexOf(t[0]) === -1 && e.indexOf(t[1]) === -1) return -1;
  let r = 0;
  for (let n = 0; n < e.length; n++)
    if (e[n] === "\\") n++;
    else if (e[n] === t[0]) r++;
    else if (e[n] === t[1] && (r--, r < 0)) return n;
  return r > 0 ? -2 : -1;
}
function u5(e, t = 0) {
  let r = t,
    n = "";
  for (let i of e)
    if (i === "\t") {
      let o = 4 - (r % 4);
      ((n += " ".repeat(o)), (r += o));
    } else ((n += i), r++);
  return n;
}
function PB(e, t, r, n, i) {
  let o = t.href,
    s = t.title || null,
    a = e[1].replace(i.other.outputLinkReplace, "$1"),
    l = e[0].charAt(0) === "!",
    c = n.state.inLink,
    u = n.state.linkEmitted,
    d = n.state.inRawBlock;
  ((n.state.inLink = !0), (n.state.linkEmitted = !1));
  let h = n.inlineTokens(a),
    f = n.state.linkEmitted;
  if (((n.state.linkEmitted = u), (n.state.inLink = c), !l)) {
    if (f) {
      n.state.inRawBlock = d;
      return;
    }
    n.state.linkEmitted = !0;
  }
  return { type: l ? "image" : "link", raw: r, href: o, title: s, text: a, tokens: h };
}
function zq(e, t, r) {
  let n = e.match(r.other.indentCodeCompensation);
  if (n === null) return t;
  let i = n[1];
  return t
    .split(
      `
`,
    )
    .map((o) => {
      let s = o.match(r.other.beginningSpace);
      if (s === null) return o;
      let [a] = s;
      return o.slice(Math.min(a.length, i.length));
    }).join(`
`);
}
function kB(e, t, r, n) {
  if (!t.includes("<")) return !1;
  for (let i = 0; i < t.length; i++) {
    if (t[i] === "\\") {
      i++;
      continue;
    }
    if (t[i] === "`") {
      let a = n.inline.code.exec(t.slice(i));
      if (a) {
        i += a[0].length - 1;
        continue;
      }
    }
    if (t[i] !== "<") continue;
    let o = e.slice(r + i),
      s = n.inline.tag.exec(o) || n.inline.autolink.exec(o);
    if (s) {
      if (s[0].length > t.length - i) return !0;
      i += s[0].length - 1;
    }
  }
  return !1;
}
var Nx = class {
    options;
    rules;
    lexer;
    constructor(e) {
      this.options = e || kf;
    }
    space(e) {
      let t = this.rules.block.newline.exec(e);
      if (t && t[0].length > 0) return { type: "space", raw: t[0] };
    }
    code(e) {
      let t = this.rules.block.code.exec(e);
      if (t) {
        let r = this.options.pedantic ? t[0] : DB(t[0]),
          n = r.replace(this.rules.other.codeRemoveIndent, "");
        return { type: "code", raw: r, codeBlockStyle: "indented", text: n };
      }
    }
    fences(e) {
      let t = this.rules.block.fences.exec(e);
      if (t) {
        let r = t[0],
          n = zq(r, t[3] || "", this.rules);
        return {
          type: "code",
          raw: r,
          lang: t[2] ? t[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : t[2],
          text: n,
        };
      }
    }
    heading(e) {
      let t = this.rules.block.heading.exec(e);
      if (t) {
        let r = t[2].trim();
        if (this.rules.other.endingHash.test(r)) {
          let n = Ld(r, "#");
          (this.options.pedantic || !n || this.rules.other.endingSpaceTabChar.test(n)) &&
            (r = n.trim());
        }
        return {
          type: "heading",
          raw: Ld(
            t[0],
            `
`,
          ),
          depth: t[1].length,
          text: r,
          tokens: this.lexer.inline(r),
        };
      }
    }
    hr(e) {
      let t = this.rules.block.hr.exec(e);
      if (t)
        return {
          type: "hr",
          raw: Ld(
            t[0],
            `
`,
          ),
        };
    }
    blockquote(e) {
      let t = this.rules.block.blockquote.exec(e);
      if (t) {
        let r = Ld(
            t[0],
            `
`,
          ).split(`
`),
          n = "",
          i = "",
          o = [];
        for (; r.length > 0; ) {
          let s = !1,
            a = [],
            l;
          for (l = 0; l < r.length; l++)
            if (this.rules.other.blockquoteStart.test(r[l])) (a.push(r[l]), (s = !0));
            else if (!s) a.push(r[l]);
            else break;
          r = r.slice(l);
          let c = a.join(`
`),
            u = c
              .replace(
                this.rules.other.blockquoteSetextReplace,
                `
    $1`,
              )
              .replace(this.rules.other.blockquoteSetextReplace2, "");
          ((n = n
            ? `${n}
${c}`
            : c),
            (i = i
              ? `${i}
${u}`
              : u));
          let d = this.lexer.state.top;
          if (
            ((this.lexer.state.top = !0),
            this.lexer.blockTokens(u, o, !0),
            (this.lexer.state.top = d),
            r.length === 0)
          )
            break;
          let h = o.at(-1);
          if (h?.type === "code" || h?.type === "heading" || h?.type === "hr" || h?.type === "html")
            break;
          if (h?.type === "blockquote") {
            let f = h,
              p = r.join(`
`),
              g =
                f.raw +
                `
` +
                p.replace(this.rules.other.blockquoteSetextReplace2, ""),
              m = this.blockquote(g);
            o[o.length - 1] = m;
            let A = g.substring(m.raw.length).replace(/^\n/, ""),
              y = A
                ? A.split(`
`).length
                : 0,
              x = y ? r.slice(0, -y) : r;
            (x.length > 0 &&
              (n = `${n}
${x.join(`
`)}`),
              (i = i.substring(0, i.length - f.text.length) + m.text));
            break;
          } else if (h?.type === "list") {
            let f = h,
              p =
                f.raw +
                `
` +
                r.join(`
`),
              g = this.list(p);
            ((o[o.length - 1] = g),
              (n = n.substring(0, n.length - h.raw.length) + g.raw),
              (i = i.substring(0, i.length - f.raw.length) + g.raw),
              (r = p.substring(o.at(-1).raw.length).split(`
`)));
            continue;
          }
        }
        return { type: "blockquote", raw: n, tokens: o, text: i };
      }
    }
    list(e) {
      let t = this.rules.block.list.exec(e);
      if (t) {
        let r = e,
          n = () => r.length - e.length,
          i = t[1].trim(),
          o = i.length > 1,
          s = {
            type: "list",
            raw: "",
            ordered: o,
            start: o ? +i.slice(0, -1) : "",
            loose: !1,
            items: [],
          };
        ((i = o ? `\\d{1,9}\\${i.slice(-1)}` : `\\${i}`),
          this.options.pedantic && (i = o ? i : "[*+-]"));
        let a = this.rules.other.listItemRegex(i),
          l = !1;
        for (; e; ) {
          let u = !1,
            d = "";
          if (!(t = a.exec(e)) || this.rules.block.hr.test(e)) break;
          let h = n();
          e = e.substring(t[0].length);
          let f = t[2].split(
              `
`,
              1,
            )[0],
            p = t[1].length,
            g = this.options.pedantic
              ? u5(f, p)
              : f.replace(this.rules.other.leadingSpaceTab, (b) => u5(b, p)),
            m = e.split(
              `
`,
              1,
            )[0],
            A = !g.trim(),
            y = 0;
          if (
            (this.options.pedantic
              ? ((y = 2), (d = g.trimStart()))
              : A
                ? (y = p + 1)
                : ((y = g.search(this.rules.other.nonSpaceChar)),
                  (y = y > 4 ? 1 : y),
                  (d = g.slice(y)),
                  (y += p)),
            A && this.rules.other.blankLine.test(m) && ((e = e.substring(m.length + 1)), (u = !0)),
            !u)
          ) {
            let b = this.rules.other.nextBulletRegex(y),
              v = this.rules.other.hrRegex(y),
              _ = this.rules.other.fencesBeginRegex(y),
              w = this.rules.other.headingBeginRegex(y),
              S = this.rules.other.htmlBeginRegex(y),
              E = this.rules.other.blockquoteBeginRegex(y);
            for (; e; ) {
              let T = e.split(
                  `
`,
                  1,
                )[0],
                M;
              if (
                ((m = T),
                this.options.pedantic
                  ? ((m = m.replace(this.rules.other.listReplaceNesting, "  ")), (M = m))
                  : (M = m.replace(this.rules.other.leadingSpaceTab, (C) => u5(C))),
                _.test(m) || w.test(m) || S.test(m) || E.test(m) || b.test(m) || v.test(m))
              )
                break;
              if (M.search(this.rules.other.nonSpaceChar) >= y || !m.trim())
                d +=
                  `
` + M.slice(y);
              else {
                if (
                  A ||
                  g
                    .replace(this.rules.other.tabCharGlobal, "    ")
                    .search(this.rules.other.nonSpaceChar) >= 4 ||
                  _.test(g) ||
                  w.test(g) ||
                  v.test(g)
                )
                  break;
                d +=
                  `
` + m;
              }
              ((A = !m.trim()), (e = e.substring(T.length + 1)), (g = M.slice(y)));
            }
          }
          let x = r.slice(h, n());
          (s.loose || (l ? (s.loose = !0) : this.rules.other.doubleBlankLine.test(x) && (l = !0)),
            s.items.push({
              type: "list_item",
              raw: x,
              task: !!this.options.gfm && this.rules.other.listIsTask.test(d),
              loose: !1,
              text: d,
              tokens: [],
            }));
        }
        let c = s.items.at(-1);
        if (c) ((c.raw = c.raw.trimEnd()), (c.text = c.text.trimEnd()));
        else return;
        s.raw = r.slice(0, n()).trimEnd();
        for (let u of s.items)
          if (
            ((this.lexer.state.top = !1), (u.tokens = this.lexer.blockTokens(u.text, [])), !s.loose)
          ) {
            let d = u.tokens.filter((f) => f.type === "space"),
              h = d.length > 0 && d.some((f) => this.rules.other.anyLine.test(f.raw));
            s.loose = h;
          }
        for (let u of s.items) {
          let d = u.tokens[0];
          if (u.task && (d?.type === "text" || d?.type === "paragraph")) {
            ((u.text = u.text.replace(this.rules.other.listReplaceTask, "")),
              (d.raw = d.raw.replace(this.rules.other.listReplaceTask, "")),
              (d.text = d.text.replace(this.rules.other.listReplaceTask, "")));
            for (let f = this.lexer.inlineQueue.length - 1; f >= 0; f--)
              if (this.rules.other.listIsTask.test(this.lexer.inlineQueue[f].src)) {
                this.lexer.inlineQueue[f].src = this.lexer.inlineQueue[f].src.replace(
                  this.rules.other.listReplaceTask,
                  "",
                );
                break;
              }
            let h = this.rules.other.listTaskCheckbox.exec(u.raw);
            if (h) {
              let f = { type: "checkbox", raw: h[0] + " ", checked: h[0] !== "[ ]" };
              ((u.checked = f.checked),
                s.loose
                  ? u.tokens[0] &&
                    ["paragraph", "text"].includes(u.tokens[0].type) &&
                    "tokens" in u.tokens[0] &&
                    u.tokens[0].tokens
                    ? ((u.tokens[0].raw = f.raw + u.tokens[0].raw),
                      (u.tokens[0].text = f.raw + u.tokens[0].text),
                      u.tokens[0].tokens.unshift(f))
                    : u.tokens.unshift({ type: "paragraph", raw: f.raw, text: f.raw, tokens: [f] })
                  : u.tokens.unshift(f));
            }
          } else u.task && (u.task = !1);
        }
        if (s.loose)
          for (let u of s.items) {
            u.loose = !0;
            for (let d of u.tokens) d.type === "text" && (d.type = "paragraph");
          }
        return s;
      }
    }
    html(e) {
      let t = this.rules.block.html.exec(e);
      if (t) {
        let r = DB(t[0]);
        return {
          type: "html",
          block: !0,
          raw: r,
          pre: t[1] === "pre" || t[1] === "script" || t[1] === "style",
          text: r,
        };
      }
    }
    def(e) {
      let t = this.rules.block.def.exec(e);
      if (t) {
        if (!this.rules.other.startAngleBracket.test(t[2]) && NB(t[2], "()") !== -1) return;
        let r = Dx(t[1]).replace(this.rules.other.multipleSpaceGlobal, " "),
          n = t[2]
            ? t[2]
                .replace(this.rules.other.hrefBrackets, "$1")
                .replace(this.rules.inline.anyPunctuation, "$1")
            : "",
          i = t[3]
            ? t[3].substring(1, t[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1")
            : t[3];
        return {
          type: "def",
          tag: r,
          raw: Ld(
            t[0],
            `
`,
          ),
          href: n,
          title: i,
        };
      }
    }
    table(e) {
      let t = this.rules.block.table.exec(e);
      if (!t || !this.rules.other.tableDelimiter.test(t[2])) return;
      let r = FB(t[1]),
        n = t[2].replace(this.rules.other.tableAlignChars, "").split("|"),
        i = t[3]?.trim()
          ? t[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`)
          : [],
        o = {
          type: "table",
          raw: Ld(
            t[0],
            `
`,
          ),
          header: [],
          align: [],
          rows: [],
        };
      if (r.length === n.length) {
        for (let s of n)
          this.rules.other.tableAlignRight.test(s)
            ? o.align.push("right")
            : this.rules.other.tableAlignCenter.test(s)
              ? o.align.push("center")
              : this.rules.other.tableAlignLeft.test(s)
                ? o.align.push("left")
                : o.align.push(null);
        for (let s = 0; s < r.length; s++)
          o.header.push({
            text: r[s],
            tokens: this.lexer.inline(r[s]),
            header: !0,
            align: o.align[s],
          });
        for (let s of i)
          o.rows.push(
            FB(s, o.header.length).map((a, l) => ({
              text: a,
              tokens: this.lexer.inline(a),
              header: !1,
              align: o.align[l],
            })),
          );
        return o;
      }
    }
    lheading(e) {
      let t = this.rules.block.lheading.exec(e);
      if (t) {
        let r = t[1].trim();
        return {
          type: "heading",
          raw: Ld(
            t[0],
            `
`,
          ),
          depth: t[2].charAt(0) === "=" ? 1 : 2,
          text: r,
          tokens: this.lexer.inline(r),
        };
      }
    }
    paragraph(e) {
      let t = this.rules.block.paragraph.exec(e);
      if (t) {
        let r =
          t[1].charAt(t[1].length - 1) ===
          `
`
            ? t[1].slice(0, -1)
            : t[1];
        return { type: "paragraph", raw: t[0], text: r, tokens: this.lexer.inline(r) };
      }
    }
    text(e) {
      let t = this.rules.block.text.exec(e);
      if (t) return { type: "text", raw: t[0], text: t[0], tokens: this.lexer.inline(t[0]) };
    }
    escape(e) {
      let t = this.rules.inline.escape.exec(e);
      if (t) return { type: "escape", raw: t[0], text: t[1] };
    }
    tag(e) {
      let t = this.rules.inline.tag.exec(e);
      if (t)
        return (
          !this.lexer.state.inLink && this.rules.other.startATag.test(t[0])
            ? (this.lexer.state.inLink = !0)
            : this.lexer.state.inLink &&
              this.rules.other.endATag.test(t[0]) &&
              (this.lexer.state.inLink = !1),
          !this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(t[0])
            ? (this.lexer.state.inRawBlock = !0)
            : this.lexer.state.inRawBlock &&
              this.rules.other.endPreScriptTag.test(t[0]) &&
              (this.lexer.state.inRawBlock = !1),
          {
            type: "html",
            raw: t[0],
            inLink: this.lexer.state.inLink,
            inRawBlock: this.lexer.state.inRawBlock,
            block: !1,
            text: t[0],
          }
        );
    }
    link(e) {
      if (this.lexer.state.linkParenPossible === !1) return;
      let t = this.rules.inline.link.exec(e);
      if (t) {
        let r = t[0].charAt(0) === "!" ? 2 : 1;
        if (!this.options.pedantic && kB(e, t[1], r, this.rules)) return;
        let n = t[2].trim();
        if (!this.options.pedantic && this.rules.other.startAngleBracket.test(n)) {
          if (!this.rules.other.endAngleBracket.test(n)) return;
          let s = Ld(n.slice(0, -1), "\\");
          if ((n.length - s.length) % 2 === 0) return;
        } else {
          let s = NB(t[2], "()");
          if (s === -2) return;
          if (s > -1) {
            let a = (t[0].indexOf("!") === 0 ? 5 : 4) + t[1].length + s;
            ((t[2] = t[2].substring(0, s)), (t[0] = t[0].substring(0, a).trim()), (t[3] = ""));
          }
        }
        let i = t[2],
          o = "";
        if (this.options.pedantic) {
          let s = this.rules.other.pedanticHrefTitle.exec(i);
          s && ((i = s[1]), (o = s[3]));
        } else o = t[3] ? t[3].slice(1, -1) : "";
        return (
          (i = i.trim()),
          this.rules.other.startAngleBracket.test(i) &&
            (this.options.pedantic && !this.rules.other.endAngleBracket.test(n)
              ? (i = i.slice(1))
              : (i = i.slice(1, -1))),
          PB(
            t,
            {
              href: i && i.replace(this.rules.inline.anyPunctuation, "$1"),
              title: o && o.replace(this.rules.inline.anyPunctuation, "$1"),
            },
            t[0],
            this.lexer,
            this.rules,
          )
        );
      }
    }
    reflink(e, t) {
      let r;
      if ((r = this.rules.inline.reflink.exec(e)) || (r = this.rules.inline.nolink.exec(e))) {
        let n = r[0].charAt(0) === "!" ? 2 : 1;
        if (!this.options.pedantic && kB(e, r[1], n, this.rules)) return;
        let i = (r[2] || r[1]).replace(this.rules.other.multipleSpaceGlobal, " "),
          o = t[Dx(i)];
        if (!o) {
          let s = r[0].charAt(0);
          return { type: "text", raw: s, text: s };
        }
        return PB(r, o, r[0], this.lexer, this.rules);
      }
    }
    emStrong(e, t, r = "") {
      let n = this.rules.inline.emStrongLDelim.exec(e);
      if (
        !n ||
        (!n[1] && !n[2] && !n[3] && !n[4]) ||
        (n[4] && r.match(this.rules.other.unicodeAlphaNumeric))
      )
        return;
      if (!(n[1] || n[3]) || !r || this.rules.inline.punctuation.exec(r)) {
        let i = [...n[0]].length - 1,
          o,
          s,
          a = i,
          l = 0,
          c = n[0][0],
          u = r === c,
          d = c === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
        for (d.lastIndex = 0, t = t.slice(-1 * e.length + i); (n = d.exec(t)) !== null; ) {
          if (((o = n[1] || n[2] || n[3] || n[4] || n[5] || n[6]), !o)) continue;
          if (((s = [...o].length), n[3] || n[4])) {
            a += s;
            continue;
          } else if (n[5] || n[6]) {
            if (i % 3 && !((i + s) % 3)) {
              l += s;
              continue;
            }
            if (u) break;
          }
          if (((a -= s), a > 0)) continue;
          s = Math.min(s, s + a + l);
          let h = [...n[0]][0].length,
            f = e.slice(0, i + n.index + h + s);
          if (Math.min(i, s) % 2) {
            let g = f.slice(1, -1);
            return { type: "em", raw: f, text: g, tokens: this.lexer.inlineTokens(g) };
          }
          let p = f.slice(2, -2);
          return { type: "strong", raw: f, text: p, tokens: this.lexer.inlineTokens(p) };
        }
      }
    }
    codespan(e) {
      let t = this.rules.inline.code.exec(e);
      if (t) {
        let r = t[2].replace(this.rules.other.newLineCharGlobal, " "),
          n = this.rules.other.nonSpaceChar.test(r),
          i =
            this.rules.other.startingSpaceChar.test(r) && this.rules.other.endingSpaceChar.test(r);
        return (
          n && i && (r = r.substring(1, r.length - 1)),
          { type: "codespan", raw: t[0], text: r }
        );
      }
    }
    br(e) {
      let t = this.rules.inline.br.exec(e);
      if (t) return { type: "br", raw: t[0] };
    }
    del(e, t, r = "") {
      let n = this.rules.inline.delLDelim.exec(e);
      if (!n) return;
      if (!n[1] || !r || this.rules.inline.punctuation.exec(r)) {
        let i = [...n[0]].length - 1,
          o,
          s,
          a = i,
          l = this.rules.inline.delRDelim;
        for (l.lastIndex = 0, t = t.slice(-1 * e.length + i); (n = l.exec(t)) !== null; ) {
          if (
            ((o = n[1] || n[2] || n[3] || n[4] || n[5] || n[6]),
            !o || ((s = [...o].length), s !== i))
          )
            continue;
          if (n[3] || n[4]) {
            a += s;
            continue;
          }
          if (((a -= s), a > 0)) continue;
          s = Math.min(s, s + a);
          let c = [...n[0]][0].length,
            u = e.slice(0, i + n.index + c + s),
            d = u.slice(i, -i);
          return { type: "del", raw: u, text: d, tokens: this.lexer.inlineTokens(d) };
        }
      }
    }
    autolink(e) {
      let t = this.rules.inline.autolink.exec(e);
      if (t) {
        let r, n;
        return (
          t[2] === "@" ? ((r = t[1]), (n = "mailto:" + r)) : ((r = t[1]), (n = r)),
          {
            type: "link",
            raw: t[0],
            text: r,
            href: n,
            autolink: !0,
            tokens: [{ type: "text", raw: r, text: r }],
          }
        );
      }
    }
    url(e) {
      let t;
      if ((t = this.rules.inline.url.exec(e))) {
        let r, n;
        if (t[2] === "@") ((r = t[0]), (n = "mailto:" + r));
        else {
          let i;
          do ((i = t[0]), (t[0] = this.rules.inline._backpedal.exec(t[0])?.[0] ?? ""));
          while (i !== t[0]);
          ((r = t[0]), t[1] === "www." ? (n = "http://" + t[0]) : (n = t[0]));
        }
        return {
          type: "link",
          raw: t[0],
          text: r,
          href: n,
          autolink: !0,
          tokens: [{ type: "text", raw: r, text: r }],
        };
      }
    }
    inlineText(e) {
      let t = this.rules.inline.text.exec(e);
      if (t) {
        let r = this.lexer.state.inRawBlock;
        return { type: "text", raw: t[0], text: r ? t[0] : Gq(t[0]), escaped: r };
      }
    }
  },
  Ul = class e {
    tokens;
    options;
    state;
    inlineQueue;
    tokenizer;
    constructor(t) {
      ((this.tokens = []),
        (this.tokens.links = Object.create(null)),
        (this.options = t || kf),
        (this.options.tokenizer = this.options.tokenizer || new Nx()),
        (this.tokenizer = this.options.tokenizer),
        (this.tokenizer.options = this.options),
        (this.tokenizer.lexer = this),
        (this.inlineQueue = []),
        (this.state = {
          inLink: !1,
          inRawBlock: !1,
          linkEmitted: !1,
          linkParenPossible: !0,
          top: !0,
        }));
      let r = { other: Bo, block: Bx.normal, inline: Rg.normal };
      (this.options.pedantic
        ? ((r.block = Bx.pedantic), (r.inline = Rg.pedantic))
        : this.options.gfm &&
          ((r.block = Bx.gfm), this.options.breaks ? (r.inline = Rg.breaks) : (r.inline = Rg.gfm)),
        (this.tokenizer.rules = r));
    }
    static get rules() {
      return { block: Bx, inline: Rg };
    }
    static lex(t, r) {
      return new e(r).lex(t);
    }
    static lexInline(t, r) {
      return new e(r).inlineTokens(t);
    }
    lex(t) {
      ((t = t.replace(
        Bo.carriageReturn,
        `
`,
      )),
        this.blockTokens(t, this.tokens));
      for (let r = 0; r < this.inlineQueue.length; r++) {
        let n = this.inlineQueue[r];
        this.inlineTokens(n.src, n.tokens);
      }
      return ((this.inlineQueue = []), this.tokens);
    }
    blockTokens(t, r = [], n = !1) {
      ((this.tokenizer.lexer = this),
        this.options.pedantic &&
          (t = t.replace(Bo.tabCharGlobal, "    ").replace(Bo.spaceLine, "")));
      let i = 1 / 0;
      for (; t; ) {
        if (t.length < i) i = t.length;
        else {
          this.infiniteLoopError(t.charCodeAt(0));
          break;
        }
        let o;
        if (
          this.options.extensions?.block?.some((a) =>
            (o = a.call({ lexer: this }, t, r))
              ? ((t = t.substring(o.raw.length)), r.push(o), !0)
              : !1,
          )
        )
          continue;
        if ((o = this.tokenizer.space(t))) {
          t = t.substring(o.raw.length);
          let a = r.at(-1);
          o.raw.length === 1 && a !== void 0
            ? (a.raw += `
`)
            : r.push(o);
          continue;
        }
        if ((o = this.tokenizer.code(t))) {
          t = t.substring(o.raw.length);
          let a = r.at(-1);
          a?.type === "paragraph" || a?.type === "text"
            ? ((a.raw +=
                (a.raw.endsWith(`
`)
                  ? ""
                  : `
`) + o.raw),
              (a.text +=
                `
` + o.text),
              (this.inlineQueue.at(-1).src = a.text))
            : r.push(o);
          continue;
        }
        if ((o = this.tokenizer.fences(t))) {
          ((t = t.substring(o.raw.length)), r.push(o));
          continue;
        }
        if ((o = this.tokenizer.heading(t))) {
          ((t = t.substring(o.raw.length)), r.push(o));
          continue;
        }
        if ((o = this.tokenizer.hr(t))) {
          ((t = t.substring(o.raw.length)), r.push(o));
          continue;
        }
        if ((o = this.tokenizer.blockquote(t))) {
          ((t = t.substring(o.raw.length)), r.push(o));
          continue;
        }
        if ((o = this.tokenizer.list(t))) {
          ((t = t.substring(o.raw.length)), r.push(o));
          continue;
        }
        if ((o = this.tokenizer.html(t))) {
          ((t = t.substring(o.raw.length)), r.push(o));
          continue;
        }
        if ((o = this.tokenizer.def(t))) {
          t = t.substring(o.raw.length);
          let a = r.at(-1);
          a?.type === "paragraph" || a?.type === "text"
            ? ((a.raw +=
                (a.raw.endsWith(`
`)
                  ? ""
                  : `
`) + o.raw),
              (a.text +=
                `
` + o.raw),
              (this.inlineQueue.at(-1).src = a.text))
            : this.tokens.links[o.tag] ||
              ((this.tokens.links[o.tag] = { href: o.href, title: o.title }), r.push(o));
          continue;
        }
        if ((o = this.tokenizer.table(t))) {
          ((t = t.substring(o.raw.length)), r.push(o));
          continue;
        }
        if ((o = this.tokenizer.lheading(t))) {
          ((t = t.substring(o.raw.length)), r.push(o));
          continue;
        }
        let s = t;
        if (this.options.extensions?.startBlock) {
          let a = 1 / 0,
            l = t.slice(1),
            c;
          (this.options.extensions.startBlock.forEach((u) => {
            ((c = u.call({ lexer: this }, l)),
              typeof c == "number" && c >= 0 && (a = Math.min(a, c)));
          }),
            a < 1 / 0 && a >= 0 && (s = t.substring(0, a + 1)));
        }
        if (this.state.top && (o = this.tokenizer.paragraph(s))) {
          let a = r.at(-1);
          (n && a?.type === "paragraph"
            ? ((a.raw +=
                (a.raw.endsWith(`
`)
                  ? ""
                  : `
`) + o.raw),
              (a.text +=
                `
` + o.text),
              this.inlineQueue.pop(),
              (this.inlineQueue.at(-1).src = a.text))
            : r.push(o),
            (n = s.length !== t.length),
            (t = t.substring(o.raw.length)));
          continue;
        }
        if ((o = this.tokenizer.text(t))) {
          t = t.substring(o.raw.length);
          let a = r.at(-1);
          a?.type === "text"
            ? ((a.raw +=
                (a.raw.endsWith(`
`)
                  ? ""
                  : `
`) + o.raw),
              (a.text +=
                `
` + o.text),
              this.inlineQueue.pop(),
              (this.inlineQueue.at(-1).src = a.text))
            : r.push(o);
          continue;
        }
        if (t) {
          this.infiniteLoopError(t.charCodeAt(0));
          break;
        }
      }
      return ((this.state.top = !0), r);
    }
    inline(t, r = []) {
      return (this.inlineQueue.push({ src: t, tokens: r }), r);
    }
    linkInText(t) {
      if (!t.includes("[")) return !1;
      let r = this.tokenizer.rules.inline.link;
      for (let n of t.matchAll(this.tokenizer.rules.inline.blockSkip))
        if (r.test(n[0]) && t.charAt(n.index - 1) !== "!") return !0;
      for (let n of t.matchAll(this.tokenizer.rules.inline.reflinkSearch)) {
        let i = n[0],
          o = i.lastIndexOf("[");
        if (
          !(i.charAt(0) === "!" || !Object.hasOwn(this.tokens.links, Dx(i.slice(o + 1, -1)))) &&
          !(o > 1 && this.linkInText(i.slice(1, o - 1)))
        )
          return !0;
      }
      return !1;
    }
    inlineTokens(t, r = []) {
      this.tokenizer.lexer = this;
      let n = this.state.linkParenPossible;
      this.state.linkParenPossible = n && t.includes(")");
      try {
        return this.#t(t, r);
      } finally {
        this.state.linkParenPossible = n;
      }
    }
    #t(t, r) {
      let n = t;
      if (this.tokens.links && t.includes("[")) {
        let a = this.tokenizer.rules.inline.reflinkSearch,
          l = (c) => {
            let u = c.lastIndexOf("[");
            if (!Object.hasOwn(this.tokens.links, Dx(c.slice(u + 1, -1)))) return c;
            if (u > 1 && c.charAt(0) !== "!") {
              let d = c.slice(1, u - 1);
              if (this.linkInText(d))
                return "[" + d.replace(a, l) + "][" + "a".repeat(c.length - u - 2) + "]";
            }
            return "[" + "a".repeat(c.length - 2) + "]";
          };
        n = n.replace(a, l);
      }
      ((n = n.replace(this.tokenizer.rules.inline.anyPunctuationOutsideCode, (a, l, c) =>
        c ? "+".repeat(a.length) : l ? l + a.slice(l.length, -l.length).replace(/`/g, "+") + l : a,
      )),
        (n = n.replace(this.tokenizer.rules.inline.blockSkip, (a, l, c) => {
          let u = c ? c.length : 0;
          return a.slice(0, u) + "[" + "a".repeat(a.length - u - 2) + "]";
        })),
        (n = this.options.hooks?.emStrongMask?.call({ lexer: this }, n) ?? n));
      let i = !1,
        o = "",
        s = 1 / 0;
      for (; t; ) {
        if (t.length < s) s = t.length;
        else {
          this.infiniteLoopError(t.charCodeAt(0));
          break;
        }
        (i || (o = ""), (i = !1));
        let a;
        if (
          this.options.extensions?.inline?.some((c) =>
            (a = c.call({ lexer: this }, t, r))
              ? ((t = t.substring(a.raw.length)), r.push(a), !0)
              : !1,
          )
        )
          continue;
        if ((a = this.tokenizer.escape(t))) {
          ((t = t.substring(a.raw.length)), r.push(a));
          continue;
        }
        if ((a = this.tokenizer.tag(t))) {
          ((t = t.substring(a.raw.length)), r.push(a));
          continue;
        }
        if ((a = this.tokenizer.link(t))) {
          ((t = t.substring(a.raw.length)), r.push(a));
          continue;
        }
        if ((a = this.tokenizer.reflink(t, this.tokens.links))) {
          t = t.substring(a.raw.length);
          let c = r.at(-1);
          a.type === "text" && c?.type === "text"
            ? ((c.raw += a.raw), (c.text += a.text))
            : r.push(a);
          continue;
        }
        if ((a = this.tokenizer.emStrong(t, n, o))) {
          ((t = t.substring(a.raw.length)), r.push(a));
          continue;
        }
        if ((a = this.tokenizer.codespan(t))) {
          ((t = t.substring(a.raw.length)), r.push(a));
          continue;
        }
        if ((a = this.tokenizer.br(t))) {
          ((t = t.substring(a.raw.length)), r.push(a));
          continue;
        }
        if ((a = this.tokenizer.del(t, n, o))) {
          ((t = t.substring(a.raw.length)), r.push(a));
          continue;
        }
        if ((a = this.tokenizer.autolink(t))) {
          ((t = t.substring(a.raw.length)), r.push(a));
          continue;
        }
        if (!this.state.inLink && (a = this.tokenizer.url(t))) {
          ((t = t.substring(a.raw.length)), r.push(a));
          continue;
        }
        let l = t;
        if (this.options.extensions?.startInline) {
          let c = 1 / 0,
            u = t.slice(1),
            d;
          (this.options.extensions.startInline.forEach((h) => {
            ((d = h.call({ lexer: this }, u)),
              typeof d == "number" && d >= 0 && (c = Math.min(c, d)));
          }),
            c < 1 / 0 && c >= 0 && (l = t.substring(0, c + 1)));
        }
        if ((a = this.tokenizer.inlineText(l))) {
          ((t = t.substring(a.raw.length)),
            a.raw.slice(-1) !== "_" && (o = a.raw.slice(-1)),
            (i = !0));
          let c = r.at(-1);
          c?.type === "text" ? ((c.raw += a.raw), (c.text += a.text)) : r.push(a);
          continue;
        }
        if (t) {
          this.infiniteLoopError(t.charCodeAt(0));
          break;
        }
      }
      return r;
    }
    infiniteLoopError(t) {
      let r = "Infinite loop on byte: " + t;
      if (this.options.silent);
      else throw Error(r);
    }
  },
  Jp = class {
    options;
    parser;
    constructor(e) {
      this.options = e || kf;
    }
    space(e) {
      return "";
    }
    code({ text: e, lang: t, escaped: r }) {
      let n = (t || "").match(Bo.notSpaceStart)?.[0],
        i = e
          ? e.replace(Bo.endingNewline, "") +
            `
`
          : "";
      return n
        ? '<pre><code class="language-' +
            Ca(n) +
            '">' +
            (r ? i : Ca(i, !0)) +
            `</code></pre>
`
        : "<pre><code>" +
            (r ? i : Ca(i, !0)) +
            `</code></pre>
`;
    }
    blockquote({ tokens: e }) {
      return `<blockquote>
${this.parser.parse(e)}</blockquote>
`;
    }
    html({ text: e }) {
      return e;
    }
    def(e) {
      return "";
    }
    heading({ tokens: e, depth: t }) {
      return `<h${t}>${this.parser.parseInline(e)}</h${t}>
`;
    }
    hr(e) {
      return `<hr>
`;
    }
    list(e) {
      let { ordered: t, start: r } = e,
        n = "";
      for (let s = 0; s < e.items.length; s++) {
        let a = e.items[s];
        n += this.listitem(a);
      }
      let i = t ? "ol" : "ul",
        o = t && r !== 1 ? ' start="' + r + '"' : "";
      return (
        "<" +
        i +
        o +
        `>
` +
        n +
        "</" +
        i +
        `>
`
      );
    }
    listitem(e) {
      return `<li>${this.parser.parse(e.tokens)}</li>
`;
    }
    checkbox({ checked: e }) {
      return "<input " + (e ? 'checked="" ' : "") + 'disabled="" type="checkbox"> ';
    }
    paragraph({ tokens: e }) {
      return `<p>${this.parser.parseInline(e)}</p>
`;
    }
    table(e) {
      let t = "",
        r = "";
      for (let i = 0; i < e.header.length; i++) r += this.tablecell(e.header[i]);
      t += this.tablerow({ text: r });
      let n = "";
      for (let i = 0; i < e.rows.length; i++) {
        let o = e.rows[i];
        r = "";
        for (let s = 0; s < o.length; s++) r += this.tablecell(o[s]);
        n += this.tablerow({ text: r });
      }
      return (
        n && (n = `<tbody>${n}</tbody>`),
        `<table>
<thead>
` +
          t +
          `</thead>
` +
          n +
          `</table>
`
      );
    }
    tablerow({ text: e }) {
      return `<tr>
${e}</tr>
`;
    }
    tablecell(e) {
      let t = this.parser.parseInline(e.tokens),
        r = e.header ? "th" : "td";
      return (
        (e.align ? `<${r} align="${e.align}">` : `<${r}>`) +
        t +
        `</${r}>
`
      );
    }
    strong({ tokens: e }) {
      return `<strong>${this.parser.parseInline(e)}</strong>`;
    }
    em({ tokens: e }) {
      return `<em>${this.parser.parseInline(e)}</em>`;
    }
    codespan({ text: e }) {
      return `<code>${Ca(e, !0)}</code>`;
    }
    br(e) {
      return "<br>";
    }
    del({ tokens: e }) {
      return `<del>${this.parser.parseInline(e)}</del>`;
    }
    link({ href: e, title: t, text: r, tokens: n, autolink: i }) {
      let o = i ? Ca(r, !0) : this.parser.parseInline(n),
        s = BB(e);
      if (s === null) return o;
      e = Ca(s, i);
      let a = '<a href="' + e + '"';
      return (t && (a += ' title="' + Ca(t) + '"'), (a += ">" + o + "</a>"), a);
    }
    image({ href: e, title: t, text: r, tokens: n }) {
      n && (r = this.parser.parseInline(n, this.parser.textRenderer));
      let i = BB(e);
      if (i === null) return Ca(r);
      e = i;
      let o = `<img src="${Ca(e)}" alt="${Ca(r)}"`;
      return (t && (o += ` title="${Ca(t)}"`), (o += ">"), o);
    }
    text(e) {
      return "tokens" in e && e.tokens
        ? this.parser.parseInline(e.tokens)
        : "escaped" in e && e.escaped
          ? e.text
          : Ca(e.text);
    }
  },
  x5 = class {
    strong({ text: e }) {
      return e;
    }
    em({ text: e }) {
      return e;
    }
    codespan({ text: e }) {
      return e;
    }
    del({ text: e }) {
      return e;
    }
    html({ text: e }) {
      return e;
    }
    text({ text: e }) {
      return e;
    }
    link({ text: e }) {
      return "" + e;
    }
    image({ text: e }) {
      return "" + e;
    }
    br() {
      return "";
    }
    checkbox({ raw: e }) {
      return e;
    }
  },
  Hl = class e {
    options;
    renderer;
    textRenderer;
    constructor(t) {
      ((this.options = t || kf),
        (this.options.renderer = this.options.renderer || new Jp()),
        (this.renderer = this.options.renderer),
        (this.renderer.options = this.options),
        (this.renderer.parser = this),
        (this.textRenderer = new x5()));
    }
    static parse(t, r) {
      return new e(r).parse(t);
    }
    static parseInline(t, r) {
      return new e(r).parseInline(t);
    }
    parse(t) {
      this.renderer.parser = this;
      let r = "";
      for (let n = 0; n < t.length; n++) {
        let i = t[n];
        if (this.options.extensions?.renderers?.[i.type]) {
          let s = i,
            a = this.options.extensions.renderers[s.type].call({ parser: this }, s);
          if (
            a !== !1 ||
            ![
              "space",
              "hr",
              "heading",
              "code",
              "table",
              "blockquote",
              "list",
              "checkbox",
              "html",
              "def",
              "paragraph",
              "text",
            ].includes(s.type)
          ) {
            r += a || "";
            continue;
          }
        }
        let o = i;
        switch (o.type) {
          case "space": {
            r += this.renderer.space(o);
            break;
          }
          case "hr": {
            r += this.renderer.hr(o);
            break;
          }
          case "heading": {
            r += this.renderer.heading(o);
            break;
          }
          case "code": {
            r += this.renderer.code(o);
            break;
          }
          case "table": {
            r += this.renderer.table(o);
            break;
          }
          case "blockquote": {
            r += this.renderer.blockquote(o);
            break;
          }
          case "list": {
            r += this.renderer.list(o);
            break;
          }
          case "checkbox": {
            r += this.renderer.checkbox(o);
            break;
          }
          case "html": {
            r += this.renderer.html(o);
            break;
          }
          case "def": {
            r += this.renderer.def(o);
            break;
          }
          case "paragraph": {
            r += this.renderer.paragraph(o);
            break;
          }
          case "text": {
            r += this.renderer.text(o);
            break;
          }
          default: {
            let s = 'Token with "' + o.type + '" type was not found.';
            if (this.options.silent) return "";
            throw Error(s);
          }
        }
      }
      return r;
    }
    parseInline(t, r = this.renderer) {
      this.renderer.parser = this;
      let n = "";
      for (let i = 0; i < t.length; i++) {
        let o = t[i];
        if (this.options.extensions?.renderers?.[o.type]) {
          let a = this.options.extensions.renderers[o.type].call({ parser: this }, o);
          if (
            a !== !1 ||
            ![
              "escape",
              "html",
              "link",
              "image",
              "checkbox",
              "strong",
              "em",
              "codespan",
              "br",
              "del",
              "text",
            ].includes(o.type)
          ) {
            n += a || "";
            continue;
          }
        }
        let s = o;
        switch (s.type) {
          case "escape": {
            n += r.text(s);
            break;
          }
          case "html": {
            n += r.html(s);
            break;
          }
          case "link": {
            n += r.link(s);
            break;
          }
          case "image": {
            n += r.image(s);
            break;
          }
          case "checkbox": {
            n += r.checkbox(s);
            break;
          }
          case "strong": {
            n += r.strong(s);
            break;
          }
          case "em": {
            n += r.em(s);
            break;
          }
          case "codespan": {
            n += r.codespan(s);
            break;
          }
          case "br": {
            n += r.br(s);
            break;
          }
          case "del": {
            n += r.del(s);
            break;
          }
          case "text": {
            n += r.text(s);
            break;
          }
          default: {
            let a = 'Token with "' + s.type + '" type was not found.';
            if (this.options.silent) return "";
            throw Error(a);
          }
        }
      }
      return n;
    }
  },
  Og = class {
    options;
    block;
    constructor(e) {
      this.options = e || kf;
    }
    static passThroughHooks = /*@__PURE__*/ new Set([
      "preprocess",
      "postprocess",
      "processAllTokens",
      "emStrongMask",
    ]);
    static passThroughHooksRespectAsync = /*@__PURE__*/ new Set([
      "preprocess",
      "postprocess",
      "processAllTokens",
    ]);
    preprocess(e) {
      return e;
    }
    postprocess(e) {
      return e;
    }
    processAllTokens(e) {
      return e;
    }
    emStrongMask(e) {
      return e;
    }
    provideLexer(e = this.block) {
      return e ? Ul.lex : Ul.lexInline;
    }
    provideParser(e = this.block) {
      return e ? Hl.parse : Hl.parseInline;
    }
  };
function Df(e, t) {
  if (Array.isArray(t)) for (let r = 0; r < t.length; r++) e.push(t[r]);
  else e.push(t);
}
var Vq = class {
    defaults = h5();
    options = this.setOptions;
    parse = this.parseMarkdown(!0);
    parseInline = this.parseMarkdown(!1);
    Parser = Hl;
    Renderer = Jp;
    TextRenderer = x5;
    Lexer = Ul;
    Tokenizer = Nx;
    Hooks = Og;
    constructor(...e) {
      this.use(...e);
    }
    walkTokens(e, t) {
      let r = [];
      for (let n of e)
        switch ((Df(r, t.call(this, n)), n.type)) {
          case "table": {
            let i = n;
            for (let o of i.header) Df(r, this.walkTokens(o.tokens, t));
            for (let o of i.rows) for (let s of o) Df(r, this.walkTokens(s.tokens, t));
            break;
          }
          case "list": {
            let i = n;
            Df(r, this.walkTokens(i.items, t));
            break;
          }
          default: {
            let i = n;
            this.defaults.extensions?.childTokens?.[i.type]
              ? this.defaults.extensions.childTokens[i.type].forEach((o) => {
                  let s = i[o].flat(1 / 0);
                  Df(r, this.walkTokens(s, t));
                })
              : i.tokens && Df(r, this.walkTokens(i.tokens, t));
          }
        }
      return r;
    }
    use(...e) {
      let t = this.defaults.extensions || { renderers: {}, childTokens: {} };
      return (
        e.forEach((r) => {
          let n = { ...r };
          if (
            ((n.async = this.defaults.async || n.async || !1),
            r.extensions &&
              (r.extensions.forEach((i) => {
                if (!i.name) throw Error("extension name required");
                if ("renderer" in i) {
                  let o = t.renderers[i.name];
                  o
                    ? (t.renderers[i.name] = function (...s) {
                        let a = i.renderer.apply(this, s);
                        return (a === !1 && (a = o.apply(this, s)), a);
                      })
                    : (t.renderers[i.name] = i.renderer);
                }
                if ("tokenizer" in i) {
                  if (!i.level || (i.level !== "block" && i.level !== "inline"))
                    throw Error("extension level must be 'block' or 'inline'");
                  let o = t[i.level];
                  (o ? o.unshift(i.tokenizer) : (t[i.level] = [i.tokenizer]),
                    i.start &&
                      (i.level === "block"
                        ? t.startBlock
                          ? t.startBlock.push(i.start)
                          : (t.startBlock = [i.start])
                        : i.level === "inline" &&
                          (t.startInline
                            ? t.startInline.push(i.start)
                            : (t.startInline = [i.start]))));
                }
                "childTokens" in i && i.childTokens && (t.childTokens[i.name] = i.childTokens);
              }),
              (n.extensions = t)),
            r.renderer)
          ) {
            let i = this.defaults.renderer || new Jp(this.defaults);
            for (let o in r.renderer) {
              if (!(o in i)) throw Error(`renderer '${o}' does not exist`);
              if (["options", "parser"].includes(o)) continue;
              let s = o,
                a = r.renderer[s],
                l = i[s];
              i[s] = (...c) => {
                let u = a.apply(i, c);
                return (u === !1 && (u = l.apply(i, c)), u || "");
              };
            }
            n.renderer = i;
          }
          if (r.tokenizer) {
            let i = this.defaults.tokenizer || new Nx(this.defaults);
            for (let o in r.tokenizer) {
              if (!(o in i)) throw Error(`tokenizer '${o}' does not exist`);
              if (["options", "rules", "lexer"].includes(o)) continue;
              let s = o,
                a = r.tokenizer[s],
                l = i[s];
              i[s] = (...c) => {
                let u = a.apply(i, c);
                return (u === !1 && (u = l.apply(i, c)), u);
              };
            }
            n.tokenizer = i;
          }
          if (r.hooks) {
            let i = this.defaults.hooks || new Og();
            for (let o in r.hooks) {
              if (!(o in i)) throw Error(`hook '${o}' does not exist`);
              if (["options", "block"].includes(o)) continue;
              let s = o,
                a = r.hooks[s],
                l = i[s];
              Og.passThroughHooks.has(o)
                ? (i[s] = (c) => {
                    if (this.defaults.async && Og.passThroughHooksRespectAsync.has(o))
                      return (async () => {
                        let d = await a.call(i, c);
                        return l.call(i, d);
                      })();
                    let u = a.call(i, c);
                    return l.call(i, u);
                  })
                : (i[s] = (...c) => {
                    if (this.defaults.async)
                      return (async () => {
                        let d = await a.apply(i, c);
                        return (d === !1 && (d = await l.apply(i, c)), d);
                      })();
                    let u = a.apply(i, c);
                    return (u === !1 && (u = l.apply(i, c)), u);
                  });
            }
            n.hooks = i;
          }
          if (r.walkTokens) {
            let i = this.defaults.walkTokens,
              o = r.walkTokens;
            n.walkTokens = function (s) {
              let a = [];
              return (a.push(o.call(this, s)), i && Df(a, i.call(this, s)), a);
            };
          }
          this.defaults = { ...this.defaults, ...n };
        }),
        this
      );
    }
    setOptions(e) {
      return ((this.defaults = { ...this.defaults, ...e }), this);
    }
    lexer(e, t) {
      return Ul.lex(e, t ?? this.defaults);
    }
    parser(e, t) {
      return Hl.parse(e, t ?? this.defaults);
    }
    parseMarkdown(e) {
      return (t, r) => {
        let n = { ...r },
          i = { ...this.defaults, ...n },
          o = this.onError(!!i.silent, !!i.async);
        if (this.defaults.async === !0 && n.async === !1)
          return o(
            Error(
              "marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise.",
            ),
          );
        if (typeof t > "u" || t === null)
          return o(Error("marked(): input parameter is undefined or null"));
        if (typeof t != "string")
          return o(
            Error(
              "marked(): input parameter is of type " +
                Object.prototype.toString.call(t) +
                ", string expected",
            ),
          );
        if ((i.hooks && ((i.hooks.options = i), (i.hooks.block = e)), i.async))
          return (async () => {
            let s = i.hooks ? await i.hooks.preprocess(t) : t,
              a = await (i.hooks ? await i.hooks.provideLexer(e) : e ? Ul.lex : Ul.lexInline)(s, i),
              l = i.hooks ? await i.hooks.processAllTokens(a) : a;
            i.walkTokens && (await Promise.all(this.walkTokens(l, i.walkTokens)));
            let c = await (
              i.hooks ? await i.hooks.provideParser(e) : e ? Hl.parse : Hl.parseInline
            )(l, i);
            return i.hooks ? await i.hooks.postprocess(c) : c;
          })().catch(o);
        try {
          i.hooks && (t = i.hooks.preprocess(t));
          let s = (i.hooks ? i.hooks.provideLexer(e) : e ? Ul.lex : Ul.lexInline)(t, i);
          (i.hooks && (s = i.hooks.processAllTokens(s)),
            i.walkTokens && this.walkTokens(s, i.walkTokens));
          let a = (i.hooks ? i.hooks.provideParser(e) : e ? Hl.parse : Hl.parseInline)(s, i);
          return (i.hooks && (a = i.hooks.postprocess(a)), a);
        } catch (s) {
          return o(s);
        }
      };
    }
    onError(e, t) {
      return (r) => {
        if (
          ((r.message += `
Please report this to https://github.com/markedjs/marked.`),
          e)
        ) {
          let n = "<p>An error occurred:</p><pre>" + Ca(r.message + "", !0) + "</pre>";
          return t ? Promise.resolve(n) : n;
        }
        if (t) return Promise.reject(r);
        throw r;
      };
    }
  },
  Pf = new Vq();
function Pn(e, t) {
  return Pf.parse(e, t);
}
Pn.options = Pn.setOptions = function (e) {
  return (Pf.setOptions(e), (Pn.defaults = Pf.defaults), UB(Pn.defaults), Pn);
};
Pn.getDefaults = h5;
Pn.defaults = kf;
function Wq(...e) {
  return (Pf.use(...e), (Pn.defaults = Pf.defaults), UB(Pn.defaults), Pn);
}
Pn.use = Wq;
Pn.walkTokens = function (e, t) {
  return Pf.walkTokens(e, t);
};
Pn.parseInline = Pf.parseInline;
Pn.Parser = Hl;
Pn.parser = Hl.parse;
Pn.Renderer = Jp;
Pn.TextRenderer = x5;
Pn.Lexer = Ul;
Pn.lexer = Ul.lex;
Pn.Tokenizer = Nx;
Pn.Hooks = Og;
Pn.parse = Pn;
var { options: G2e, setOptions: z2e, walkTokens: V2e, parseInline: W2e } = Pn,
  jB = Pn,
  Q2e = Hl.parse,
  Y2e = Ul.lex;
