export const startWithRequirePath = (requirePaths, path) => {
  return requirePaths.some(pattern => {
    if (pattern.endsWith('**')) {
      const prefix = pattern.slice(0, -2);
      return path.startsWith(prefix);
    } else {
      return (
        path === pattern ||
        (path.startsWith(pattern) && path[pattern.length] === '/')
      );
    }
  });
};
