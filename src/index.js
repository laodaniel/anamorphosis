import React from 'react';
import Three from 'three';
import 'style!../node_modules/normalizecss/normalize.css';
import './index.less';

const Main = React.createClass({

  componentDidMount() {
    const scene = new Three.Scene();
    console.log(scene);
    window.addEventListener('dragover', this._allowDrop);
    window.addEventListener('drop', this._drop);
  },

  componentWillUnmount() {
    window.removeEventListener('dragover', this._allowDrop);
    window.removeEventListener('drop', this._drop);
  },

  _allowDrop(event) {
    event.preventDefault();
  },

  _dragStart(event) {
    const style = window.getComputedStyle(event.target, null);
    event.dataTransfer.effectAllowed = 'copyMove';
    event.dataTransfer.setData('text/plain',
      (parseInt(style.getPropertyValue('left'), 10) - event.clientX) +
      ',' + (parseInt(style.getPropertyValue('top'), 10) - event.clientY));
  },

  _drop(event) {
    const offset = event.dataTransfer.getData('text/plain').split(',');
    event.dataTransfer.dropEffect = 'copy';
    this.refs.a10sStickers.getDOMNode().style.left = (event.clientX + parseInt(offset[0], 10)) + 'px';
    this.refs.a10sStickers.getDOMNode().style.top = (event.clientY + parseInt(offset[1], 10)) + 'px';
    event.preventDefault();
    return false;
  },

  render() {
    return (
      <aside className="a10s-stickers" ref="a10sStickers"
        draggable="true" onDragStart={ this._dragStart }>
      </aside>
    );
  }
});

React.render(<Main />,
  document.getElementById('content'));
