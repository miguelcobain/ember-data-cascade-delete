import DS from 'ember-data';
import CascadeDeleteMixin from 'ember-data-cascade-delete';

export default DS.JSONAPIAdapter.extend(CascadeDeleteMixin, {
});