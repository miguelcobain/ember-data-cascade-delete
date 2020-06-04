# ember-data-cascade-delete [![Build Status](https://travis-ci.org/miguelcobain/ember-data-cascade-delete.svg?branch=master)](https://travis-ci.org/miguelcobain/ember-data-cascade-delete) [![Ember Observer Score](http://emberobserver.com/badges/ember-data-cascade-delete.svg)](http://emberobserver.com/addons/ember-data-cascade-delete)

Sometimes we have a "Composition" kind of relationship (per UML terms) where the lifecyle of one
class is closely related to another.

Composition relationships represents a "part-whole" relationship such that class B is an integral part of class A.
This relationship is typically used if objects of class A can't logically exist without having a class B object.

E.g, if a `Human` model "has many" `Leg`s, we want to destroy the legs if/when the Human is destroyed.

For such cases, we need to "cascade delete" the related models along with the parent model.
This addon provides a Mixin with this functionality for you to add to any adapter in your ember app.

## Installation

Just run

```bash
ember install ember-data-cascade-delete
```

## Usage

If we want to add this feature globally, we add the Mixin to the application adapter:

```js
// app/adapters/application.js
import JSONAPIAdapter from '@ember-data/adapter/json-api';
import CascadeDeleteMixin from 'ember-data-cascade-delete';

export default class ApplicationAdapter extends JSONAPIAdapter.extend(CascadeDeleteMixin) {
}
```

You can also add this mixin to any other more specific (model-scoped) adapter.

Now we can specify a `cascadeDelete` option in our relationships like:

```js
// app/models/human.js
import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class Human extends Model {
  @attr('string')
  name;

  @belongsTo('heart', { async: true, inverse: 'human', cascadeDelete: true })
  heart;

  @hasMany('leg', { async: true, inverse: 'human', cascadeDelete: true })
  legs;
}
```

Now when we call `human.destroyRecord()` the related records marked with `cascadeDelete: true`
will be unloaded *after* the main record is destroyed.

Two things to note:
- this **will work** with nested relationships, e.g a `Leg` could have a `hasMany` relationship to `Finger` and
those would also be unloaded.
- beware of circular relationships. If you define `cascadeDelete: true` on both ends of a relationship, you will get infinite loops.

## Credits

This addon is essentially the addonified version of [this blog post](http://thejsguy.com/2017/02/10/cascade-deleting-relationships-in-ember-data.html), with
the additional feature of nested cascade delete relationships.

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
