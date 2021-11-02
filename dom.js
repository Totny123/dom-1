window.dom = {
  create(string) {
    const container = document.createElement("template");
    container.innerHTML = string.trim();
    return container.content.firstChild;
  },
  after(node, node2) {
    node.parentNode.insertBefore(node2, node.nextElementSibling);
  },
  before(node, node2) {
    node.parentNode.insertBefore(node2, node);
  },
  append(parent, node) {
    parent.appendChild(node);
  },
  wrap(node, parent) {
    dom.before(node, parent);
    dom.append(parent, node);
  },
  remove(node) {
    node.parentNode.removeChild(node);
    return node;
  },
  empty(node) {
    let children = [];
    Array.from(node.children).forEach((item) => children.push(item));
    node.innerHTML = "";
    return children;
  },
  attr(node, name, value) {
    if (arguments.length === 2) {
      return node.getAttribute(name);
    } else if (arguments.length === 3) {
      node.setAttribute(name, value);
    }
  },
  text(node, text) {
    if (arguments.length === 1) {
      return node.innerText;
    } else if (arguments.length === 2) {
      node.innerText = text;
    }
  },
  html(node, text) {
    if (arguments.length === 1) {
      return node.innerHTML;
    } else if (arguments.length === 2) {
      node.innerHTML = text;
    }
  },
  style(node, name, value) {
    if (arguments.length === 3) {
      node.style[name] = value;
    } else if (arguments.length === 2) {
      if (name instanceof Object) {
        for (let key in name) {
          node.style[key] = name[key];
        }
      } else if (typeof name === "string") {
        return node.style[name];
      }
    }
  },
  class: {
    add(node, className) {
      if (className.indexOf(" ") !== -1) {
        className = className.split(" ");
        className.forEach((item) => {
          node.classList.add(item);
        });
      } else {
        node.classList.add(className);
      }
    },
    remove(node, className) {
      if (className.indexOf(" ") !== -1) {
        className = className.split(" ");
        className.forEach((item) => {
          node.classList.remove(item);
        });
      } else {
        node.classList.remove(className);
      }
    },
  },
  on(node, eventName, fn) {
    node.addEventListener(eventName, fn);
  },
  off(node, eventName, fn) {
    node.removeEventListener(eventName, fn);
  },
  find(selector, scope) {
    return (scope || document).querySelectorAll(selector);
  },
  parent(node) {
    return node.parentNode;
  },
  children(node) {
    return node.children;
  },
  siblings(node) {
    return Array.from(dom.children(node.parentNode)).filter((item) => {
      return item !== node;
    });
  },
  next(node) {
    return node.nextElementSibling;
  },
  previous(node) {
    return node.previousElementSibling;
  },
  each(nodes, fn) {
    nodes = Array.from(nodes);
    for (let item of nodes) {
      fn.call(null, item);
    }
  },
  index(node) {
    let result = -1;
    Array.from(node.parentNode.children).forEach((item, index) => {
      item === node && (result = index);
    });
    return result;
  },
};
