odoo.define('web_gan_generic.gantt_row', function (require) {
    "use strict";

var GanttRow = require('web_gantt.GanttRow');
var GantRow = GanttRow.include({

     _insertIntoSlot: function () {
        var self = this;
        var array_gant_field = []
        if  (self.__parentedParent.arch.attrs.fields !==undefined) {
         array_gant_field = self.__parentedParent.arch.attrs.fields.split(",");
        }
        this.fields_gant= array_gant_field
        var intervalToken = this.SCALES[self.state.scale].interval;
        var timeToken = this.SCALES[this.state.scale].time;
        var precision = this.viewInfo.activeScaleInfo.precision;
        var cellTime = this.SCALES[this.state.scale].cellPrecisions[precision];
        this.slots = _.map(this.viewInfo.slots, function (date, key) {
            var slotStart = date;
            var slotHalf = slotStart.clone().add(cellTime, timeToken);
            var slotStop = date.clone().add(1, intervalToken);
            var slotUnavailability;
            self.unavailabilities.forEach(function (unavailability) {
                if (unavailability.startDate < slotStop && unavailability.stopDate > slotStart) {
                    if (precision === 'half' && unavailability.stopDate <= slotHalf) {
                        if (!slotUnavailability) {
                            slotUnavailability = 'first_half'
                        } else if (slotUnavailability === 'second_half') {
                            slotUnavailability = 'full';
                        }
                    } else if (precision === 'half' && unavailability.startDate >= slotHalf) {
                        if (!slotUnavailability) {
                            slotUnavailability = 'second_half'
                        } else if (slotUnavailability === 'first_half') {
                            slotUnavailability = 'full';
                        }
                    } else {
                        slotUnavailability = 'full';
                    }
                }
            });
            return {
                isToday: date.isSame(new Date(), 'day') && self.state.scale !== 'day',
                unavailability: slotUnavailability,
                hasButtons: !self.isGroup && !self.isTotal,
                start: slotStart,
                stop: slotStop,
                pills: [],
            };
        });
        var slotsToFill = this.slots;
        this.pills.forEach(function (currentPill) {
            var skippedSlots = [];
            slotsToFill.some(function (currentSlot) {
                var fitsInThisSlot = currentPill.startDate < currentSlot.stop;
                if (fitsInThisSlot) {
                    currentSlot.pills.push(currentPill);
                } else {
                    skippedSlots.push(currentSlot);
                }
                return fitsInThisSlot;
            });
            // Pills are sorted by start date, so any slot that was skipped
            // for this pill will not be suitable for any of the next pills
            slotsToFill = _.difference(slotsToFill, skippedSlots);
        });
    }

    });
});