import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany, belongsTo } from 'ember-data/relationships';

export default Model.extend({
  name: attr('string'),
  mainQuestion: belongsTo('question', { async: true, inverse: 'form', cascadeDelete: true }),
  questions: hasMany('question', { async: true, inverse: 'form', cascadeDelete: true })
});