import Model, { attr, belongsTo } from '@ember-data/model';

export default class Option extends Model {
  @attr('string')
  text;

  @belongsTo('question', { async: true, inverse: 'options' })
  question;
}
