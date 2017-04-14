class Component {

  /**
   * constructor
   *
   * @param {type} props options to be applied
   *
   */
  constructor(props) {
    this.props = props;
    this.$el = this.render();
    this.addListeners();
  }

  /**
   * template - Gets the DOM using ES& templates
   *
   * @return {string} to be added to the DOM
   */
  template() {}

  /**
   * DOMEvents - Gets all DOM events from the window/document register
   * @example - <input type="color" @change="cb">
   * @return {array} all events to be captured when the template use it
   */
  get DOMEvents() {
    return Object.getOwnPropertyNames(document)
    .concat(Object.getOwnPropertyNames(Object.getPrototypeOf(Object.getPrototypeOf(document))))
    .concat(Object.getOwnPropertyNames(Object.getPrototypeOf(window)))
    .filter(i => !i.indexOf('on') && (document[i] === null || typeof document[i] === 'function'))
    .filter((elem, pos, self) => self.indexOf(elem) === pos)
    .map(event => event.replace('on', ''));
  }

  /**
   * eventListeners - Adds and remove event listeners from the template
   *
   * @param {string} actionEventListener to be applied in elements which are using @eventName
   *
   */
  eventListeners(actionEventListener) {
    this.DOMEvents.forEach((evt) => {
      this.$el.querySelectorAll(`[\\@${evt}]`).forEach((elem) => {
        elem[actionEventListener](evt, this.eventHandler()[elem.getAttribute(`@${evt}`)].bind(this), false);
      });
    });
  }

  /**
   * eventHandler - Execute the callbacks that belongs to elements from template
   *
   * @return {object} with each callbacks
   */
  eventHandler() {}

  /**
   * addListeners - Calls eventListeners to add the native addEventListener
   *
   */
  addListeners() {
    this.eventListeners('addEventListener');
  }

  /**
   * addListeners - Calls eventListeners to add the native removeEventListener
   *
   */
  removeListeners() {
    this.eventListeners('removeEventListener');
  }

  /**
   * render - Creates a DocumentFragmentElement using the template
   *
   * @return {HTMLElement} DocumentFragment element
   */
  render() {
    const template = document.createRange().createContextualFragment(this.template());

    this.onRender();

    return template;
  }

  /**
   * onRender - A callback ables to be executed after render
   *
   */
  onRender() {}

  /**
   * remove - Removes elements and listeners
   *
   * @return {object} instance self
   */
  remove() {
    this.removeElement();
    this.removeListeners();

    return this;
  }

  /**
   * removeElement - Removes DOM element from the DOM
   *
   * @return {object} instance self
   */
  removeElement() {
    this.$el.remove();

    return this;
  }

}

export default Component;
