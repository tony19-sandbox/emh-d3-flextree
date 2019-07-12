import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

function demoFlextree() {
  const data = [
    1, 1,
    [ 2, 4 ],
    [ 3, 1,
      [ 4, 1 ],
    ],
  ];
  const layout = d3.flextree({
    children: data => {
      const kd = data.slice(2);
      return kd.length ? kd : null;
    },
    nodeSize: node => node.data.slice(0, 2),
    spacing: (nodeA, nodeB) => nodeA.path(nodeB).length,
  });
  const tree = layout.hierarchy(data);
  layout(tree);
  console.log(layout.dump(tree));  //=> prints the results
}

demoFlextree()

/**
 * `emh-d3-flextree`
 *
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class EmhD3Flextree extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2>Hello [[prop1]]!</h2>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'emh-d3-flextree',
      },
    };
  }
}

window.customElements.define('emh-d3-flextree', EmhD3Flextree);