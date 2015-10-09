const doc = document;

export default {
  id(id) {
    return doc.getElementById(id);
  },

  select(selector) {
    return doc.querySelector(selector);
  },

  selectAll(selector) {
    return doc.querySelectorAll(selector);
  },

  body: {
    width() {
      return Math.max(document.documentElement.clientWidth, window.innerWidth);
    }
  }
};
