/*
    Author: Vahid Eyorokon
*/

/*
    Imports
*/

import {system} from "styled-system";
/*
    Function that generate a 'styled-system' compatible field that can used with the theme.
 */

function configure(prop, shortName = [], scale = null) {
  let config = {[prop]: {property: prop}};
  if (scale) {
    config = {[prop]: {property: prop, scale: scale}};
  }
  if (shortName && shortName.constructor === Array) {
    shortName.forEach(function(value) {
      config[value] = config[prop];
    });
  } else if (shortName && shortName.constructor === String) {
    config[shortName] = config[prop];
  }
  return system(config);
}

export default configure;
