import type { NavItem } from "@/types/nav";

/**
 * Classic Levenshtein edit distance.
 */
function levenshtein(a: string, b: string): number {
  const dp: number[][] = Array.from({ length: a.length + 1 }, (_, i) =>
    Array.from({ length: b.length + 1 }, (_, j) =>
      i === 0 ? j : j === 0 ? i : 0,
    ),
  );

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }

  return dp[a.length][b.length];
}

/**
 * Turns "/blog/my-post_idea" -> "blog my post idea"
 * so hrefs and titles compare on a level footing.
 */
function normalize(str: string): string {
  return str
    .toLowerCase()
    .replace(/^\/+|\/+$/g, "")
    .replace(/[-_/]+/g, " ")
    .replace(/[^a-z0-9 ]/g, "")
    .trim();
}

function similarity(a: string, b: string): number {
  if (!a && !b) return 1;
  const distance = levenshtein(a, b);
  const maxLen = Math.max(a.length, b.length, 1);
  return 1 - distance / maxLen;
}

export interface FindRelatedLinksOptions {
  /** Max number of suggestions to return. Default 3. */
  limit?: number;
  /** Minimum score (0-1) required to be considered "related". Default 0.3. */
  threshold?: number;
}

/**
 * Scores every NavItem against the attempted pathname using a blend of
 * whole-string edit-distance similarity and token overlap, then returns
 * the best matches above the threshold.
 *
 * Handles typos ("/projcts" -> "/projects"), renamed routes
 * ("/writing/foo" -> "/blog/foo" because "writing" and "blog" don't
 * overlap but nested slugs do), and partial paths ("/blog" matching
 * "/blog/my-post").
 */
export function findRelatedLinks<T extends string>(
  pathname: string,
  navItems: NavItem<T>[],
  options: FindRelatedLinksOptions = {},
): NavItem<T>[] {
  const { limit = 3, threshold = 0.3 } = options;

  const target = normalize(pathname);
  const targetTokens = new Set(target.split(" ").filter(Boolean));

  const scored = navItems.map((item) => {
    const hrefNorm = normalize(item.href);
    const titleNorm = normalize(item.title);

    const hrefScore = similarity(target, hrefNorm);
    const titleScore = similarity(target, titleNorm);

    const itemTokens = new Set(
      [...hrefNorm.split(" "), ...titleNorm.split(" ")].filter(Boolean),
    );
    const overlap = [...targetTokens].filter((t) => itemTokens.has(t)).length;
    const tokenScore = targetTokens.size ? overlap / targetTokens.size : 0;

    // Whole-string similarity catches typos, token overlap catches
    // renamed/restructured routes. Blend both.
    const score = Math.max(hrefScore, titleScore) * 0.6 + tokenScore * 0.4;

    return { item, score };
  });

  return scored
    .filter((s) => s.score >= threshold)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.item);
}
