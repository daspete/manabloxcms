export const stripTypename = (content: any, propToDelete = '__typename') => {
  for (const property in content) {
    if (
      (typeof content[property] === 'object' && typeof File === 'undefined') ||
      (typeof content[property] === 'object' && !(content[property] instanceof File))
    ) {
      content[property] = stripTypename(content[property], propToDelete);
    } else if (property === propToDelete) {
      delete content[property];
    }
  }

  return content;
}
