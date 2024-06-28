function capitalize(text: string | undefined): string {
  if (!text) return '';
  return text?.charAt(0).toUpperCase() + text.slice(1);
}

export { capitalize };
