export function sensiblespaces(str: string) {
  // No leading or trailing whitespace
  if (str.match(/^\s|\s$/)) {
    return false;
  }

  // No adjacent whitespace
  if (str.match(/\s\s/)) {
    return false;
  }

  return true;
}
