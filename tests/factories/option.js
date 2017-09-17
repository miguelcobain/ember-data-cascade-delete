import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('option', {
  default: {
    text: (f)=> `Option ${f.id}`
  }
});