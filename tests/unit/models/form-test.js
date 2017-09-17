import { moduleForModel, test } from 'ember-qunit';
import FactoryGuy, { manualSetup, mockSetup, mockTeardown, make, mockDelete } from 'ember-data-factory-guy';
import { run } from '@ember/runloop';

moduleForModel('form', 'Unit | Model | form', {
  needs: ['model:question', 'model:option', 'adapter:application'],

  beforeEach() {
    manualSetup(this.container);
    mockSetup();
  },

  teardown() {
    mockTeardown();
  }
});

test('destroying a model unloads related belongsTo relationships marked with `cascadeDelete: true`', function(assert) {
  let done = assert.async();
  let form = make('form');
  mockDelete(form);

  assert.equal(FactoryGuy.store.peekAll('form').get('length'), 1);
  assert.equal(FactoryGuy.store.peekAll('question').get('length'), 4);
  assert.equal(FactoryGuy.store.peekAll('option').get('length'), 4 * 3);

  run(async () => {
    await form.destroyRecord()
    assert.equal(FactoryGuy.store.peekAll('form').get('length'), 0);
    assert.equal(FactoryGuy.store.peekAll('question').get('length'), 0);
    assert.equal(FactoryGuy.store.peekAll('option').get('length'), 0);
    done();
  });
});