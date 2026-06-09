sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "hanareadinessmain/helper/refreshTimeHelper",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, refreshTimeHelper, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("hanareadinessmain.controller.Dashboard", {

        onInit: function () {
            refreshTimeHelper.updateTime(this.getView());

        },

        onRunScan: function () {

            sap.m.MessageToast.show("Scan Started");
            // var oModel = this.getOwnerComponent().getModel();

            // var aFilters = [
            //     new sap.ui.model.Filter(
            //         "Package",
            //         sap.ui.model.FilterOperator.EQ,
            //         "ZPRAKHAR"
            //     ),
            //     new sap.ui.model.Filter(
            //         "Variant",
            //         sap.ui.model.FilterOperator.EQ,
            //         "ZDEFAULT"
            //     )
            // ];

            // oModel.read("/ATCResultSet", {
            //     filters: aFilters,
            //     success: function (oData) {
            //         console.log(oData.results);
            //     },
            //     error: function (oError) {
            //         console.log(oError);
            //     }
            // });
            // console.log("After read");

        },

        onRefresh: function () {
            console.log("Refresh clicked");
            refreshTimeHelper.refreshScreen(this.getView());
        },

        onATCResultsPress: function () {

            this.getOwnerComponent()
                .getRouter()
                .navTo("ATCResults");

        }

    });
});
