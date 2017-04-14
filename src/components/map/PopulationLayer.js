import L from 'leaflet';
import utils from '@/utils/utils';
import controls from '@/utils/controls';

export class PopulationLayer {

  /**
   * constructor
   *
   * @param {object} geoJSON data to be transformed
   * @param {object} options layer settings
   *
   */
  constructor(geoJSON, options) {
    this.options = options;

    this.layer = L.geoJSON(geoJSON, {

      /**
       * style - Sets the initial styles
       *
       * @param {object} properties feature from geoJSON
       *
       * @return {object} styles to be applied by Leaflet
       */
      style({ properties }) {
        const styles = options.styles;
        styles.fillColor = utils.getColor(properties.pop_max, styles.fillColors);

        return styles;
      },

      /**
       * pointToLayer - Creates marker on the layer
       *
       * @param {array} geoJsonPoint specific point
       * @param {object} latlng coordinates
       *
       * @return {object} marker to be included by Leaflet
       */
      pointToLayer(geoJsonPoint, latlng) {
        return L.circleMarker(latlng);
      },

      /**
       * onEachFeature - Manages diferent actions triggered from the map
       *
       * @param {type} feature geoJSON features
       * @param {type} layer   specific layer features
       *
       */
      onEachFeature(feature, layer) {
        layer
          .on('mouseover', function mouseover() {
            this.setStyle({ fillOpacity: 1, color: '#111111' });
            this.bringToFront();
            controls.get('info').update(layer.feature.properties);
          })
          .on('mouseout', function mouseout() {
            this.setStyle({ fillOpacity: options.styles.fillOpacity, color: options.styles.color });
            controls.get('info').update();
          });
      },

    });
  }

  /**
   * setCustomStyle - Adds custom style for this layer
   *
   * @param {object} newStyle styles options
   *
   */
  setCustomStyle(newStyle) {
    if (!newStyle.hasOwnProperty('fillColors')) {
      this.layer.setStyle(newStyle);
    } else {
      const fillColors = this.options.styles.fillColors;

      newStyle.fillColors.forEach((newColor) => {
        fillColors.forEach((oldColor, index) => {
          if (newColor.count == oldColor.count) {
            fillColors[index] = Object.assign({}, oldColor, newColor);
          }
        });
      });

      this.layer.eachLayer(l => l.setStyle({ fillColor: utils.getColor(l.feature.properties.pop_max, fillColors) }));
      controls.get('legend').update({ fillColors: fillColors });
    }
  }
}

export default function (geoJSON, options) {
  return new PopulationLayer(geoJSON, options);
}
