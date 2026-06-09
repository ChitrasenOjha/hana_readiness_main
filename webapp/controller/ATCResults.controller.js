sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, JSONModel, MessageToast, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("hanareadinessmain.controller.ATCResults", {

onInit: function () {

    var oView = this.getView();

    // Show Busy Indicator
    oView.setBusy(true);

    var oModel = this.getOwnerComponent().getModel();

    var aFilters = [
        new Filter(
            "Package",
            FilterOperator.EQ,
            "ZPRAKHAR"
        ),
        new Filter(
            "Variant",
            FilterOperator.EQ,
            "ZDEFAULT"
        )
    ];

    oModel.read("/ATCResultSet", {

        filters: aFilters,

        success: function (oData) {

            console.log("ATC Data Loaded");
            console.log(oData.results);

            var oJsonModel = new JSONModel({
                ATCResults: oData.results
            });

            this.getView().setModel(oJsonModel);

            // Hide Busy Indicator
            oView.setBusy(false);

        }.bind(this),

        error: function (oError) {

            console.log("Error while reading OData");
            console.log(oError);

            // Hide Busy Indicator
            oView.setBusy(false);

            MessageToast.show("Failed to load ATC results");

        }

    });

},

        onOpenFinding: function () {

            MessageToast.show("Open Finding");

        },

        onAISuggestion: function () {

            MessageToast.show("AI Suggestion");

        },

        onNavBack: function () {

            history.go(-1);

        }

    });

});