sap.ui.define([
    "sap/ui/model/json/JSONModel"
], function (JSONModel) {
    "use strict";

    return {

        loadPackages: function (oView, oODataModel) {

            oODataModel.read("/PackageDDSet", {

                success: function (oData) {

                    var oModel = new JSONModel({
                        Packages: oData.results
                    });

                    oView.setModel(
                        oModel,
                        "packageModel"
                    );

                },

                error: function (oError) {

                    console.log("Package fetch failed");
                    console.log(oError);

                }

            });

        }

    };

});