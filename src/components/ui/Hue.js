import Component from '@/core/component';
import provider from '@/core/provider';

export class Hue extends Component {

  template() {
    return `
      <div class="content">
        <h5>Fill</h5>
        <label>
          <input type="range" @change="handleRadius" min="1" max="10" value="${this.props.radius}">
        </label>
        <ul>
          ${this.props.fillColors.map(fill => `
            <li>
              <input type="color" @change="handleFillColor" count="${fill.count}" value="${fill.color}">
            </li>
          `).join('')}
        </ul>
      </div>
    `;
  }

  eventHandler() {
    return {
      handleFillColor({ target }) {
        provider.get('PopulationLayer').setCustomStyle({
          fillColors: [{ count: target.getAttribute('count'), color: target.value }]
        });
      },
      handleRadius({ target }) {
        provider.get('PopulationLayer').setCustomStyle({ radius: target.value });
      },
    };
  }

}

export default function (props) {
  return new Hue(props);
}
