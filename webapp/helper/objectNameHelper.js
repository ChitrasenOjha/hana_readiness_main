sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (
    JSONModel,
    Filter,
    FilterOperator
) {
    "use strict";

    return {

        loadProgramsByPackage: function (
            oView,
            oODataModel,
            sPackage
        ) {
            
            // Show Busy Indicator
            oView.setBusy(true);
            var aFilters = [
                new Filter(
                    "Package",
                    FilterOperator.EQ,
                    sPackage
                )
            ];

            oODataModel.read("/ProgramDDSet", {

                filters: aFilters,

                success: function (oData) {

                    console.log("Programs Loaded");
                    console.log(oData.results);

                    var oProgramModel = new JSONModel({
                        Programs: oData.results
                    });

                    oView.setModel(
                        oProgramModel,
                        "programModel"
                    );

                // Hide Busy Indicator
                oView.setBusy(false);

                },

                error: function (oError) {

                    console.log("Program fetch failed");
                    console.log(oError);

                }

            });

        }

    };

});