import L from 'leaflet';
import provider from '@/core/provider';
import controls from '@/utils/controls';
import req from '@/utils/request';

/**
* Map - A class to create a Map with the layers and initial options
*/
export class Map {


  /**
   * constructor
   *
   * @param {object}              options about map settings
   * @param {string|HTMLElement}  target place where the map will be
   * @param {Object}              layers to include on the map
   *
   * @return {type} Description
   */
  constructor(options, target, layers) {
    this.options = options;
    this.layers = layers;

    const { map, tileLayer, geoJSON, styles } = options;

    this
    .create(map, target)
    .addTileLayer(tileLayer)
    .load(geoJSON.url, (data) => {
      this.applyLayers(layers, data, options);
      this.addControls(styles);
    });
  }

  /**
   * create - Creates the map using Leaflet
   *
   * @param {object}              map settings
   * @param {string|HTMLElement}  target place where the map will be
   *
   * @return {object} instance self
   */
  create(map, target) {
    this.map = L.map(target, { renderer: L.svg() }).setView(map.coordinates, map.zoom);

    return this;
  }

  /**
   * addTileLayer - Creates the tile layer using Leaflet
   *
   * @param {type} tileLayer settings
   *
   * @return {object} instance self
   */
  addTileLayer(tileLayer) {
    L.tileLayer(tileLayer.url, tileLayer.options).addTo(this.map);

    return this;
  }

  /**
   * applyLayers - Includes layers on the map
   *
   * @param {object} layers to include on the map
   * @param {object} data geoJSON data ready to use
   * @param {object} options to apply layer settings
   * TODO - In a future we can have an array layers with its specific config
   * @return {object} instance self
   */
  applyLayers(layers, data, options) {
    Object.keys(layers).forEach((key) => {
      const l = layers[key](data, options);
      provider.add(key, l);
      l.layer.addTo(this.map);
      this.map.fitBounds(l.layer.getBounds());
    });

    return this;
  }

  /**
   * load - Gets geoJSON data and execute the callback
   *
   * @param {string}    url to get the geoJSON (local or server)
   * @param {function}  cb callback to be executed after the data loading
   *
   * @return {Promise} the request data response
   */
  load(url, cb) {
    return req.get({ url }).then(data => cb(data));
  }

  /**
   * addControls - Adds Leaflet controls to the map
   *
   * @param {object} styles with map style settings to be applied
   *
   */
  addControls(styles) {
    controls.add('info', styles).addTo(this.map);
    controls.add('legend', styles).addTo(this.map);
  }

}

export default function (options, target, layers) {
  return new Map(options, target, layers);
}
