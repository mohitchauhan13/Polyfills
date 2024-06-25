const { areArraysEqual } = require("../helpers/areArraysEqual");

const initializeUseEffect = () => {
  let prevDependencies;
  let cleanupFunction;

  const useEffect = (effect, dependencies) => {
    const isFirstRun = !prevDependencies;
    const emptyDependencies = !dependencies || !dependencies.length;

    let hasDependenciesChanged = false;
    if (!isFirstRun) {
      hasDependenciesChanged = dependencies.some((each, i) => {
        if (Array.isArray(each) && Array.isArray(prevDependencies[i])) {
          return !areArraysEqual(each, prevDependencies[i]);
        }
        return !Object.is(each, prevDependencies[i]);
      });
    }

    if (isFirstRun) console.log("Mounted");
    else if (hasDependenciesChanged) console.log("Dependency Changed");

    const shouldUpdateEffect =
      emptyDependencies || isFirstRun || hasDependenciesChanged;

    if (shouldUpdateEffect) {
      if (typeof cleanupFunction === "function") {
        cleanupFunction();
        console.log("Clean up before next effect");
      }
      console.log("UseEffect");
      cleanupFunction = effect();
    }
    prevDependencies = dependencies;
  };

  const unmount = () => {
    if (typeof cleanupFunction === "function") {
      cleanupFunction();
      console.log("Unmounted");
    }
  };

  return { useEffect, unmount };
};

let users = [{ name: "Alice" }, { name: "Bob" }];
let activeUsers = [{ name: "Bob" }];

const { useEffect, unmount } = initializeUseEffect();

const render = () => {
  useEffect(() => {
    console.log("UseEffect Function Executed");

    return () => {
      console.log("Clean up Function Executed");
    };
  }, [users, activeUsers]);
};

render();
users = [{ name: "Alice" }, { name: "Charlie" }];
render();
unmount();
