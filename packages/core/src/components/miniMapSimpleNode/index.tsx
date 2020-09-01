import {NodeView, Markup} from '@antv/x6';

class MiniMapSimpleNode extends NodeView {

  protected body: SVGRectElement | undefined;

  protected readonly markup: Markup.JSONMarkup = {
    tagName: 'rect',
    selector: 'body',
    attrs: {
      fill: '#D9D9D9'
    }
  };

  updateNodeSize() {
    var size = this.cell.getSize();
    this.setAttrs(size, this.body);
  }

  render() {
    this.empty();
    const doc = this.parseJSONMarkup(this.markup, this.container);
    this.body = doc.selectors.body as SVGRectElement;
    this.container.append(doc.fragment);
    this.updateNodeSize();
    this.updateTransform();
    return this;
  }
}

export default MiniMapSimpleNode;
