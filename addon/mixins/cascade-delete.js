import Mixin from '@ember/object/mixin';

export default Mixin.create({
  deleteRecord(store, _, snapshot) {
    let recordsToUnload = this.unloadCascadeRecords(store, snapshot.record);

    return this._super(...arguments).then((response) => {
      recordsToUnload.forEach((childRecord) => {
        store.unloadRecord(childRecord);
      });

      return response;
    });
  },

  unloadCascadeRecords(store, record) {
    let recordsToUnload = [];
    
    // collect all records to unload into recordsToUnload variable
    record.eachRelationship((name, descriptor) => {
      let { options, kind } = descriptor;
      let relationshipName = descriptor.key;

      if (options.cascadeDelete && kind === 'hasMany') {
        let hasManyRecordsArray = [];
        let hasManyRecords = record.hasMany(relationshipName).value();
        if (hasManyRecords !== null) {
          hasManyRecordsArray = hasManyRecords.toArray();
        }
        recordsToUnload = recordsToUnload.concat(hasManyRecordsArray);
      }

      if (options.cascadeDelete && kind === 'belongsTo') {
        let belongsToRecords = record.belongsTo(relationshipName).value();
        recordsToUnload = recordsToUnload.concat([ belongsToRecords ]);
      }
    });

    let childRecords = recordsToUnload.reduce((a, r) => {
      return a.concat(this.unloadCascadeRecords(store, r));
    }, []);

    return recordsToUnload.concat(childRecords);
  }
});
