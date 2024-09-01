const generateInitialCells = (size: number) =>
  Array.from({ length: size }, (_value, outerIndex) => {
    if (outerIndex === 0 || outerIndex === size - 1) {
      return Array.from({ length: size }, () => ({
        isActive: false,
        isInner: false,
      }));
    }
    return Array.from({ length: size }, (_value, innerIndex) => ({
      isActive: false,
      isInner: innerIndex !== 0 && innerIndex !== size - 1,
    }));
  });

export default generateInitialCells;
