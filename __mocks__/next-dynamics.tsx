const dynamic = (fn: () => Promise<{ default: React.ComponentType }>) => {
  return function MockDynamic() {
    return null;
  };
};
export default dynamic;
