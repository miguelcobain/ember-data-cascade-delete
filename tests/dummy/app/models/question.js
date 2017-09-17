import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  text: attr('string'),
  form: belongsTo('form', { async: true, inverse: 'questions' }),
  options: hasMany('option', { async: true, inverse: 'question', cascadeDelete: true })
});