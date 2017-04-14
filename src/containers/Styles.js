import Container from '@/core/container';
import Hue from '@/components/ui/Hue';
import Stroke from '@/components/ui/Stroke';

export class Styles extends Container {

  template() {
    return `
      <section class="info styles">
        <h4>Styler</h4>
        <div slot="choropleth"></div>
        <div slot="stroke"></div>
      </section>
    `;
  }

  slots() {
    return {
      choropleth: Hue(this.props),
      stroke: Stroke(this.props),
    };
  }

}

export default function (props) {
  return new Styles(props).show().$el;
}
