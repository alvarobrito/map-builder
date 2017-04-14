import Component from '@/core/component';

class Container extends Component {

  /**
   * constructor
   *
   * @param {object} props extends options from the Component Class
   *
   */
  constructor(props) {
    super(props);
  }

  /**
   * show - Renders all slots, child DOM elements
   *
   * @return {object} instance self
   */
  show() {
    const slots = this.slots();

    Object.keys(slots).forEach(key => this.$el.querySelector(`[slot=${key}]`).appendChild(slots[key].$el));

    return this;
  }

  /**
   * slots - Interface with each slots
   *
   * @return {Object} with all slots
   */
  slots() {}

}

export default Container;
