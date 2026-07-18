import * as React from "react";

export const MOBILE_QUERY = "(max-width: 767px)";
export const TABLET_OR_BELOW_QUERY = "(max-width: 1023px)";
export const TABLET_QUERY = "(min-width: 768px) and (max-width: 1023px)";
export const DESKTOP_QUERY = "(min-width: 1024px)";


export function useMediaQuery(query?: string) {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia(query ?? MOBILE_QUERY);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMatches(media.matches);

    const listener = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}
