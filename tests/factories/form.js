import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('form', {
  default: {
    name: (f)=> `Form ${f.id}`,
    mainQuestion: FactoryGuy.belongsTo('question'),
    questions: FactoryGuy.hasMany('question', 3)
  },
  traits: {
    withNull: {
      name: (f)=> `Form ${f.id}`,
      mainQuestion: null,
      questions: null
    }
  }
});
