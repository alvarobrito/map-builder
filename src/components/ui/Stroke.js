import Component from '@/core/component';
import provider from '@/core/provider';

export class Stroke extends Component {

  template() {
    return `
      <div class="content">
        <h5>Stroke</h5>
        <input type="range" @change="handleStrokeWeight" min="0" max="5" value="${this.props.weight}">
        <input type="color" @change="handleStrokeColor" value="${this.props.color}">
      </div>
    `;
  }

  eventHandler() {
    return {
      handleStrokeWeight({ target }) {
        provider.get('PopulationLayer').setCustomStyle({ weight: target.value });
      },
      handleStrokeColor({ target }) {
        provider.get('PopulationLayer').setCustomStyle({ color: target.value });
      },
    };
  }

}

export default function (props) {
  return new Stroke(props);
}
