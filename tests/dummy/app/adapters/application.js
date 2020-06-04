import JSONAPIAdapter from '@ember-data/adapter/json-api';
import CascadeDeleteMixin from 'ember-data-cascade-delete';

export default class ApplicationAdapter extends JSONAPIAdapter.extend(CascadeDeleteMixin) {
}
