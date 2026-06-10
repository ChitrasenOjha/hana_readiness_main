sap.ui.define([
    "sap/ui/model/json/JSONModel"
], function (JSONModel) {
    "use strict";

    return {

        loadVariants: function (oView, oODataModel) {

            oODataModel.read("/VariantSet", {

                success: function (oData) {

                    var oVariantModel = new JSONModel({
                        Variants: oData.results
                    });

                    oVariantModel.setSizeLimit(1000);
                    oView.setModel(
                        oVariantModel,
                        "variantModel"
                    );
                    setTimeout(function () {

    var oCombo =
        oView.byId("variantSelect");

    console.log(
        "Variant Model Records:",
        oView.getModel("variantModel")
            .getProperty("/Variants")
            .length
    );

    console.log(
        "ComboBox Items:",
        oCombo.getItems().length
    );

}, 1000);

                },

                error: function (oError) {

                    console.log(
                        "Error loading Variants"
                    );

                    console.log(oError);

                }

            });

        }

    };

});