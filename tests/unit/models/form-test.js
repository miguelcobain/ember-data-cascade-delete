import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import FactoryGuy, {
  setupFactoryGuy,
  make,
  mockDelete
} from 'ember-data-factory-guy';
import { settled } from 'ember-test-helpers';

module('Unit | Model | form', function(hooks) {
  setupTest(hooks);
  setupFactoryGuy(hooks);

  test('destroying a model unloads related relationships marked with `cascadeDelete: true`', async function(assert) {
    let form = make('form');
    mockDelete(form);

    assert.equal(FactoryGuy.store.peekAll('form').length, 1);
    assert.equal(FactoryGuy.store.peekAll('question').length, 4);
    assert.equal(FactoryGuy.store.peekAll('option').length, 4 * 3);

    await settled();

    await form.destroyRecord()
    assert.equal(FactoryGuy.store.peekAll('form').length, 0);
    assert.equal(FactoryGuy.store.peekAll('question').length, 0);
    assert.equal(FactoryGuy.store.peekAll('option').length, 0);
  });

  test('destroying a model with null relationships works', async function(assert) {
    let form = make('form', 'withNull');
    mockDelete(form);

    assert.equal(FactoryGuy.store.peekAll('form').length, 1);
    assert.equal(FactoryGuy.store.peekAll('question').length, 0);
    assert.equal(FactoryGuy.store.peekAll('option').length, 0);

    await settled();

    await form.destroyRecord()
    assert.equal(FactoryGuy.store.peekAll('form').length, 0);
    assert.equal(FactoryGuy.store.peekAll('question').length, 0);
    assert.equal(FactoryGuy.store.peekAll('option').length, 0);
  });
});
