sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (
    Controller,
    JSONModel,
    MessageToast,
    Filter,
    FilterOperator
) {
    "use strict";

    return Controller.extend(
        "hanareadinessmain.controller.ATCResults",
        {

            onInit: function () {
                var oATCModel =
                    this.getOwnerComponent()
                        .getModel("ATCModel");

                if (oATCModel) {

                    this.getView()
                        .setModel(oATCModel);

                }

            },

            onOpenFinding: function () {

                MessageToast.show(
                    "Open Finding"
                );

            },

            onAISuggestion: function () {

                MessageToast.show(
                    "AI Suggestion"
                );

            },

            onNavBack: function () {

                history.go(-1);

            }

        }
    );

});