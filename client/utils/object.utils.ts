function filterNonNull<T extends object>(obj: T): Partial<T> {
  const nonNullObj: Partial<T> = {};
  Object.keys(obj).forEach((key) => {
    const value = obj[key as keyof T];
    if (value !== null) {
      nonNullObj[key as keyof T] = value;
    }
  });
  return nonNullObj;
}

export { filterNonNull };
