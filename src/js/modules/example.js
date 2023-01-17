import { exampleUtil, exampleUtil2 } from '../utils';

const $ = jQuery;

const exportModuleName = () => {
  const str = 'example';
  return str;
};

$(() => {
  const name = exportModuleName();
  console.log(exampleUtil(), exampleUtil2(), name);
});
