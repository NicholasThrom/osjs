const smallBreakpoint = 650;
const largeBreakpoint = 1000;

export const mediaQueries = {
    large: `@media (min-width: ${largeBreakpoint + 1}px)`,
    medium: `@media (min-width: ${smallBreakpoint + 1}px) and (max-width: ${largeBreakpoint}px)`,
    small: `@media (max-width: ${smallBreakpoint}px)`,
    notSmall: `@media (min-width: ${smallBreakpoint + 1}px)`,
    notLarge: `@media (max-width: ${largeBreakpoint}px)`,
};
