sap.ui.define([
    "sap/ui/model/json/JSONModel"
], function (JSONModel) {
    "use strict";

    return {

        loadObjectTypes: function (oView, oODataModel) {

            oODataModel.read("/ObjecttypeSet", {

                success: function (oData) {

                    var oObjectTypeModel = new JSONModel({
                        ObjectTypes: oData.results
                    });

                    oView.setModel(
                        oObjectTypeModel,
                        "objectTypeModel"
                    );

                },

                error: function (oError) {

                    console.log(
                        "Error loading Object Types"
                    );

                    console.log(oError);

                }

            });

        }

    };

});