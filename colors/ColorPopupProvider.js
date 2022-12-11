import {
  domify
} from 'min-dom';

const COLORS = [
  {
    label: 'Default',
    fill: undefined,
    stroke: undefined
  }, {
    label: 'Blue',
    fill: 'rgb(187, 222, 251)',
    stroke: 'rgb(30, 136, 229)'
  }, {
    label: 'Orange',
    fill: 'rgb(255, 224, 178)',
    stroke: 'rgb(251, 140, 0)'
  }, {
    label: 'Green',
    fill: 'rgb(200, 230, 201)',
    stroke: 'rgb(67, 160, 71)'
  }, {
    label: 'Red',
    fill: 'rgb(255, 205, 210)',
    stroke: 'rgb(229, 57, 53)'
  }, {
    label: 'Purple',
    fill: 'rgb(225, 190, 231)',
    stroke: 'rgb(142, 36, 170)'
  } ];


export default function ColorPopupProvider(config, popupMenu, modeling, translate) {
  this._popupMenu = popupMenu;
  this._modeling = modeling;
  this._translate = translate;

  this._colors = config && config.colors || COLORS;

  this._popupMenu.registerProvider('color-picker', this);
}


ColorPopupProvider.$inject = [
  'config.colorPicker',
  'popupMenu',
  'modeling',
  'translate'
];


ColorPopupProvider.prototype.getEntries = function(elements) {
  var self = this;

  var colorIcon = domify(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="100%">
      <rect rx="2" x="1" y="1" width="22" height="22" fill="var(--fill-color)" stroke="var(--stroke-color)"></rect>
    </svg>
  `);

  var entries = this._colors.map(function(color) {

    colorIcon.style.setProperty('--fill-color', color.fill || 'white');
    colorIcon.style.setProperty('--stroke-color', color.stroke || 'rgb(34, 36, 42)');

    return {
      title: self._translate(color.label),
      id: color.label.toLowerCase() + '-color',
      imageUrl: `data:image/svg+xml;utf8,${ encodeURIComponent(colorIcon.outerHTML) }`,
      action: createAction(self._modeling, elements, color)
    };
  });

  return entries;
};


function createAction(modeling, element, color) {
  return function() {
    modeling.setColor(element, color);
  };
}
