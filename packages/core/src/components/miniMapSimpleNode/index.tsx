import { NodeView } from '@antv/x6';

class MiniMapSimpleNode extends NodeView {
  protected renderMarkup() {
    return this.renderJSONMarkup({
      tagName: 'rect',
      selector: 'body',
    });
  }

  protected renderPorts() {
    return null;
  }

  update() {
    super.update({
      body: {
        refWidth: '100%',
        refHeight: '100%',
        fill: '#D9D9D9',
      },
    });
  }
}

export default MiniMapSimpleNode;
