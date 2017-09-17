import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('question', {
  default: {
    text: (f)=> `Question ${f.id}`,
    options: FactoryGuy.hasMany('option', 3)
  }
});