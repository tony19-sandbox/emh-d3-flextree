import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '../emh-d3-flextree/emh-d3-flextree.js'

/**
 * @customElement
 * @polymer
 */
class EmhD3FlextreeApp extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2>Hello [[prop1]]!</h2>
      <emh-d3-flextree></emh-d3-flextree>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'emh-d3-flextree-app'
      }
    };
  }
}

window.customElements.define('emh-d3-flextree-app', EmhD3FlextreeApp);
