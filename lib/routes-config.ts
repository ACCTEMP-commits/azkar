// for page navigation & to sort on leftbar

export type EachRoute = {
  title: string;
  href: string;
  noLink?: true; // noLink will create a route segment (section) but cannot be navigated
  items?: EachRoute[];
  tag?: string;
};

export const ROUTES: EachRoute[] = [
  {
    title: "الأذكار",
    href: "/getting-started",
    noLink: true,
    items: [
      { title: "أذكار الصباح", href: "/introduction" },
      {
        title: "أذكار المساء",
        href: "/installation",
      }, {
        title: "أذكار الاستيقاظ",
        href: "/azkar",
      }, {
        title: "أذكار النوم",
        href: "/azkar-nawm",
      },
      { title: "أذكار بعد التسليم من الصلاة", href: "/quick-start-guide" },
      {
        title: "الثناء على الله تعالى",
        href: "/project-structure",
      },
    ],
  },
];

type Page = { title: string; href: string };

function getRecurrsiveAllLinks(node: EachRoute) {
  const ans: Page[] = [];
  if (!node.noLink) {
    ans.push({ title: node.title, href: node.href });
  }
  node.items?.forEach((subNode) => {
    const temp = { ...subNode, href: `${node.href}${subNode.href}` };
    ans.push(...getRecurrsiveAllLinks(temp));
  });
  return ans;
}

export const page_routes = ROUTES.map((it) => getRecurrsiveAllLinks(it)).flat();
