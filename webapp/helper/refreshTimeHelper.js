sap.ui.define([
    "sap/m/MessageToast"
], function (MessageToast) {
    "use strict";

    return {

        updateTime: function (oView) {

            var oDate = new Date();

            var sDateTime = oDate.toLocaleString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true
            });

            oView.byId("txtLastScan")
                .setText("Last Scan: " + sDateTime);
        },

        refreshScreen: function (oView) {

            var oModel = oView.getModel();

            if (oModel) {
                oModel.refresh(true);
            }

            this.updateTime(oView);

            MessageToast.show("Dashboard refreshed");
        }

    };
});