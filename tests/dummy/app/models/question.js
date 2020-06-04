import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class Question extends Model {
  @attr('string')
  text;

  @belongsTo('form', { async: true, inverse: 'questions' })
  form;

  @hasMany('option', { async: true, inverse: 'question', cascadeDelete: true })
  options;
}
