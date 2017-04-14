import L from 'leaflet';
import utils from '@/utils/utils';

const instances = {};

const controls = {

  legend(styles) {
    this.styles = styles || {};
    const legend = L.control({ position: 'bottomright' });

    legend.onAdd = function () {
      this.$el = L.DomUtil.create('section', 'info legend');
      this.update(styles);
      return this.$el;
    };

    legend.update = function (props) {
      this.$el.innerHTML = this.template(props);
    };

    legend.template = function (props) {
      return `
        <h4>Population ranges</h4>
        <ul>
          ${props.fillColors.map((color, i) => `
            <li>
              <i style="background:${utils.getColor(props.fillColors[i].count, props.fillColors)}"></i>
              <em>+${props.fillColors[i].count}</em>
            </li>
          `).join('')}
        </ul>
      `;
    };

    return legend;
  },

  info(styles) {
    this.styles = styles || {};

    const info = L.control();

    info.onAdd = function () {
      this.$el = L.DomUtil.create('section', 'info');
      this.update();
      return this.$el;
    };

    info.update = function (props) {
      this.$el.innerHTML = this.template(props);
    };

    info.template = function (props) {
      const text = props ? `<strong>${props.name}, ${props.adm0name}</strong><em>${props.pop_max.toLocaleString()} people</em>` : 'Hover over a city';
      return `
        <h4>World cities proper by population</h4>
        ${text}
      `;
    };

    return info;
  },

};

function get(c) {
  return instances[c];
}

function add(c, options) {
  if (!instances.hasOwnProperty(c)){
    instances[c] = controls[c](options);
  }
  return instances[c];
}

export default { get, add };
