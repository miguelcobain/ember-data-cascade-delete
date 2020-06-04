import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class Form extends Model {
  @attr('string')
  name;

  @belongsTo('question', { async: true, inverse: 'form', cascadeDelete: true })
  mainQuestion;

  @hasMany('question', { async: true, inverse: 'form', cascadeDelete: true })
  questions;
}
