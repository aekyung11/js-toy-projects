import Nav from "./components/Nav.js";
import NewsList from "./components/NewsList.js";

const $root = document.querySelector("#root");

class App {
  constructor($container) {
    const originalGlobalState = { category: "all" };
    const [globalState, subscribeToGlobalState] =
      makeObservable(originalGlobalState);
    this.globalState = globalState;
    this.$nav = document.createElement("nav");
    this.$newsList = document.createElement("div");

    $container.appendChild(this.$nav);
    new Nav(this.$nav, this.globalState);
    $container.appendChild(this.$newsList);

    this.newsList = new NewsList(
      this.$newsList,
      this.globalState,
      subscribeToGlobalState
    );
  }
}

new App($root);

function makeObservable(target) {
  // 1. Initialize handlers store
  const handlers = [];

  // Store the handler function in array for future calls
  function subscribe(handler) {
    handlers.push(handler);
  }

  // 2. Create a proxy to handle changes
  const proxy = new Proxy(target, {
    set(target, property, value, receiver) {
      let success = Reflect.set(...arguments); // forward the operation to object
      if (success) {
        // if there were no error while setting the property
        // call all handlers
        handlers.forEach((handler) => handler(property, value));
      }
      return success;
    },
  });

  return [proxy, subscribe];
}

// example
/*
const originalUser = {};
const [user, subscribe] = makeObservable(originalUser);

subscribe((key, value) => {
  alert(`SET ${key}=${value}`);
});

user.name = "John";
*/
