import { module, test } from 'qunit';
import { manualSetup, make } from 'ember-data-factory-guy';

module('Unit | Mixin | cascade delete', {
  needs: ['model:form', 'model:question'],

  beforeEach() {
    manualSetup(this.container);
  }
});

test('destroying a model unloads related belongsTo relationships marked with `cascadeDelete: true`', function(assert) {
  let form = make('form');
  form.destroyRecord();
});
