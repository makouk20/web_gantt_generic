odoo.define('web_gan_generic.gantt_model', function (require) {
    "use strict";

var GanttModel = require('web_gantt.GanttModel');
var Gantt = GanttModel.include({


     load: function (params) {

        this.modelName = params.modelName;
        this.fields = params.fields;
        this.domain = params.domain;
        this.context = params.context;
        this.decorationFields = params.decorationFields;
        this.colorField = params.colorField;
        this.progressField = params.progressField;
        this.consolidationParams = params.consolidationParams;
        this.collapseFirstLevel = params.collapseFirstLevel;
        this.displayUnavailability = params.displayUnavailability;

        this.defaultGroupBy = params.defaultGroupBy ? [params.defaultGroupBy] : [];
        if (!params.groupedBy || !params.groupedBy.length) {
            params.groupedBy = this.defaultGroupBy;
        }

        this.ganttData = {
            dateStartField: params.dateStartField,
            dateStopField: params.dateStopField,
            groupedBy: params.groupedBy,
            fields: params.fields,
            fields_gant:params.fields_gant
        };
        this._setRange(params.initialDate, params.scale);
        return this._fetchData().then(function () {
            // The 'load' function returns a promise which resolves with the
            // handle to pass to the 'get' function to access the data. In this
            // case, we don't want to pass any argument to 'get' (see its API).
            return Promise.resolve();
        });
    },


      _getFields: function () {
    var self= this;
    var array_gant_field = []
    if ( this.ganttData.fields_gant !==undefined){
     array_gant_field = this.ganttData.fields_gant.split(",");
    }
        var fields = ['display_name', this.ganttData.dateStartField, this.ganttData.dateStopField];
        fields = fields.concat(this.ganttData.groupedBy, this.decorationFields,array_gant_field);
        if (this.progressField) {
            fields.push(this.progressField);
        }

        if (this.colorField) {
            fields.push(this.colorField);
        }

        if (this.consolidationParams.field) {
            fields.push(this.consolidationParams.field);
        }

        if (this.consolidationParams.excludeField) {
            fields.push(this.consolidationParams.excludeField);
        }

        return _.uniq(fields);
    }

    });
});